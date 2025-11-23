/**
 * Optimized TzKT API Client with Intelligent Caching
 * 
 * This module wraps the TzKT API with caching capabilities to:
 * - Reduce API calls and improve performance
 * - Provide instant data loading from cache
 * - Implement stale-while-revalidate for better UX
 * - Handle cache invalidation strategically
 * 
 * All functions use the cache manager with predefined strategies
 * optimized for each data type's update frequency.
 */

import { cacheManager, CacheStrategies, CacheKeys } from "./cache-manager"
import {
  type NetworkStats,
  type Cycle,
  type Baker,
  type BakerRewards,
  formatXTZ,
  formatPercentage,
  formatAddress,
  calculateEstimatedApy,
} from "./tzkt-api"

// Re-export types and helpers for convenience
export type { NetworkStats, Cycle, Baker, BakerRewards }
export { formatXTZ, formatPercentage, formatAddress, calculateEstimatedApy }

const TZKT_API_BASE = "https://api.tzkt.io"

/**
 * Generic function to fetch data from TzKT API with caching
 * @param endpoint - API endpoint path
 * @param cacheKey - Unique cache key
 * @param cacheStrategy - Caching strategy to use
 * @returns Cached or freshly fetched data
 */
async function cachedTzktFetch<T>(
  endpoint: string,
  cacheKey: string,
  cacheStrategy: (typeof CacheStrategies)[keyof typeof CacheStrategies],
): Promise<T> {
  // Try to get from cache first
  const cached = cacheManager.get<T>(cacheKey, cacheStrategy)

  if (cached) {
    cacheManager.recordHit()

    // If using stale-while-revalidate, trigger background update if data is stale
    if (cacheStrategy.staleWhileRevalidate) {
      // Check if data is expired
      const entry = (cacheManager as any).cache.get(cacheKey)
      if (entry && Date.now() - entry.timestamp > entry.ttl) {
        // Background update (don't wait for it)
        fetchAndCache<T>(endpoint, cacheKey, cacheStrategy).catch(() => {
          // Silently ignore background update errors
        })
      }
    }

    return cached
  }

  cacheManager.recordMiss()
  return fetchAndCache<T>(endpoint, cacheKey, cacheStrategy)
}

/**
 * Fetch data from TzKT API and cache it
 * @param endpoint - API endpoint path
 * @param cacheKey - Unique cache key
 * @param cacheStrategy - Caching strategy to use
 * @returns Fetched data
 * @throws Error if API request fails
 */
async function fetchAndCache<T>(
  endpoint: string,
  cacheKey: string,
  cacheStrategy: (typeof CacheStrategies)[keyof typeof CacheStrategies],
): Promise<T> {
  const response = await fetch(`${TZKT_API_BASE}${endpoint}`)
  if (!response.ok) {
    throw new Error(`TzKT API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  cacheManager.set(cacheKey, data, cacheStrategy)
  return data
}

// ============ Public API Functions ============

/**
 * Get current network statistics
 * Cached for 5 minutes with localStorage persistence
 * @returns Network statistics object
 */
export async function getNetworkStats(): Promise<NetworkStats> {
  return cachedTzktFetch<NetworkStats>(
    "/v1/statistics/current",
    CacheKeys.networkStats(),
    CacheStrategies.NETWORK_STATS,
  )
}

/**
 * Get current cycle information
 * Cached for 5 minutes with localStorage persistence
 * @returns Current cycle object
 */
export async function getCurrentCycle(): Promise<Cycle> {
  return cachedTzktFetch<Cycle>("/v1/cycles/current", CacheKeys.currentCycle(), CacheStrategies.NETWORK_STATS)
}

/**
 * Get list of active bakers sorted by staking balance
 * Cached for 10 minutes with localStorage persistence
 * @param limit - Number of bakers to return (default: 50)
 * @returns Array of baker objects
 */
export async function getActiveBakers(limit = 50): Promise<Baker[]> {
  return cachedTzktFetch<Baker[]>(
    `/v1/delegates?active=true&sort.desc=stakingBalance&limit=${limit}`,
    CacheKeys.activeBakers(limit),
    CacheStrategies.BAKERS_LIST,
  )
}

/**
 * Get detailed information about a specific baker
 * Cached for 2 minutes (no localStorage persistence)
 * @param address - Baker's Tezos address
 * @returns Baker object with full details
 */
export async function getBakerDetails(address: string): Promise<Baker> {
  return cachedTzktFetch<Baker>(
    `/v1/delegates/${address}`,
    CacheKeys.bakerDetails(address),
    CacheStrategies.BAKER_DETAILS,
  )
}

/**
 * Get reward history for a specific baker
 * Cached for 30 minutes with localStorage persistence
 * @param address - Baker's Tezos address
 * @param limit - Number of cycles to return (default: 10)
 * @returns Array of reward objects, one per cycle
 */
export async function getBakerRewards(address: string, limit = 10): Promise<BakerRewards[]> {
  return cachedTzktFetch<BakerRewards[]>(
    `/v1/rewards/delegates/${address}?limit=${limit}`,
    CacheKeys.bakerRewards(address, limit),
    CacheStrategies.BAKER_REWARDS,
  )
}

/**
 * Get aggregated statistics about all bakers
 * Calculates total bakers, active bakers, total staking, and average APY
 * Cached for 1 minute (no localStorage persistence)
 * @returns Object containing aggregated baker statistics
 */
export async function getBakersStats(): Promise<{
  totalBakers: number
  activeBakers: number
  totalStaking: number
  averageApy: number
}> {
  const cacheKey = CacheKeys.bakersStats()
  const cached = cacheManager.get<{
    totalBakers: number
    activeBakers: number
    totalStaking: number
    averageApy: number
  }>(cacheKey, CacheStrategies.GLOBAL_STATS)

  if (cached) {
    cacheManager.recordHit()
    return cached
  }

  cacheManager.recordMiss()

  // Calculate statistics from multiple sources
  const [stats, cycle] = await Promise.all([getNetworkStats(), getCurrentCycle()])
  const bakers = await getActiveBakers(500)

  const activeBakers = bakers.filter((b) => b.active).length
  const totalStaking = bakers.reduce((sum, b) => sum + b.stakingBalance, 0)
  const averageApy = bakers.reduce((sum, b) => sum + (b.estimatedApy || 0), 0) / bakers.length

  const result = {
    totalBakers: cycle.totalBakers,
    activeBakers,
    totalStaking,
    averageApy,
  }

  cacheManager.set(cacheKey, result, CacheStrategies.GLOBAL_STATS)
  return result
}

/**
 * Preload critical data into cache on app initialization
 * Fetches network stats, current cycle, and top bakers in parallel
 * Useful for improving initial page load performance
 */
export async function preloadCriticalData(): Promise<void> {
  const promises = [
    cacheManager.preload(
      CacheKeys.networkStats(),
      () => fetch(`${TZKT_API_BASE}/v1/statistics/current`).then((r) => r.json()),
      CacheStrategies.NETWORK_STATS,
    ),
    cacheManager.preload(
      CacheKeys.currentCycle(),
      () => fetch(`${TZKT_API_BASE}/v1/cycles/current`).then((r) => r.json()),
      CacheStrategies.NETWORK_STATS,
    ),
    cacheManager.preload(
      CacheKeys.activeBakers(50),
      () => fetch(`${TZKT_API_BASE}/v1/delegates?active=true&sort.desc=stakingBalance&limit=50`).then((r) => r.json()),
      CacheStrategies.BAKERS_LIST,
    ),
  ]

  await Promise.allSettled(promises)
}

// ============ Cache Invalidation Functions ============

/**
 * Invalidate all cached data for a specific baker
 * @param address - Baker's Tezos address
 */
export function invalidateBakerCache(address: string): void {
  cacheManager.invalidate(CacheKeys.bakerDetails(address))
  cacheManager.invalidatePattern(`baker_rewards_${address}_.*`)
}

/**
 * Invalidate all network-related cached data
 * Useful when you want to force a refresh of all network stats
 */
export function invalidateNetworkCache(): void {
  cacheManager.invalidate(CacheKeys.networkStats())
  cacheManager.invalidate(CacheKeys.currentCycle())
  cacheManager.invalidate(CacheKeys.bakersStats())
}

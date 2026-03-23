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
import { type NetworkStats, type Cycle, type Baker, type BakerRewards, formatXTZ, formatPercentage, formatAddress } from "./tzkt-api"

// Re-export types and helpers for convenience
export type { NetworkStats, Cycle, Baker, BakerRewards }
export { formatXTZ, formatPercentage, formatAddress }

const TZKT_API_BASE = "https://api.tzkt.io"

/**
 * Generic function to fetch data from TzKT API with caching
 * @param endpoint - API endpoint path
 * @param cacheKey - Unique cache key
 * @param cacheStrategy - Caching strategy to use
 * @param force - If true, bypass cache and force fresh fetch
 * @returns Cached or freshly fetched data
 */
async function cachedTzktFetch<T>(
  endpoint: string,
  cacheKey: string,
  cacheStrategy: (typeof CacheStrategies)[keyof typeof CacheStrategies],
  force = false,
): Promise<T> {
  // If force is true, bypass cache completely
  if (force) {
    cacheManager.invalidate(cacheKey)
    cacheManager.recordMiss()
    return fetchAndCache<T>(endpoint, cacheKey, cacheStrategy)
  }

  // Try to get from cache first
  const cached = cacheManager.get<T>(cacheKey, cacheStrategy)

  if (cached) {
    cacheManager.recordHit()

    // If using stale-while-revalidate, trigger background update if data is stale
    if (cacheStrategy.staleWhileRevalidate) {
      // Check if data is expired
      if (cacheManager.isStale(cacheKey)) {
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
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  const response = await fetch(`${TZKT_API_BASE}${endpoint}`, {
    signal: controller.signal,
  })
  clearTimeout(timeoutId)

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
 * @param force - If true, bypass cache and force fresh fetch
 * @returns Network statistics object
 */
export async function getNetworkStats(force = false): Promise<NetworkStats> {
  return cachedTzktFetch<NetworkStats>(
    "/v1/statistics/current",
    CacheKeys.networkStats(),
    CacheStrategies.NETWORK_STATS,
    force,
  )
}

/**
 * Get current cycle information
 * Cached for 5 minutes with localStorage persistence
 * @param force - If true, bypass cache and force fresh fetch
 * @returns Current cycle object
 */
export async function getCurrentCycle(force = false, currentLevel?: number): Promise<Cycle> {
  // Fetch cycles - we'll fetch multiple to find the one that matches
  const cycles = await cachedTzktFetch<Cycle[]>(
    "/v1/cycles?sort.desc=index&limit=10",
    CacheKeys.currentCycle(),
    CacheStrategies.NETWORK_STATS,
    force,
  )
  
  if (!cycles || cycles.length === 0) {
    throw new Error("Failed to fetch cycles from API")
  }
  
  // If currentLevel is provided, find the cycle that contains it
  if (currentLevel !== undefined) {
    const currentCycle = cycles.find(
      (cycle) => currentLevel >= cycle.firstLevel && currentLevel <= cycle.lastLevel
    )
    
    if (currentCycle) {
      return currentCycle
    }
  }
  
  // If no level provided or no match, return the first one (most recent) as fallback
  return cycles[0]
}

/**
 * Get list of active bakers sorted by staking balance
 * Cached for 10 minutes with localStorage persistence
 * @param limit - Number of bakers to return (default: 50)
 * @returns Array of baker objects
 */
export async function getActiveBakers(limit = 50): Promise<Baker[]> {
  const bakers = await cachedTzktFetch<Baker[]>(
    `/v1/delegates?active=true&limit=${limit}`,
    CacheKeys.activeBakers(limit),
    CacheStrategies.BAKERS_LIST,
  )

  return bakers
    .slice()
    .sort((a, b) => (b.stakingBalance ?? 0) - (a.stakingBalance ?? 0))
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
 * Get aggregated statistics about all bakers.
 * Calculates total bakers, active bakers, total staking, and APY.
 * APY values are fetched from BakingBad API (with sane defaults if it fails).
 * Cached for 1 minute (no localStorage persistence).
 * @param force - If true, bypass cache and force fresh fetch
 * @returns Object containing aggregated baker statistics
 */
export async function getBakersStats(force = false): Promise<{
  totalBakers: number
  activeBakers: number
  totalStaking: number
  averageApy: number
  stakingApy: number
  delegationApy: number
}> {
  const cacheKey = CacheKeys.bakersStats()
  
  // If force is true, bypass cache completely
  if (force) {
    cacheManager.invalidate(cacheKey)
    cacheManager.recordMiss()
  } else {
    const cached = cacheManager.get<{
      totalBakers: number
      activeBakers: number
      totalStaking: number
      averageApy: number
      stakingApy: number
      delegationApy: number
    }>(cacheKey, CacheStrategies.GLOBAL_STATS)

    if (cached) {
      cacheManager.recordHit()
      return cached
    }

    cacheManager.recordMiss()
  }

  try {
    // Fetch APY from BakingBad and network data from TzKT in parallel
    let stakingApy = 8.02
    let delegationApy = 2.67
    let totalStaking = 300149220000000
    let totalBakers = 264

    const bakingBadPromise = (async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)
        const response = await fetch("https://api.baking-bad.org/v3/bakers?status=active&limit=100", {
          signal: controller.signal,
        })
        clearTimeout(timeoutId)
        if (response.ok) {
          const bakers = await response.json()
          // Compute median APY from active bakers
          const stakingApys = bakers
            .filter((b: { staking?: { enabled: boolean; estimatedApy: number } }) => b.staking?.enabled && b.staking.estimatedApy > 0)
            .map((b: { staking: { estimatedApy: number } }) => b.staking.estimatedApy)
            .sort((a: number, b: number) => a - b)
          const delegationApys = bakers
            .filter((b: { delegation?: { enabled: boolean; estimatedApy: number } }) => b.delegation?.enabled && b.delegation.estimatedApy > 0)
            .map((b: { delegation: { estimatedApy: number } }) => b.delegation.estimatedApy)
            .sort((a: number, b: number) => a - b)

          if (stakingApys.length > 0) {
            const mid = Math.floor(stakingApys.length / 2)
            stakingApy = (stakingApys.length % 2 === 0
              ? (stakingApys[mid - 1] + stakingApys[mid]) / 2
              : stakingApys[mid]) * 100
          }
          if (delegationApys.length > 0) {
            const mid = Math.floor(delegationApys.length / 2)
            delegationApy = (delegationApys.length % 2 === 0
              ? (delegationApys[mid - 1] + delegationApys[mid]) / 2
              : delegationApys[mid]) * 100
          }
        }
      } catch {
        // Silently fallback to default APY values
      }
    })()

    const tzktPromise = (async () => {
      try {
        const statsData = await getNetworkStats(force)
        const cycleData = await getCurrentCycle(force, statsData.level)
        totalStaking = statsData.totalFrozen
        totalBakers = cycleData.totalBakers
      } catch {
        // If TzKT fails, use default values
      }
    })()

    await Promise.all([bakingBadPromise, tzktPromise])

    const result = {
      totalBakers: totalBakers,
      activeBakers: totalBakers,
      totalStaking: totalStaking,
      averageApy: stakingApy,
      stakingApy: stakingApy,
      delegationApy: delegationApy,
    }

    // Cache the result for 1 minute to reduce API calls
    cacheManager.set(cacheKey, result, CacheStrategies.GLOBAL_STATS)
    return result
  } catch (error) {
    // Final fallback: return default values if everything fails
    console.error("Error calculating bakers stats:", error)
    
    const result = {
      totalBakers: 264,
      activeBakers: 264,
      totalStaking: 300149220000000, // 300,149,220 tez in mutez
      averageApy: 8.02,
      stakingApy: 8.02,
      delegationApy: 2.67,
    }

    // Cache the result even on error to prevent repeated failures
    cacheManager.set(cacheKey, result, CacheStrategies.GLOBAL_STATS)
    return result
  }
}

/**
 * Preload critical data into cache on app initialization
 * Fetches network stats, current cycle, and top bakers in parallel
 * Useful for improving initial page load performance
 * 
 * Note: This preloads data but hooks will force refresh on mount to ensure fresh data
 */
export async function preloadCriticalData(): Promise<void> {
  // Invalidate cache first to ensure fresh data on page load
  invalidateNetworkCache()
  cacheManager.invalidatePattern(`active_bakers_.*`)
  cacheManager.invalidate("bakers_stats")
  
  const promises = [
    cacheManager.preload(
      CacheKeys.networkStats(),
      () => fetch(`${TZKT_API_BASE}/v1/statistics/current`).then((r) => r.json()),
      CacheStrategies.NETWORK_STATS,
    ),
    cacheManager.preload(
      CacheKeys.currentCycle(),
      () => fetch(`${TZKT_API_BASE}/v1/cycles?sort.desc=index&limit=1`).then((r) => r.json()).then((cycles) => cycles[0]),
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

"use client"

/**
 * React Hooks for TzKT Data with Intelligent Caching
 * 
 * This module provides React hooks for fetching and managing Tezos blockchain data.
 * All hooks include:
 * - Automatic data fetching and caching
 * - Loading and error states
 * - Manual refresh functionality
 * - Automatic background updates
 * - Last updated timestamp
 * 
 * These hooks wrap the cached API functions and provide a React-friendly interface.
 */

import { useState, useEffect, useCallback, useRef } from "react"
import {
  getNetworkStats,
  getCurrentCycle,
  getActiveBakers,
  getBakerDetails,
  getBakerRewards,
  getBakersStats,
  preloadCriticalData,
  invalidateBakerCache,
  invalidateNetworkCache,
  type NetworkStats,
  type Cycle,
  type Baker,
  type BakerRewards,
} from "@/lib/tzkt-api-cached"
import { cacheManager } from "@/lib/cache-manager"

/**
 * Hook to fetch and manage network statistics
 * 
 * Features:
 * - Fetches network stats and current cycle
 * - Caches data for 5 minutes
 * - Auto-refreshes every 5 minutes
 * - Manual refresh with cache invalidation
 * 
 * @returns Object containing stats, cycle, loading state, error, last updated time, and refresh function
 */
export function useNetworkStats() {
  const [stats, setStats] = useState<NetworkStats | null>(null)
  const [cycle, setCycle] = useState<Cycle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async (force = false) => {
    try {
      setLoading(true)

      if (force) {
        invalidateNetworkCache()
      }

      const [networkStats, currentCycle] = await Promise.all([getNetworkStats(), getCurrentCycle()])

      setStats(networkStats)
      setCycle(currentCycle)
      setError(null)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch network stats")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()

    // Auto-refresh every 5 minutes
    const interval = setInterval(() => fetchData(), 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchData])

  const refresh = useCallback(() => fetchData(true), [fetchData])

  return { stats, cycle, loading, error, lastUpdated, refresh }
}

/**
 * Hook to fetch and manage active bakers list
 * 
 * Features:
 * - Fetches list of active bakers sorted by staking balance
 * - Caches data for 10 minutes
 * - Auto-refreshes every 10 minutes
 * - Supports custom limit
 * 
 * @param limit - Number of bakers to fetch (default: 50)
 * @returns Object containing bakers array, loading state, error, last updated time, and refresh function
 */
export function useActiveBakers(limit = 50) {
  const [bakers, setBakers] = useState<Baker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchBakers = useCallback(
    async (force = false) => {
      try {
        setLoading(true)

        if (force) {
          cacheManager.invalidatePattern(`active_bakers_.*`)
        }

        const activeBakers = await getActiveBakers(limit)
        setBakers(activeBakers)
        setError(null)
        setLastUpdated(new Date())
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bakers")
      } finally {
        setLoading(false)
      }
    },
    [limit],
  )

  useEffect(() => {
    fetchBakers()

    // Auto-refresh every 10 minutes
    const interval = setInterval(() => fetchBakers(), 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchBakers])

  const refresh = useCallback(() => fetchBakers(true), [fetchBakers])

  return { bakers, loading, error, lastUpdated, refresh }
}

/**
 * Hook to fetch and manage details for a specific baker
 * 
 * Features:
 * - Fetches baker details and reward history
 * - Caches baker details for 2 minutes
 * - Caches rewards for 30 minutes
 * - Cancels pending requests when address changes
 * - Returns null if no address provided
 * 
 * @param address - Baker's Tezos address (null to skip fetching)
 * @returns Object containing baker details, rewards, loading state, error, last updated time, and refresh function
 */
export function useBakerDetails(address: string | null) {
  const [baker, setBaker] = useState<Baker | null>(null)
  const [rewards, setRewards] = useState<BakerRewards[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchBakerData = useCallback(
    async (force = false) => {
      if (!address) {
        setBaker(null)
        setRewards([])
        setLastUpdated(null)
        return
      }

      // Cancel previous request if it exists (prevents race conditions)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()

      try {
        setLoading(true)

        if (force) {
          invalidateBakerCache(address)
        }

        const [bakerDetails, bakerRewards] = await Promise.all([getBakerDetails(address), getBakerRewards(address, 10)])

        // Only update state if request wasn't cancelled
        if (!abortControllerRef.current?.signal.aborted) {
          setBaker(bakerDetails)
          setRewards(bakerRewards)
          setError(null)
          setLastUpdated(new Date())
        }
      } catch (err) {
        if (!abortControllerRef.current?.signal.aborted) {
          setError(err instanceof Error ? err.message : "Failed to fetch baker details")
          setBaker(null)
          setRewards([])
        }
      } finally {
        if (!abortControllerRef.current?.signal.aborted) {
          setLoading(false)
        }
      }
    },
    [address],
  )

  useEffect(() => {
    fetchBakerData()

    return () => {
      // Cleanup: cancel any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchBakerData])

  const refresh = useCallback(() => fetchBakerData(true), [fetchBakerData])

  return { baker, rewards, loading, error, lastUpdated, refresh }
}

/**
 * Hook to fetch and manage aggregated baker statistics
 * 
 * Features:
 * - Fetches total bakers, active bakers, total staking, and average APY
 * - Caches data for 1 minute
 * - Auto-refreshes every 15 minutes
 * - Calculates aggregated metrics from multiple sources
 * 
 * @returns Object containing stats, loading state, error, last updated time, and refresh function
 */
export function useBakersStats() {
  const [stats, setStats] = useState<{
    totalBakers: number
    activeBakers: number
    totalStaking: number
    averageApy: number
    stakingApy: number
    delegationApy: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchStats = useCallback(async (force = false) => {
    try {
      setLoading(true)

      if (force) {
        // Invalidate bakers stats cache and related network cache
        cacheManager.invalidate("bakers_stats")
        cacheManager.invalidate("network_stats")
        cacheManager.invalidate("current_cycle")
      }

      const bakersStats = await getBakersStats()
      setStats(bakersStats)
      setError(null)
      setLastUpdated(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch bakers stats")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()

    // Auto-refresh every 15 minutes
    const interval = setInterval(() => fetchStats(), 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchStats])

  const refresh = useCallback(() => fetchStats(true), [fetchStats])

  return { stats, loading, error, lastUpdated, refresh }
}

/**
 * Hook to preload critical data on app initialization
 * 
 * Features:
 * - Preloads network stats, current cycle, and top bakers
 * - Runs once on component mount
 * - Improves perceived performance for initial page load
 * - Tracks preload status and errors
 * 
 * @returns Object containing preload status and any error that occurred
 */
export function useDataPreloader() {
  const [preloaded, setPreloaded] = useState(false)
  const [preloadError, setPreloadError] = useState<string | null>(null)

  useEffect(() => {
    preloadCriticalData()
      .then(() => {
        setPreloaded(true)
        setPreloadError(null)
      })
      .catch((err) => {
        setPreloadError(err instanceof Error ? err.message : "Preload failed")
      })
  }, [])

  return { preloaded, preloadError }
}

/**
 * Hook to monitor cache statistics in real-time
 * 
 * Features:
 * - Provides cache size, hit rate, and entry details
 * - Updates every second for real-time monitoring
 * - Includes function to clear entire cache
 * - Useful for debugging and performance monitoring
 * 
 * @returns Object containing cache stats and clearCache function
 */
export function useCacheStats() {
  const [stats, setStats] = useState(cacheManager.getStats())

  useEffect(() => {
    // Update stats every second for real-time monitoring
    const interval = setInterval(() => {
      setStats(cacheManager.getStats())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  /**
   * Clear all cache entries
   * Useful for debugging or forcing fresh data fetch
   */
  const clearCache = useCallback(() => {
    cacheManager.clear()
    setStats(cacheManager.getStats())
  }, [])

  return { ...stats, clearCache }
}

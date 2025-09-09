"use client"

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

// Hook pour les statistiques du réseau avec cache intelligent
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

    // Rafraîchir toutes les 5 minutes
    const interval = setInterval(() => fetchData(), 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchData])

  const refresh = useCallback(() => fetchData(true), [fetchData])

  return { stats, cycle, loading, error, lastUpdated, refresh }
}

// Hook pour les bakers actifs avec pagination et cache
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

    // Rafraîchir toutes les 10 minutes
    const interval = setInterval(() => fetchBakers(), 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchBakers])

  const refresh = useCallback(() => fetchBakers(true), [fetchBakers])

  return { bakers, loading, error, lastUpdated, refresh }
}

// Hook pour les détails d'un baker avec cache optimisé
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

      // Annuler la requête précédente si elle existe
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

        // Vérifier si la requête n'a pas été annulée
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
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchBakerData])

  const refresh = useCallback(() => fetchBakerData(true), [fetchBakerData])

  return { baker, rewards, loading, error, lastUpdated, refresh }
}

// Hook pour les statistiques globales des bakers
export function useBakersStats() {
  const [stats, setStats] = useState<{
    totalBakers: number
    activeBakers: number
    totalStaking: number
    averageApy: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchStats = useCallback(async (force = false) => {
    try {
      setLoading(true)

      if (force) {
        cacheManager.invalidate("bakers_stats")
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

    // Rafraîchir toutes les 15 minutes
    const interval = setInterval(() => fetchStats(), 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [fetchStats])

  const refresh = useCallback(() => fetchStats(true), [fetchStats])

  return { stats, loading, error, lastUpdated, refresh }
}

// Hook pour précharger les données critiques
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

// Hook pour les statistiques du cache
export function useCacheStats() {
  const [stats, setStats] = useState(cacheManager.getStats())

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(cacheManager.getStats())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const clearCache = useCallback(() => {
    cacheManager.clear()
    setStats(cacheManager.getStats())
  }, [])

  return { ...stats, clearCache }
}

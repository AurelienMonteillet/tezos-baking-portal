"use client"

import { useState, useEffect } from "react"
import {
  getNetworkStats,
  getCurrentCycle,
  getActiveBakers,
  getBakerDetails,
  getBakerRewards,
  getBakersStats,
  type NetworkStats,
  type Cycle,
  type Baker,
  type BakerRewards,
} from "@/lib/tzkt-api"

// Hook pour les statistiques du réseau
export function useNetworkStats() {
  const [stats, setStats] = useState<NetworkStats | null>(null)
  const [cycle, setCycle] = useState<Cycle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [networkStats, currentCycle] = await Promise.all([getNetworkStats(), getCurrentCycle()])
        setStats(networkStats)
        setCycle(currentCycle)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch network stats")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Rafraîchir toutes les 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { stats, cycle, loading, error }
}

// Hook pour les bakers actifs
export function useActiveBakers(limit = 50) {
  const [bakers, setBakers] = useState<Baker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBakers() {
      try {
        setLoading(true)
        const activeBakers = await getActiveBakers(limit)
        setBakers(activeBakers)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bakers")
      } finally {
        setLoading(false)
      }
    }

    fetchBakers()
    // Rafraîchir toutes les 10 minutes
    const interval = setInterval(fetchBakers, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [limit])

  return { bakers, loading, error }
}

// Hook pour les détails d'un baker spécifique
export function useBakerDetails(address: string | null) {
  const [baker, setBaker] = useState<Baker | null>(null)
  const [rewards, setRewards] = useState<BakerRewards[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address) {
      setBaker(null)
      setRewards([])
      return
    }

    async function fetchBakerData() {
      try {
        setLoading(true)
        const [bakerDetails, bakerRewards] = await Promise.all([getBakerDetails(address), getBakerRewards(address, 10)])
        setBaker(bakerDetails)
        setRewards(bakerRewards)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch baker details")
        setBaker(null)
        setRewards([])
      } finally {
        setLoading(false)
      }
    }

    fetchBakerData()
  }, [address])

  return { baker, rewards, loading, error }
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

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true)
        const bakersStats = await getBakersStats()
        setStats(bakersStats)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch bakers stats")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
    // Rafraîchir toutes les 15 minutes
    const interval = setInterval(fetchStats, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return { stats, loading, error }
}

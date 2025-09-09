// Version optimisée de l'API TzKT avec cache intelligent
import { cacheManager, CacheStrategies, CacheKeys } from "./cache-manager"

// Types pour l'API TzKT (redéfinis ici pour éviter les dépendances circulaires)
export interface NetworkStats {
  cycle: number
  level: number
  timestamp: string
  totalBootstrapped: number
  totalCommitments: number
  totalActivated: number
  totalCreated: number
  totalBurned: number
  totalBanished: number
  totalFrozen: number
  totalRollupBonds: number
  totalSmartRollupBonds: number
  quote?: {
    usd: number
    eur: number
    btc: number
  }
}

export interface Baker {
  address: string
  alias?: string
  type: string
  active: boolean
  balance: number
  frozenDeposits: number
  frozenRewards: number
  frozenFees: number
  stakingBalance: number
  delegatedBalance: number
  numDelegators: number
  stakingCapacity: number
  stakingEfficiency: number
  fee: number
  estimatedApy: number
  numBlocks: number
  numEndorsements: number
  numBallots: number
  numProposals: number
  numActivations: number
  numDoubleBaking: number
  numDoubleEndorsing: number
  numNonceRevelations: number
  numRevelationPenalties: number
  numEndorsingRewards: number
  software?: {
    version: string
    date: string
  }
}

export interface Cycle {
  index: number
  firstLevel: number
  startTime: string
  lastLevel: number
  endTime: string
  snapshotIndex: number
  snapshotLevel: number
  randomSeed: string
  totalBakers: number
  totalStaking: number
  totalDelegated: number
  totalDelegators: number
  quote?: {
    usd: number
  }
}

export interface BakerRewards {
  cycle: number
  baker: string
  stakingBalance: number
  expectedBlocks: number
  expectedEndorsements: number
  futureBlocks: number
  futureBlockRewards: number
  blocks: number
  blockRewards: number
  missedBlocks: number
  missedBlockRewards: number
  futureEndorsements: number
  futureEndorsementRewards: number
  endorsements: number
  endorsementRewards: number
  missedEndorsements: number
  missedEndorsementRewards: number
  blockFees: number
  missedBlockFees: number
  doubleBakingRewards: number
  doubleBakingLostDeposits: number
  doubleBakingLostRewards: number
  doubleBakingLostFees: number
  doubleEndorsingRewards: number
  doubleEndorsingLostDeposits: number
  doubleEndorsingLostRewards: number
  doubleEndorsingLostFees: number
  revelationRewards: number
  revelationLostRewards: number
  revelationLostFees: number
  quote?: {
    usd: number
  }
}

const TZKT_API_BASE = "https://api.tzkt.io"

// Fonction utilitaire pour faire des requêtes avec cache
async function cachedTzktFetch<T>(
  endpoint: string,
  cacheKey: string,
  cacheStrategy: (typeof CacheStrategies)[keyof typeof CacheStrategies],
): Promise<T> {
  // Essayer d'obtenir depuis le cache
  const cached = cacheManager.get<T>(cacheKey, cacheStrategy)

  if (cached) {
    cacheManager.recordHit()

    // Si stale-while-revalidate, lancer une mise à jour en arrière-plan
    if (cacheStrategy.staleWhileRevalidate) {
      // Vérifier si les données sont périmées
      const entry = (cacheManager as any).cache.get(cacheKey)
      if (entry && Date.now() - entry.timestamp > entry.ttl) {
        // Mise à jour en arrière-plan
        fetchAndCache<T>(endpoint, cacheKey, cacheStrategy).catch(() => {
          // Ignorer les erreurs de mise à jour en arrière-plan
        })
      }
    }

    return cached
  }

  cacheManager.recordMiss()
  return fetchAndCache<T>(endpoint, cacheKey, cacheStrategy)
}

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

// API functions avec cache
export async function getNetworkStats(): Promise<NetworkStats> {
  return cachedTzktFetch<NetworkStats>(
    "/v1/statistics/current",
    CacheKeys.networkStats(),
    CacheStrategies.NETWORK_STATS,
  )
}

export async function getCurrentCycle(): Promise<Cycle> {
  return cachedTzktFetch<Cycle>("/v1/cycles/current", CacheKeys.currentCycle(), CacheStrategies.NETWORK_STATS)
}

export async function getActiveBakers(limit = 50): Promise<Baker[]> {
  return cachedTzktFetch<Baker[]>(
    `/v1/delegates?active=true&sort.desc=stakingBalance&limit=${limit}`,
    CacheKeys.activeBakers(limit),
    CacheStrategies.BAKERS_LIST,
  )
}

export async function getBakerDetails(address: string): Promise<Baker> {
  return cachedTzktFetch<Baker>(
    `/v1/delegates/${address}`,
    CacheKeys.bakerDetails(address),
    CacheStrategies.BAKER_DETAILS,
  )
}

export async function getBakerRewards(address: string, limit = 10): Promise<BakerRewards[]> {
  return cachedTzktFetch<BakerRewards[]>(
    `/v1/rewards/delegates/${address}?limit=${limit}`,
    CacheKeys.bakerRewards(address, limit),
    CacheStrategies.BAKER_REWARDS,
  )
}

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

  // Calculer les statistiques
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

// Fonction pour précharger les données critiques
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

// Fonction pour invalider le cache d'un baker spécifique
export function invalidateBakerCache(address: string): void {
  cacheManager.invalidate(CacheKeys.bakerDetails(address))
  cacheManager.invalidatePattern(`baker_rewards_${address}_.*`)
}

// Fonction pour invalider tout le cache réseau
export function invalidateNetworkCache(): void {
  cacheManager.invalidate(CacheKeys.networkStats())
  cacheManager.invalidate(CacheKeys.currentCycle())
  cacheManager.invalidate(CacheKeys.bakersStats())
}

// Utilitaires de formatage
export function formatXTZ(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount / 1000000) // Convertir de mutez vers XTZ
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 7)}...${address.slice(-4)}`
}

export function calculateEstimatedApy(baker: Baker, recentRewards: BakerRewards[]): number {
  if (recentRewards.length === 0 || baker.stakingBalance === 0) return 0

  // Calculer la moyenne des récompenses des derniers cycles
  const avgRewards =
    recentRewards.reduce((sum, reward) => {
      return sum + (reward.blockRewards + reward.endorsementRewards + reward.blockFees)
    }, 0) / recentRewards.length

  // Estimer l'APY (365 cycles par an approximativement)
  const annualRewards = avgRewards * 365
  return (annualRewards / baker.stakingBalance) * 100
}

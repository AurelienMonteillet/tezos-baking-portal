// Types pour l'API TzKT
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

// Fonction utilitaire pour faire des requêtes à l'API TzKT
async function tzktFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${TZKT_API_BASE}${endpoint}`)
  if (!response.ok) {
    throw new Error(`TzKT API error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

// Obtenir les statistiques actuelles du réseau
export async function getNetworkStats(): Promise<NetworkStats> {
  return tzktFetch<NetworkStats>("/v1/statistics/current")
}

// Obtenir le cycle actuel
export async function getCurrentCycle(): Promise<Cycle> {
  return tzktFetch<Cycle>("/v1/cycles/current")
}

// Obtenir la liste des bakers actifs
export async function getActiveBakers(limit = 50): Promise<Baker[]> {
  return tzktFetch<Baker[]>(`/v1/delegates?active=true&sort.desc=stakingBalance&limit=${limit}`)
}

// Obtenir les détails d'un baker spécifique
export async function getBakerDetails(address: string): Promise<Baker> {
  return tzktFetch<Baker>(`/v1/delegates/${address}`)
}

// Obtenir les récompenses d'un baker pour les derniers cycles
export async function getBakerRewards(address: string, limit = 10): Promise<BakerRewards[]> {
  return tzktFetch<BakerRewards[]>(`/v1/rewards/delegates/${address}?limit=${limit}`)
}

// Obtenir les statistiques globales des bakers
export async function getBakersStats(): Promise<{
  totalBakers: number
  activeBakers: number
  totalStaking: number
  averageApy: number
}> {
  const [stats, cycle] = await Promise.all([getNetworkStats(), getCurrentCycle()])

  const bakers = await getActiveBakers(500) // Obtenir plus de bakers pour les stats
  const activeBakers = bakers.filter((b) => b.active).length
  const totalStaking = bakers.reduce((sum, b) => sum + b.stakingBalance, 0)
  const averageApy = bakers.reduce((sum, b) => sum + (b.estimatedApy || 0), 0) / bakers.length

  return {
    totalBakers: cycle.totalBakers,
    activeBakers,
    totalStaking,
    averageApy,
  }
}

// Calculer l'APY estimé basé sur les récompenses récentes
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

// Formater les montants XTZ
export function formatXTZ(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount / 1000000) // Convertir de mutez vers XTZ
}

// Formater les pourcentages
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`
}

// Formater les adresses (raccourcir)
export function formatAddress(address: string): string {
  return `${address.slice(0, 7)}...${address.slice(-4)}`
}

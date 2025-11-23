/**
 * TzKT API Type Definitions and Helper Functions
 * 
 * This file contains:
 * - TypeScript interfaces for TzKT API responses
 * - Utility functions for formatting blockchain data
 * - Helper functions for calculations
 * 
 * TzKT API Documentation: https://api.tzkt.io/
 */

/**
 * Network-wide statistics from the Tezos blockchain
 * Provides overall state and metrics of the network
 */
export interface NetworkStats {
  cycle: number                    // Current cycle number
  level: number                    // Current block level
  timestamp: string                // ISO timestamp of current block
  totalBootstrapped: number        // Initial XTZ from genesis
  totalCommitments: number         // Committed XTZ from fundraiser
  totalActivated: number           // Activated XTZ from commitments
  totalCreated: number             // Total XTZ created (minted)
  totalBurned: number              // Total XTZ burned
  totalBanished: number            // Total XTZ from banned accounts
  totalFrozen: number              // Total XTZ frozen in deposits/rewards
  totalRollupBonds: number         // XTZ locked in rollup bonds
  totalSmartRollupBonds: number    // XTZ locked in smart rollup bonds
  quote?: {
    usd: number                    // XTZ price in USD
    eur: number                    // XTZ price in EUR
    btc: number                    // XTZ price in BTC
  }
}

/**
 * Baker (Delegate) information
 * Represents a Tezos baker with all relevant metrics
 */
export interface Baker {
  address: string                  // Baker's Tezos address (tz1/tz2/tz3...)
  alias?: string                   // Human-readable name (if registered)
  type: string                     // Account type (usually "delegate")
  active: boolean                  // Whether baker is currently active
  balance: number                  // Baker's own balance (in mutez)
  frozenDeposits: number           // XTZ frozen as security deposits
  frozenRewards: number            // XTZ frozen from rewards
  frozenFees: number               // XTZ frozen from transaction fees
  stakingBalance: number           // Total staking balance (own + delegated)
  delegatedBalance: number         // XTZ delegated by others
  numDelegators: number            // Number of accounts delegating to this baker
  stakingCapacity: number          // Maximum XTZ this baker can accept
  stakingEfficiency: number        // Efficiency percentage (0-100)
  fee: number                      // Baker's fee percentage
  estimatedApy: number             // Estimated annual percentage yield
  numBlocks: number                // Total blocks baked
  numEndorsements: number          // Total endorsements made
  numBallots: number               // Governance ballots cast
  numProposals: number             // Governance proposals submitted
  numActivations: number           // Account activations processed
  numDoubleBaking: number          // Double baking incidents (penalties)
  numDoubleEndorsing: number       // Double endorsing incidents (penalties)
  numNonceRevelations: number      // Nonce revelations made
  numRevelationPenalties: number   // Penalties from missed revelations
  numEndorsingRewards: number      // Total endorsing rewards received
  software?: {
    version: string                // Baking software version
    date: string                   // Last update date
  }
}

/**
 * Tezos cycle information
 * A cycle is a period of blocks (~2.8 days on mainnet)
 */
export interface Cycle {
  index: number                    // Cycle number
  firstLevel: number               // First block level in this cycle
  startTime: string                // ISO timestamp of cycle start
  lastLevel: number                // Last block level in this cycle
  endTime: string                  // ISO timestamp of cycle end
  snapshotIndex: number            // Random snapshot index for rights calculation
  snapshotLevel: number            // Block level of the snapshot
  randomSeed: string               // Random seed for this cycle
  totalBakers: number              // Total number of bakers this cycle
  totalStaking: number             // Total XTZ staked this cycle
  totalDelegated: number           // Total XTZ delegated this cycle
  totalDelegators: number          // Total number of delegators
  quote?: {
    usd: number                    // XTZ price in USD during this cycle
  }
}

/**
 * Baker rewards for a specific cycle
 * Tracks all rewards, penalties, and performance metrics
 */
export interface BakerRewards {
  cycle: number                           // Cycle number for these rewards
  baker: string                           // Baker's address
  stakingBalance: number                  // Baker's staking balance for this cycle
  expectedBlocks: number                  // Number of blocks expected to bake
  expectedEndorsements: number            // Number of endorsements expected
  futureBlocks: number                    // Future blocks (not yet baked)
  futureBlockRewards: number              // Potential rewards from future blocks
  blocks: number                          // Actual blocks baked
  blockRewards: number                    // Rewards earned from baking blocks
  missedBlocks: number                    // Blocks missed (not baked)
  missedBlockRewards: number              // Rewards lost from missed blocks
  futureEndorsements: number              // Future endorsements (not yet made)
  futureEndorsementRewards: number        // Potential rewards from future endorsements
  endorsements: number                    // Actual endorsements made
  endorsementRewards: number              // Rewards earned from endorsements
  missedEndorsements: number              // Endorsements missed
  missedEndorsementRewards: number        // Rewards lost from missed endorsements
  blockFees: number                       // Transaction fees collected
  missedBlockFees: number                 // Fees lost from missed blocks
  doubleBakingRewards: number             // Rewards from catching double bakers
  doubleBakingLostDeposits: number        // Deposits lost due to double baking
  doubleBakingLostRewards: number         // Rewards lost due to double baking
  doubleBakingLostFees: number            // Fees lost due to double baking
  doubleEndorsingRewards: number          // Rewards from catching double endorsers
  doubleEndorsingLostDeposits: number     // Deposits lost due to double endorsing
  doubleEndorsingLostRewards: number      // Rewards lost due to double endorsing
  doubleEndorsingLostFees: number         // Fees lost due to double endorsing
  revelationRewards: number               // Rewards from nonce revelations
  revelationLostRewards: number           // Rewards lost from missed revelations
  revelationLostFees: number              // Fees lost from missed revelations
  quote?: {
    usd: number                           // USD value of XTZ for this cycle
  }
}

// ============ Formatting Utilities ============

/**
 * Format XTZ amounts for display
 * Converts from mutez (1 XTZ = 1,000,000 mutez) to XTZ
 * @param amount - Amount in mutez
 * @returns Formatted string with thousand separators
 */
export function formatXTZ(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount / 1000000) // Convert from mutez to XTZ
}

/**
 * Format percentages for display
 * @param value - Percentage value (e.g., 5.5 for 5.5%)
 * @returns Formatted percentage string with 2 decimal places
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`
}

/**
 * Format Tezos addresses for display (shortened)
 * @param address - Full Tezos address
 * @returns Shortened address (e.g., "tz1abcd...xyz")
 */
export function formatAddress(address: string): string {
  return `${address.slice(0, 7)}...${address.slice(-4)}`
}

/**
 * Calculate estimated APY based on recent rewards
 * @param baker - Baker information
 * @param recentRewards - Array of recent reward cycles
 * @returns Estimated annual percentage yield
 */
export function calculateEstimatedApy(baker: Baker, recentRewards: BakerRewards[]): number {
  if (recentRewards.length === 0 || baker.stakingBalance === 0) return 0

  // Calculate average rewards from recent cycles
  const avgRewards =
    recentRewards.reduce((sum, reward) => {
      return sum + (reward.blockRewards + reward.endorsementRewards + reward.blockFees)
    }, 0) / recentRewards.length

  // Estimate APY (approximately 365 cycles per year)
  const annualRewards = avgRewards * 365
  return (annualRewards / baker.stakingBalance) * 100
}

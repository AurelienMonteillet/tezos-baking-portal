export const networkStatsContent = {
  title: "Tezos Network & Baking Stats",
  description: "Current statistics and performance metrics for the Tezos network and baking operations.",
  stakingApy: {
    title: "Current APY",
    description: "Estimated annual percentage yield for staking and delegating XTZ",
    label: "Annual Yield",
    buttons: {
      historical: {
        text: "Historical data",
        href: "https://tzkt.io/cycles", 
      },
      bakerStats: {
        text: "Baker stats",
        href: "https://tzkt.io/bakers",
      },
    },
  },
  networkPerformance: {
    title: "Network Performance",
    description: "Key metrics for Tezos network performance",
    labels: {
      activeBakers: "Active Bakers",
      totalStaked: "Total Staked XTZ",
      currentCycle: "Current Cycle",
      blockTime: "Block Time",
    },
    link: {
      text: "View detailed analytics",
      href: "https://tzkt.io/stats",
    },
  },
  images: {
    background: "/images/gradient-bg-bottom-right.webp",
  },
}

export const networkStatsContent = {
  title: "Tezos Network & Baking Stats",
  description: "Current statistics and performance metrics for the Tezos network and baking operations.",
  stakingApy: {
    title: "Current APY",
    description: "Estimated annual percentage yield for staking and delegating tez.",
    label: "Annual Yield",
    dataSource: {
      text: "BakingBad",
      href: "https://baking-bad.org",
    },
    buttons: {
      historical: {
        text: "Historical data on TzKT",
        href: "https://tzkt.io/cycles", 
      },
      bakerStats: {
        text: "Baker stats on TzKT",
        href: "https://tzkt.io/bakers",
      },
    },
  },
  networkPerformance: {
    title: "Network Performance",
    description: "Key metrics for Tezos network performance",
    labels: {
      activeBakers: "Active Bakers",
      totalStaked: "Total staked tez",
      currentCycle: "Current Cycle",
      blockTime: "Block Time",
    },
    link: {
      text: "Analytics",
      href: "https://tzkt.io/stats",
    },
  },
  images: {
    background: "/images/gradient-bg-bottom-right.webp",
  },
}

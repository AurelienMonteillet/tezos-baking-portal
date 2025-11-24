import { Terminal, Layers, LineChart, Wallet, Activity, Database } from "lucide-react"

export const toolsContent = {
  title: "Useful Tools for Baking",
  description: "Essential tools and resources to help you manage your baking operations effectively.",
  cards: [
    {
      icon: Layers,
      title: "TezBake (BakeBuddy)",
      description: "Easy to use Tezos baking software for both novices and advanced users.",
      linkText: "View tool",
      href: "https://www.bakebuddy.xyz/",
    },
    {
      icon: Terminal,
      title: "Kiln",
      description: "GUI tool for baking on Tezos. Easy to set up and monitor your baker.",
      linkText: "View tool",
      href: "https://tezos-kiln.net/",
    },
    {
      icon: Wallet,
      title: "TezPay",
      description: "Automated payout tool for Tezos bakers to distribute rewards to delegators.",
      linkText: "View documentation",
      href: "https://docs.tez.capital/tezpay/",
    },
    {
      icon: Activity,
      title: "TezCool",
      description: "Comprehensive analytics, visualization, and ecosystem data for Tezos.",
      linkText: "Visit website",
      href: "https://tez.cool/",
    },
    {
      icon: Database,
      title: "Tzinit Snapshots",
      description: "Fast and reliable snapshot service for bootstrapping your Tezos node quickly.",
      linkText: "Get snapshots",
      href: "https://snapshots.tzinit.org/",
    },
    {
      icon: LineChart,
      title: "TzKT Explorer",
      description: "Advanced Tezos block explorer with detailed baking statistics and API.",
      linkText: "View explorer",
      href: "https://tzkt.io",
    },
  ],
  images: {
    background: "/images/gradient-bg-bottom-left.webp",
  },
}

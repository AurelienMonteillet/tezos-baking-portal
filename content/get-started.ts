import { Server, Terminal, Lock, Target, TrendingUp, Globe } from "lucide-react"

export const getStartedContent = {
  title: "Getting Started",
  description: "Everything you need to set up and run your own Tezos baker.",
  tag: {
    text: "Octez v24.4 available now",
    href: "https://octez.tezos.com/docs/releases/version-24.html",
  },
  cards: [
    {
      icon: Target,
      title: "Deployment Options",
      description: "Different ways to deploy your baker",
      items: [
        "Bare metal installation",
        "Octez services",
        "Octez signer",
      ],
      linkText: "View deployment options",
      href: "https://octez.tezos.com/docs/introduction/services.html",
    },
    {
      icon: Lock,
      title: "Key Management",
      description: "Secure your baker with proper key management",
      items: [
        "Consensus & companion keys",
        "Hardware security modules (HSM)",
        "Cloud HSM/KMS with Signatory",
        "Unikey signers",
      ],
      linkText: "View key management guide",
      href: "https://octez.tezos.com/docs/user/key-management.html",
    },
    {
      icon: Server,
      title: "Hardware Setup",
      description: "Recommended specifications and configurations",
      items: [
        "Minimum 16GB RAM (swap included), 3 CPU cores",
        "100GB SSD storage",
        "Low-latency reliable internet connection",
      ],
      linkText: "View hardware guide",
      href: "https://octez.tezos.com/docs/releases/version-23.html#minimal-hardware-specifications",
    },
    {
      icon: Terminal,
      title: "Software Installation",
      description: "Step-by-step installation process",
      items: [
        "Install Octez software suite",
        "Configure node and baker",
        "Run a DAL node",
      ],
      linkText: "View installation guide",
      href: "https://octez.tezos.com/docs/introduction/howtoget.html",
    },
    {
      icon: TrendingUp,
      title: "Monitoring",
      description: "Keep track of your baker's performance",
      items: [
        "Grafazos monitoring setup",
        "Prometheus & Grafana dashboards",
        "Alert configuration",
        "Performance optimization",
      ],
      linkText: "View monitoring guide",
      href: "https://octez.tezos.com/docs/user/node-monitoring.html",
    },
    {
      icon: Globe,
      title: "Testnets",
      description: "Practice on testnets before mainnet",
      items: [
        "Shadownet setup",
        "Obtaining testnet tez",
        "Testing protocol upgrades",
        "Playing with the protocol",
      ],
      linkText: "View testnet guide",
      href: "https://docs.tezos.com/developing/testnets",
    },
  ],
  documentationButton: {
    text: "Explore full Octez documentation",
    href: "https://octez.tezos.com/docs/",
  },
  images: {
    background: "/images/gradient-bg-bottom-right.webp",
  },
}

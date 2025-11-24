import { Server, Terminal, Lock, Target, TrendingUp, Globe } from "lucide-react"

export const getStartedContent = {
  title: "How to get started",
  description: "Everything you need to set up and run your own Tezos baker.",
  cards: [
    {
      icon: Server,
      title: "Hardware Setup",
      description: "Recommended specifications and configurations",
      items: [
        "Minimum 8GB RAM, 4 CPU cores",
        "100GB+ SSD storage",
        "Stable internet connection (10+ Mbps)",
        "Uninterruptible power supply",
      ],
      linkText: "View hardware guide",
      href: "https://octez.tezos.com/docs/releases/version-23.html#minimal-hardware-specifications", // TODO: Update to the latest version
    },
    {
      icon: Terminal,
      title: "Software Installation",
      description: "Step-by-step installation process",
      items: [
        "Install Octez software suite",
        "Configure node and baker",
        "Set up DAL node (optional)",
        "Deploy monitoring tools",
      ],
      linkText: "View installation guide",
      href: "https://docs.tezos.com/tutorials/join-dal-baker/run-node",
    },
    {
      icon: Lock,
      title: "Key Management",
      description: "Secure your baker with proper key management",
      items: [
        "Generate consensus & companion keys",
        "Hardware security modules (HSM)",
        "Cloud HSM/KMS with Signatory",
        "Unikey signer setup",
      ],
      linkText: "View key management guide",
      href: "https://octez.tezos.com/docs/user/key-management.html",
    },
    {
      icon: Target,
      title: "Deployment Options",
      description: "Different ways to deploy your baker",
      items: [
        "Bare metal installation",
        "Docker / Docker Compose",
        "Octez services",
        "Octez signer",
      ],
      linkText: "View deployment options",
      href: "https://octez.tezos.com/docs/introduction/services.html",
    },
    {
      icon: TrendingUp,
      title: "Monitoring",
      description: "Keep track of your baker's performance",
      items: [
        "Garfazos monitoring setup",
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
        "Ghostnet setup",
        "Obtaining testnet tez",
        "Testing protocol upgrades",
        "Participating in testnet voting",
      ],
      linkText: "View testnet guide",
      href: "https://teztnets.com/",
    },
  ],
  documentationButton: {
    text: "Explore Full Documentation",
    href: "https://octez.tezos.com/docs/",
  },
  images: {
    background: "/images/gradient-bg-bottom-right.webp",
  },
}

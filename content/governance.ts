export const governanceContent = {
  title: "Governance Overview",
  description: "Tezos has an on-chain governance mechanism that allows the protocol to upgrade itself through a formal proposal process. The Tezos Agora community platform is where governance discussions, proposals, and voting take place.",
  steps: [
    {
      title: "Proposal Period",
      description: "Delegates propose and upvote protocol amendment proposals. If a quorum is met, the top-voted proposal moves to the next period.",
    },
    {
      title: "Exploration & Cooldown",
      description: "Delegates vote on whether to consider the proposal (Exploration period). If passed, a Cooldown period allows the community to test and prepare infrastructure.",
    },
    {
      title: "Promotion & Adoption",
      description: "Delegates make a final vote on whether to apply the proposal (Promotion period). If passed, the Adoption period allows adaptation before automatic activation.",
    },
  ],
  buttons: {
    primary: {
      text: "Learn more about governance",
      href: "https://docs.tezos.com/architecture/governance",
    },
    secondary: {
      text: "Discuss proposals on Agora",
      href: "https://www.tezosagora.org/",
    },
  },
  images: {
    background: "/images/gradient-bg-bottom-left.webp",
    illustration: "/tezos-governance-illustration.webp",
  },
}

export const governanceContent = {
  title: "Governance Overview",
  description: "Tezos has an on-chain governance mechanism that allows the protocol to upgrade itself through a formal proposal process.",
  steps: [
    {
      title: "Proposal Period",
      description: "Bakers can submit and upvote protocol upgrade proposals during this period.",
    },
    {
      title: "Exploration & Testing",
      description: "The winning proposal moves to an exploration vote followed by a testing period on a test network.",
    },
    {
      title: "Promotion & Adoption",
      description: "After successful testing, a promotion vote determines if the proposal is adopted into the protocol.",
    },
  ],
  buttons: {
    primary: {
      text: "Learn more about governance",
      href: "https://docs.tezos.com/architecture/governance",
    },
    secondary: {
      text: "Visit Agora",
      href: "https://www.tezosagora.org/",
    },
  },
  images: {
    background: "/images/gradient-bg-bottom-left.webp",
    illustration: "/tezos-baking-illustration-with-people-collaboratin.jpg",
  },
}

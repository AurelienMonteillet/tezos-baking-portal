export const footerContent = {
  builtBy: [
    { text: "Nomadic Labs", href: "https://www.nomadic-labs.com/" },
    { text: "Trilitech", href: "https://www.trili.tech/" }
  ],
  githubText: "",
  githubLink: "https://github.com/AurelienMonteillet/tezos-baking-portal", 
  communityLinks: [
    { text: "Discord", href: "https://discord.com/invite/tezos" },
    { text: "Stack Exchange", href: "https://tezos.stackexchange.com/" },
    { text: "Tezos Agora", href: "https://forum.tezosagora.org/" },
  ],
  links: [
    { text: "Privacy Notice", href: "https://tezos.com/privacy-notice/" },
    { text: "Cookies Policy", href: "https://tezos.com/cookies-policy/" },
  ],
  images: {
    logo: "/tezos-logomark.svg",
  },
  // Copyright year is generated dynamically in Footer component to avoid hydration issues
  // The year updates automatically each year without manual changes
}

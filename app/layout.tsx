/**
 * Root Layout Component
 * 
 * This is the root layout for the entire application.
 * It sets up:
 * - Global fonts (Outfit and Roboto)
 * - Theme provider for dark mode support
 * - Global CSS styles
 * - Meta tags for SEO
 */

import type React from "react"
import type { Metadata } from "next"
import { Outfit, Roboto } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import dynamic from "next/dynamic"

// Lazy load non-critical components to reduce initial bundle size
const FeedbackButton = dynamic(() => import("@/components/feedback-button").then(m => ({ default: m.FeedbackButton })), { ssr: false })
const DeferredPostHog = dynamic(() => import("@/components/deferred-posthog").then(m => ({ default: m.DeferredPostHog })), { ssr: false })

// Configure Outfit font (headings and UI elements)
// Reduced weights for better mobile performance
// Using 'swap' for better visual quality - font loads quickly
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap", // Shows custom font as soon as it loads
  weight: ["400", "600", "700"], // Removed 500 to reduce font file size
  preload: true, // Preload primary font for faster display
  adjustFontFallback: true, // Automatically adjusts fallback font metrics
  fallback: ["system-ui", "arial"], // Better fallback for faster rendering
})

// Configure Roboto font (body text)
// Reduced weights for better mobile performance
// Using 'swap' for better visual quality - font loads quickly
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Removed 500 to reduce font file size
  variable: "--font-roboto",
  display: "swap", // Shows custom font as soon as it loads
  preload: false, // Only preload primary font
  adjustFontFallback: true, // Automatically adjusts fallback font metrics
  fallback: ["system-ui", "arial"], // Better fallback for faster rendering
})

/**
 * Application metadata for SEO and social sharing
 */
export const metadata: Metadata = {
  title: {
    default: "Tezos Baking Portal",
    template: "%s | Tezos Baking Portal",
  },
  description: "Tezos Baking Portal - Complete guide to Tezos baking, staking, and delegation. Real-time APY, network statistics, baker tools, and step-by-step setup guides. Start baking Tezos (XTZ) today.",
  keywords: ["Tezos", "baking", "staking", "delegation", "blockchain", "cryptocurrency", "XTZ", "baker", "validator"],
  authors: [{ name: "Tezos Baking Portal" }],
  creator: "Tezos Community",
  publisher: "Tezos Baking Portal",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL 
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("https://bakers.tezos.com"),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/`
      : "https://bakers.tezos.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Tezos Baking Portal",
    title: "Tezos Baking Portal - Your Complete Baking Resource",
    description: "Tezos Baking Portal - Complete guide to Tezos baking, staking, and delegation. Real-time APY, network statistics, baker tools, and step-by-step setup guides.",
    images: [
      {
        url: "/tezos-baking-portal-logo.svg",
        width: 191,
        height: 32,
        alt: "Tezos Baking Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tezos Baking Portal",
    description: "Tezos Baking Portal - Complete guide to Tezos baking, staking, and delegation. Real-time APY, network statistics, baker tools, and step-by-step setup guides.",
    images: ["/tezos-baking-portal-logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      // Prefer PNG for broad favicon support across browsers
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      // Keep SVG as a fallback for browsers that support it
      { url: "/tezos-logomark.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [
      // Apple Touch Icon: PNG is the most reliable format
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/icon.png",
  },
}

/**
 * Root layout component
 * Wraps all pages with global providers and styling
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${roboto.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="H8WGaQWNNKHdKrzh9TseVz6opGZlWwr0wK-c2Re0T5Q" />
        <meta name="google-site-verification" content="pimXch41H7tmNw54yVujx8uqvnWNZ2LWufoxSnc_C9w" />
        
        {/* Favicon - prefer PNG for broad browser support; keep SVG as fallback */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icon.png" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/tezos-logomark.svg" />
        <link rel="shortcut icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" sizes="32x32" href="/icon.png" />
        
        {/* Structured Data for SEO - Non-blocking */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Tezos Baking Portal",
                description: "Your comprehensive resource for Tezos baking — from setup to optimization, governance to rewards.",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://bakers.tezos.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bakers.tezos.com"}/?q={search_term_string}`,
                  },
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Tezos Baking Portal",
                description: "Comprehensive resource for Tezos baking, staking, and delegation",
                url: process.env.NEXT_PUBLIC_SITE_URL || "https://bakers.tezos.com",
                logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://bakers.tezos.com"}/tezos-baking-portal-logo.svg`,
                sameAs: [
                  "https://github.com/AurelienMonteillet/tezos-baking-portal",
                  "https://discord.com/invite/tezos",
                  "https://tezos.stackexchange.com/",
                  "https://forum.tezosagora.org/",
                ],
              },
            ]),
          }}
        />
        {/* PostHog Analytics is loaded client-side after LCP via DeferredPostHog component to improve performance */}
        {/* Removed inline script to prevent render blocking - see DeferredPostHog component */}
        
        {/* Preload LCP image (hero illustration) for better performance */}
        <link
          rel="preload"
          as="image"
          href="/tezos-baking-illustration-with-people-collaboratin.webp"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className="font-sans antialiased">
        {/* Theme provider enables dark mode support */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          {/* Floating feedback button - visible on all pages */}
          <FeedbackButton />
          {/* PostHog Analytics - loaded after LCP to improve performance */}
          <DeferredPostHog />
        </ThemeProvider>
      </body>
    </html>
  )
}

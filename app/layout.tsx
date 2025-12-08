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
import { FeedbackButton } from "@/components/feedback-button"
import { DeferredPostHog } from "@/components/deferred-posthog"

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
})

/**
 * Application metadata for SEO and social sharing
 */
export const metadata: Metadata = {
  title: {
    default: "Tezos Baking Portal",
    template: "%s | Tezos Baking Portal",
  },
  description: "Your comprehensive resource for Tezos baking - from setup to optimization, governance to rewards. Real-time network statistics, baker guides, and tools.",
  keywords: ["Tezos", "baking", "staking", "delegation", "blockchain", "cryptocurrency", "XTZ", "baker", "validator"],
  authors: [{ name: "Tezos Baking Portal" }],
  creator: "Tezos Community",
  publisher: "Tezos Baking Portal",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL 
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL 
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/`
      : "https://tezos-baking-portal.vercel.app/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Tezos Baking Portal",
    title: "Tezos Baking Portal - Your Complete Baking Resource",
    description: "Your comprehensive resource for Tezos baking - from setup to optimization, governance to rewards.",
    images: [
      {
        url: "/tezos-logo.png",
        width: 1200,
        height: 630,
        alt: "Tezos Baking Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tezos Baking Portal",
    description: "Your comprehensive resource for Tezos baking - from setup to optimization, governance to rewards.",
    images: ["/tezos-logo.png"],
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
      { url: "/tezos-logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/tezos-logo.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/tezos-logo.png",
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
        
        {/* Favicon - Next.js 14 automatically serves app/icon.png */}
        {/* Additional favicon links for better browser compatibility */}
        <link rel="icon" type="image/png" sizes="32x32" href="/tezos-logo.png" />
        <link rel="shortcut icon" href="/tezos-logo.png" />
        <link rel="apple-touch-icon" sizes="32x32" href="/tezos-logo.png" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Tezos Baking Portal",
              description: "Your comprehensive resource for Tezos baking - from setup to optimization, governance to rewards.",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://tezos-baking-portal.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://tezos-baking-portal.vercel.app"}/statistics?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* PostHog Analytics is loaded client-side after LCP via DeferredPostHog component to improve performance */}
        {/* Removed inline script to prevent render blocking - see DeferredPostHog component */}
        
        {/* Preload LCP image for better performance */}
        <link
          rel="preload"
          as="image"
          href="/images/gradient-bg-top-right.webp"
          type="image/webp"
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

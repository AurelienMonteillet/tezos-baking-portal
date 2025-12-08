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

// Configure Outfit font (headings and UI elements)
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

// Configure Roboto font (body text)
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
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
    icon: "/tezos-logo.png",
    apple: "/tezos-logo.png",
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
        {/* PostHog Analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init Rr Mr fi Cr Ar ci Tr Fr capture Mi calculateEventProperties Lr register register_once register_for_session unregister unregister_for_session Hr getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetGroupPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Ur jr createPersonProfile zr kr Br opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Dr debug M Nr getPageViewId captureTraceFeedback captureTraceMetric $r".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('phc_KW5Otx0iKtkOCP465V20tyJylN7zHzq72kEXwbLP8Lv', {
                api_host: 'https://us.i.posthog.com',
                person_profiles: 'identified_only',
              });
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Theme provider enables dark mode support */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
          {/* Floating feedback button - visible on all pages */}
          <FeedbackButton />
        </ThemeProvider>
      </body>
    </html>
  )
}

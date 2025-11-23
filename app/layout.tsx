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
  title: "Tezos Baking Portal",
  description: "Your comprehensive resource for Tezos baking - from setup to optimization, governance to rewards.",
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
      <body className="font-sans antialiased">
        {/* Theme provider enables dark mode support */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

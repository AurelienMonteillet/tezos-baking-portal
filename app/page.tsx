/**
 * Home Page - Tezos Baking Portal
 * 
 * Main landing page providing:
 * - Hero section with introduction to Tezos baking
 * - Real-time network statistics with caching
 * - Information about baking process and benefits
 * - Getting started guide with setup steps
 * - Governance overview
 * - Useful tools and resources
 * - Documentation links
 * 
 * Features intelligent data caching and responsive design
 */

"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { useNetworkStats, useBakersStats, useDataPreloader } from "@/hooks/use-tzkt-data-cached"

// Critical sections - loaded immediately
import {
  Header,
  HeroSection,
  NetworkStatsSection,
  Footer,
  ScrollToTopButton,
} from "@/components/sections"

// Non-critical sections - lazy loaded for better mobile performance
const AboutSection = lazy(() => import("@/components/sections/about-section").then(m => ({ default: m.AboutSection })))
const GetStartedSection = lazy(() => import("@/components/sections/get-started-section").then(m => ({ default: m.GetStartedSection })))
const GovernanceSection = lazy(() => import("@/components/sections/governance-section").then(m => ({ default: m.GovernanceSection })))
const ToolsSection = lazy(() => import("@/components/sections/tools-section").then(m => ({ default: m.ToolsSection })))
const DocumentationSection = lazy(() => import("@/components/sections/documentation-section").then(m => ({ default: m.DocumentationSection })))
const CTASection = lazy(() => import("@/components/sections/cta-section").then(m => ({ default: m.CTASection })))

export default function Home() {
  // Fetch network statistics with caching
  const {
    stats: networkStats,
    cycle,
    loading: networkLoading,
    error: networkError,
    refresh: refreshNetwork,
  } = useNetworkStats()

  // Fetch aggregated baker statistics
  const {
    stats: bakersStats,
    loading: bakersLoading,
    error: bakersError,
    refresh: refreshBakers,
  } = useBakersStats()

  // Preload critical data for better performance
  useDataPreloader()

  // UI state management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle sticky header and scroll-to-top button on scroll
  // Throttled for better mobile performance
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20)
          setShowScrollTop(window.scrollY > 400)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  /**
   * Handle smooth scroll to section
   * Also closes mobile menu if open
   */
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-black-900 relative overflow-hidden">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue-500"
      >
        Skip to main content
      </a>
      <Header
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onSmoothScroll={handleSmoothScroll}
      />

      <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
        <HeroSection />
        <NetworkStatsSection
          bakersStats={bakersStats}
          cycle={cycle}
          networkLoading={networkLoading}
          bakersLoading={bakersLoading}
          networkError={networkError}
          bakersError={bakersError}
          refreshNetwork={refreshNetwork}
          refreshBakers={refreshBakers}
        />
        <Suspense fallback={null}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={null}>
          <GetStartedSection />
        </Suspense>
        <Suspense fallback={null}>
          <GovernanceSection />
        </Suspense>
        <Suspense fallback={null}>
          <ToolsSection />
        </Suspense>
        <Suspense fallback={null}>
          <DocumentationSection />
        </Suspense>
        <Suspense fallback={null}>
          <CTASection />
        </Suspense>
      </main>

      <Footer />
      <ScrollToTopButton show={showScrollTop} onClick={scrollToTop} />
    </div>
  )
}

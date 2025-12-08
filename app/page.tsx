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

import { useState, useEffect } from "react"
import { useNetworkStats, useBakersStats, useDataPreloader } from "@/hooks/use-tzkt-data-cached"

// Section components
import {
  Header,
  HeroSection,
  NetworkStatsSection,
  AboutSection,
  GetStartedSection,
  GovernanceSection,
  ToolsSection,
  DocumentationSection,
  CTASection,
  Footer,
  ScrollToTopButton,
} from "@/components/sections"

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
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
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
        <AboutSection />
        <GetStartedSection />
        <GovernanceSection />
        <ToolsSection />
        <DocumentationSection />
        <CTASection />
      </main>

      <Footer />
      <ScrollToTopButton show={showScrollTop} onClick={scrollToTop} />
    </div>
  )
}

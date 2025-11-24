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
import Link from "next/link"
import type React from "react"
import Image from "next/image"

import { useState, useEffect } from "react"

import {
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Menu,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useNetworkStats, useBakersStats, useDataPreloader } from "@/hooks/use-tzkt-data-cached"
import { formatXTZ } from "@/lib/tzkt-api"

// Content imports
import { headerContent } from "@/content/header"
import { heroContent } from "@/content/hero"
import { networkStatsContent } from "@/content/network-stats"
import { aboutContent } from "@/content/about"
import { getStartedContent } from "@/content/get-started"
import { governanceContent } from "@/content/governance"
import { toolsContent } from "@/content/tools"
import { documentationContent } from "@/content/documentation"
import { ctaContent } from "@/content/cta"
import { footerContent } from "@/content/footer"

export default function Home() {
  // Fetch network statistics with caching
  const {
    stats: networkStats,
    cycle,
    loading: networkLoading,
    error: networkError,
    lastUpdated: networkLastUpdated,
    refresh: refreshNetwork,
  } = useNetworkStats()
  
  // Fetch aggregated baker statistics
  const {
    stats: bakersStats,
    loading: bakersLoading,
    error: bakersError,
    lastUpdated: bakersLastUpdated,
    refresh: refreshBakers,
  } = useBakersStats()
  
  // Preload critical data for better performance
  const { preloaded } = useDataPreloader()
  
  // UI state management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      {/* ========== Sticky Navigation Header ========== */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-black-900/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <img src={headerContent.logo} alt="Tezos" className="h-8 w-auto" />
            <span className="font-heading text-lg font-semibold text-white">{headerContent.title}</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {headerContent.navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>

          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black-900/95 backdrop-blur-md">
            <nav className="container px-4 py-4 flex flex-col gap-4">
              {headerContent.navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white py-2"
                >
                  {link.text}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 pt-16">
        {/* ========== Hero Section - Landing Page Introduction ========== */}
        <section
          id="hero"
          className="relative min-h-[85vh] md:min-h-[700px] lg:min-h-screen flex items-center py-8 overflow-hidden bg-black-900"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src={heroContent.images.background}
              alt=""
              className="absolute top-0 right-0 w-full h-full object-cover object-top-right opacity-70"
              style={{ maxWidth: "100%", transform: "scale(1.2)" }}
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-6">
                <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white-900 break-words">
                  {heroContent.title}
                </h1>
                <p className="max-w-[600px] text-sm sm:text-base md:text-lg text-white-800 leading-relaxed">
                  {heroContent.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={heroContent.primaryButton.href}
                    className="inline-flex h-10 md:h-11 items-center justify-center rounded-full bg-white-900 text-black-900 px-5 sm:px-6 md:px-8 text-sm font-semibold shadow-lg transition-all hover:bg-white-800"
                  >
                    {heroContent.primaryButton.text}
                  </Link>
                  <Link
                    href={heroContent.secondaryButton.href}
                    className="inline-flex h-10 md:h-11 items-center justify-center rounded-full border-2 border-white-700 text-white-900 px-5 sm:px-6 md:px-8 text-sm font-semibold transition-all hover:bg-white-900/10"
                  >
                    {heroContent.secondaryButton.text}
                  </Link>
                </div>
              </div>
              <div className="relative lg:block overflow-hidden">
                <div className="aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 max-h-[300px] md:max-h-[400px] lg:max-h-none">
                  <img
                    src={heroContent.images.illustration}
                    alt="Tezos Baking Portal"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== Network Stats Section - Real-time Blockchain Data ========== */}
        <section id="network-stats" className="relative py-32 overflow-hidden">
          {/* Background gradient */}
          <Image
            src={networkStatsContent.images.background}
            alt=""
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-150"
            aria-hidden="true"
          />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-white-900 text-balance">{networkStatsContent.title}</h2>
              <p className="text-white-800 text-base sm:text-lg leading-relaxed px-4">
                {networkStatsContent.description}
              </p>
              <p className="text-white-600 text-sm">[ Segmented control component ]</p>
            </div>

            <div className="w-full">
              <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                <Card className="bg-black-800 border-black-600 min-w-0">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-white-900 text-lg sm:text-xl break-words">
                          {networkStatsContent.stakingApy.title}
                        </CardTitle>
                        <CardDescription className="text-white-600 mt-1 text-sm sm:text-base">
                          {networkStatsContent.stakingApy.description}
                        </CardDescription>
                      </div>
                      <Button
                        onClick={refreshBakers}
                        size="sm"
                        variant="ghost"
                        className="text-white-600 hover:text-white-900 hover:bg-black-600 flex-shrink-0"
                        disabled={bakersLoading}
                      >
                        <RefreshCw className={`h-4 w-4 ${bakersLoading ? "animate-spin" : ""}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {networkLoading || bakersLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center space-y-3">
                          <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand-blue-600 border-t-transparent mx-auto"></div>
                          <p className="text-sm text-white-600">Loading from cache...</p>
                        </div>
                      </div>
                    ) : networkError || bakersError ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-400">Error</div>
                          <p className="text-sm text-white-600 mt-2">Failed to load data</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex items-center justify-center py-8 bg-black-600/50 rounded-lg">
                          <div className="text-center space-y-4 w-full px-4">
                            <div className="text-5xl font-bold text-brand-blue-600">
                              {bakersStats ? `${bakersStats.averageApy.toFixed(2)}%` : "5.8%"}
                            </div>
                            <p className="text-white-700 text-sm">{networkStatsContent.stakingApy.label}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6">
                    <Button
                      variant="outline"
                      className="w-full sm:flex-1 rounded-full border-white-600 text-white-900 bg-transparent hover:bg-black-600 hover:text-white-900"
                    >
                      {networkStatsContent.stakingApy.buttons.historical.text}
                    </Button>
                    <Link href={networkStatsContent.stakingApy.buttons.bakerStats.href} className="w-full sm:flex-1">
                      <Button className="w-full rounded-full bg-white-900 text-black-900 hover:bg-white-800">
                        {networkStatsContent.stakingApy.buttons.bakerStats.text}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="bg-black-800 border-black-600 min-w-0">
                  <CardHeader className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-white-900 text-lg sm:text-xl break-words">
                          {networkStatsContent.networkPerformance.title}
                        </CardTitle>
                        <CardDescription className="text-white-600 mt-1 text-sm sm:text-base">
                          {networkStatsContent.networkPerformance.description}
                        </CardDescription>
                      </div>
                      <Button
                        onClick={refreshNetwork}
                        size="sm"
                        variant="ghost"
                        className="text-white-600 hover:text-white-900 hover:bg-black-600 flex-shrink-0"
                        disabled={networkLoading}
                      >
                        <RefreshCw className={`h-4 w-4 ${networkLoading ? "animate-spin" : ""}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    {networkLoading || bakersLoading ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-blue-600 border-t-transparent"></div>
                      </div>
                    ) : (
                      <div className="space-y-4 py-4">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-white-600">{networkStatsContent.networkPerformance.labels.activeBakers}</span>
                          <span className="font-semibold text-white-900 text-lg">
                            {bakersStats ? bakersStats.activeBakers : "412"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-white-600">{networkStatsContent.networkPerformance.labels.totalStaked}</span>
                          <span className="font-semibold text-white-900 text-lg">
                            {bakersStats ? `${formatXTZ(bakersStats.totalStaking)}` : "486.2M"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-white-600">{networkStatsContent.networkPerformance.labels.currentCycle}</span>
                          <span className="font-semibold text-white-900 text-lg">{cycle ? cycle.index : "620"}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-white-600">{networkStatsContent.networkPerformance.labels.blockTime}</span>
                          <span className="font-semibold text-white-900 text-lg">30 seconds</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 sm:p-6">
                    <Link
                      href={networkStatsContent.networkPerformance.link.href}
                      className="text-sm text-white-900 underline underline-offset-4 flex items-center hover:text-white-800 transition-colors"
                    >
                      {networkStatsContent.networkPerformance.link.text}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ========== What is Baking Section - Educational Content ========== */}
        <section id="about" className="relative py-16 md:py-32 overflow-hidden">
          {/* Background gradient */}
          <Image
            src={aboutContent.images.background}
            alt=""
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-150"
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white-900 text-balance">
                {aboutContent.title}
              </h2>
              <p className="text-white-800 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-4">
                {aboutContent.description}
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl items-center gap-6 md:gap-8 lg:gap-12 lg:grid-cols-2">
              <div className="flex flex-col space-y-4 md:space-y-6">
                <div className="space-y-3 md:space-y-4">
                  {aboutContent.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 md:gap-3">
                      <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-brand-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-white-900 mb-1 md:mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm md:text-base text-white-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative order-first lg:order-last">
                <img
                  src={aboutContent.images.illustration}
                  alt="Baking Visualization"
                  className="w-full h-auto rounded-xl md:rounded-2xl"
                />
              </div>
            </div>

            <div className="flex justify-center mt-8 md:mt-12 px-4">
              <Link
                href={aboutContent.button.href}
                className="inline-flex items-center justify-center rounded-full bg-white-900 text-black-900 px-6 md:px-8 py-2.5 md:py-3 text-sm font-semibold shadow-lg hover:bg-white-800 transition-all w-full sm:w-auto"
              >
                {aboutContent.button.text}
              </Link>
            </div>
          </div>
        </section>

        {/* ========== Get Started Section - Setup Guide ========== */}
        <section
          id="get-started"
          className="relative min-h-screen flex items-center py-12 md:py-16 lg:py-20 overflow-hidden bg-black-900"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src={getStartedContent.images.background}
              alt=""
              className="absolute bottom-0 right-0 w-full h-full object-cover object-bottom-right opacity-70"
              style={{ maxWidth: "100%", transform: "scale(1.2)" }}
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <div className="flex flex-col items-center space-y-3 md:space-y-4 text-center mb-8 md:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white-900 text-balance px-4">
                {getStartedContent.title}
              </h2>
              <p className="max-w-[900px] text-white-800 text-sm sm:text-base md:text-lg leading-relaxed px-4">
                {getStartedContent.description}
              </p>
            </div>

            <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {getStartedContent.cards.map((card, index) => (
                <Card key={index} className="bg-gradient-to-b from-[#111] to-[#181818] border border-white-50/10 shadow-xl flex flex-col hover:border-brand-blue-600/30 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-brand-blue-600/10 flex items-center justify-center mb-4">
                      <card.icon className="h-6 w-6 text-brand-blue-600" />
                    </div>
                    <CardTitle className="text-white-900 text-xl">{card.title}</CardTitle>
                    <CardDescription className="text-white-600">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {card.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white-700">
                          <ChevronRight className="h-4 w-4 text-brand-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={card.href}
                      className="text-sm font-medium text-brand-blue-400 flex items-center hover:text-brand-blue-300 transition-colors"
                    >
                      {card.linkText} <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8 md:mt-12 px-4">
              <Link
                href={getStartedContent.documentationButton.href}
                className="inline-flex items-center justify-center rounded-full bg-brand-blue-600 text-white-900 px-6 md:px-8 py-2.5 md:py-3 text-sm font-semibold shadow-lg hover:bg-brand-blue-500 transition-all w-full sm:w-auto max-w-sm sm:max-w-none"
              >
                {getStartedContent.documentationButton.text} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========== Governance Section - On-chain Voting ========== */}
        <section id="governance" className="relative py-16 md:py-32 overflow-hidden">
          {/* Background gradient */}
          <Image
            src={governanceContent.images.background}
            alt=""
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-150"
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-white-900 text-balance">
                {governanceContent.title}
              </h2>
              <p className="text-white-800 text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-4">
                {governanceContent.description}
              </p>
            </div>

            <div className="mx-auto grid max-w-6xl items-center gap-6 md:gap-8 lg:gap-12 lg:grid-cols-2">
              <div className="relative aspect-video bg-black-800 rounded-xl md:rounded-2xl overflow-hidden border border-black-600">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={governanceContent.images.illustration} 
                    alt="Tezos Governance" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-4 md:space-y-6">
                <div className="space-y-3 md:space-y-4">
                  {governanceContent.steps.map((step, index) => (
                    <div key={index} className="flex gap-2 md:gap-3">
                      <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-brand-blue-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-white-900 mb-1 md:mb-2">{step.title}</h3>
                        <p className="text-sm md:text-base text-white-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mt-8 md:mt-12 px-4">
              <Link
                href={governanceContent.buttons.primary.href}
                className="inline-flex items-center justify-center rounded-full bg-white-900 text-black-900 px-6 md:px-8 py-2.5 md:py-3 text-sm font-semibold shadow-lg hover:bg-white-800 transition-all w-full sm:w-auto"
              >
                {governanceContent.buttons.primary.text}
              </Link>
              <Link
                href={governanceContent.buttons.secondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border-2 border-white-700 text-white-900 px-6 md:px-8 py-2.5 md:py-3 text-sm font-semibold hover:bg-white-900/10 transition-all w-full sm:w-auto"
              >
                {governanceContent.buttons.secondary.text} <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========== Useful Tools Section - External Resources ========== */}
        <section id="tools" className="relative min-h-screen flex items-center py-8 overflow-hidden bg-black-900">
          <Image
            src={toolsContent.images.background}
            alt=""
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-150"
            aria-hidden="true"
          />

          <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center mb-8 sm:mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white-900 text-balance">{toolsContent.title}</h2>
              <p className="max-w-[900px] text-white-800 text-base sm:text-lg leading-relaxed px-4">
                {toolsContent.description}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {toolsContent.cards.map((card, index) => (
                <Card key={index} className="bg-black-800 border-black-600 hover:border-brand-blue-600/50 transition-colors">
                  <CardHeader>
                    <div className="p-3 w-12 h-12 rounded-lg bg-brand-blue-600/10 flex items-center justify-center mb-4">
                      <card.icon className="h-6 w-6 text-brand-blue-600" />
                    </div>
                    <CardTitle className="text-white-900">{card.title}</CardTitle>
                    <CardDescription className="text-white-600">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Link
                      href={card.href}
                      target="_blank"
                      className="text-sm font-medium text-white-900 flex items-center hover:text-brand-blue-400 transition-colors"
                    >
                      {card.linkText} <ExternalLink className="h-4 w-4 ml-1" />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ========== Documentation Section - Learning Resources ========== */}
        <section
          id="docs"
          className="relative min-h-screen flex items-center py-16 sm:py-24 overflow-hidden bg-black-900"
        >
          <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center mb-8 sm:mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white-900 text-balance">{documentationContent.title}</h2>
              <p className="max-w-[900px] text-white-800 text-base sm:text-lg leading-relaxed px-4">
                {documentationContent.description}
              </p>
            </div>

            <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
              {documentationContent.sections.map((section, index) => (
                <div key={index} className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-[#111] to-[#181818] shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white-900 mb-2">{section.title}</h3>
                    <p className="text-sm sm:text-base text-white-700">{section.description}</p>
                  </div>

                  <div className="flex flex-col gap-4 sm:gap-6">
                    {section.items.map((item, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        target="_blank"
                        className="flex flex-col items-start gap-4 p-4 sm:p-6 rounded-xl border border-white/5 bg-[#111] hover:border-brand-blue-600/30 transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                      >
                        <div className="flex items-start justify-between gap-4 w-full">
                          <div className="flex-1">
                            <h4 className="font-semibold text-white-900 text-base sm:text-lg mb-2 group-hover:text-brand-blue-400 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-white-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                          <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-white-600 group-hover:text-brand-blue-400 transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA Section - Call to Action ========== */}
        <section className="relative min-h-[50vh] flex items-center overflow-hidden mb-16 sm:mb-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full">
            <div
              className="relative rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden w-full"
              style={{ background: "linear-gradient(309.94deg, #6C235E 16.9%, #5C72FA 93.93%)" }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src={ctaContent.images.overlay}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-30 sm:opacity-50"
                  aria-hidden="true"
                />
              </div>

              <div className="relative z-10 max-w-2xl">
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
                  {ctaContent.title}
                </h2>
                <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
                  {ctaContent.description}
                </p>
                <Link
                  href={ctaContent.button.href}
                  className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full bg-[#E0E0FF] text-black-900 px-6 sm:px-8 text-sm sm:text-base font-semibold shadow-xl transition-all hover:bg-white hover:scale-105"
                >
                  {ctaContent.button.text}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========== Footer ========== */}
      <footer className="w-full border-t border-white/10 py-6 md:py-8 bg-black-900">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 sm:px-6 py-6 md:h-24 md:flex-row md:gap-2">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
            <img src={footerContent.images.logo} alt="Tezos" className="h-6 w-6" />
            <p className="text-center text-sm leading-loose md:text-left text-white-600">
              {footerContent.text}
            </p>
          </div>
          <p className="text-center text-sm text-white-600 md:text-right">{footerContent.copyright}</p>
        </div>
      </footer>
    </div>
  )
}

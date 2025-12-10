/**
 * Network Stats Section Component
 * 
 * Displays real-time network statistics with caching
 * Shows staking APY, delegation APY, and network performance metrics
 */

"use client"

import Link from "next/link"
import Image from "next/image"
import { RefreshCw, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { networkStatsContent } from "@/content/network-stats"
import { formatXTZ } from "@/lib/tzkt-api"
import type { Cycle } from "@/lib/tzkt-api"

interface NetworkStatsSectionProps {
  bakersStats: {
    stakingApy: number
    delegationApy: number
    activeBakers: number
    totalStaking: number
  } | null
  cycle: Cycle | null
  networkLoading: boolean
  bakersLoading: boolean
  networkError: string | null
  bakersError: string | null
  refreshNetwork: () => void
  refreshBakers: () => void
}

export function NetworkStatsSection({
  bakersStats,
  cycle,
  networkLoading,
  bakersLoading,
  networkError,
  bakersError,
  refreshNetwork,
  refreshBakers,
}: NetworkStatsSectionProps) {
  return (
    <section id="network-stats" className="relative py-32 overflow-hidden">
      <Image
        src={networkStatsContent.images.background}
        alt=""
        fill
        priority
        quality={80}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none scale-150"
        sizes="100vw"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 text-white-900 text-balance">{networkStatsContent.title}</h2>
          <p className="text-white-900 text-base sm:text-lg leading-relaxed px-4">
            {networkStatsContent.description}
          </p>
        </div>

        <div className="w-full">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 items-stretch">
            <Card className="bg-black-800 border-black-600 min-w-0 flex flex-col">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-white-900 text-lg sm:text-xl break-words">
                      {networkStatsContent.stakingApy.title}
                    </CardTitle>
                    <CardDescription className="text-white-700 mt-1 text-sm sm:text-base">
                      {networkStatsContent.stakingApy.description}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={refreshBakers}
                    size="sm"
                    variant="ghost"
                    className="text-white-700 hover:text-white-900 hover:bg-black-600 flex-shrink-0"
                    disabled={bakersLoading}
                    aria-label="Refresh bakers statistics"
                  >
                    <RefreshCw className={`h-4 w-4 ${bakersLoading ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 flex-1">
                {networkLoading || bakersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center space-y-3">
                      <div className="animate-spin rounded-full h-10 w-10 border-2 border-brand-blue-600 border-t-transparent mx-auto"></div>
                      <p className="text-sm text-white-700">Loading from cache...</p>
                    </div>
                  </div>
                ) : networkError || bakersError ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400">Error</div>
                      <p className="text-sm text-white-700 mt-2">Failed to load data</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
                      <div className="flex items-center justify-center py-6 bg-brand-blue-600/10 rounded-lg border border-brand-blue-600/20">
                        <div className="text-center space-y-2 w-full px-4">
                          <div className="text-4xl sm:text-5xl font-bold text-brand-blue-600">
                            {bakersStats ? `${bakersStats.stakingApy.toFixed(2)}%` : "9.73%"}
                          </div>
                          <p className="text-white-700 text-xs sm:text-sm font-medium">Staking APY</p>
                          <p className="text-white-700 text-xs">For active bakers</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center py-6 bg-brand-blue-600/10 rounded-lg border border-brand-blue-600/20">
                        <div className="text-center space-y-2 w-full px-4">
                          <div className="text-4xl sm:text-5xl font-bold text-brand-blue-600">
                            {bakersStats ? `${bakersStats.delegationApy.toFixed(2)}%` : "3.24%"}
                          </div>
                          <p className="text-white-700 text-xs sm:text-sm font-medium">Delegation APY</p>
                          <p className="text-white-700 text-xs">For delegators</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-white-800 text-[10px] sm:text-xs font-light">
                        APY data provided by{" "}
                        <a
                          href={networkStatsContent.stakingApy.dataSource.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-blue-400 hover:text-brand-blue-300 transition-colors underline-offset-4 hover:underline"
                          aria-label={`Visit ${networkStatsContent.stakingApy.dataSource.text} for APY data`}
                        >
                          {networkStatsContent.stakingApy.dataSource.text}
                        </a>
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6">
                <Link href={networkStatsContent.stakingApy.buttons.historical.href} className="w-full sm:flex-1" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-white-600 text-white-900 bg-transparent hover:bg-black-600 hover:text-white-900 cursor-pointer"
                    aria-label={networkStatsContent.stakingApy.buttons.historical.text}
                  >
                    {networkStatsContent.stakingApy.buttons.historical.text}
                  </Button>
                </Link>
                <Link href={networkStatsContent.stakingApy.buttons.bakerStats.href} className="w-full sm:flex-1" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-full bg-white-900 text-black-900 hover:bg-white-800 cursor-pointer" aria-label={networkStatsContent.stakingApy.buttons.bakerStats.text}>
                    {networkStatsContent.stakingApy.buttons.bakerStats.text}
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="bg-black-800 border-black-600 min-w-0 flex flex-col">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-white-900 text-lg sm:text-xl break-words">
                      {networkStatsContent.networkPerformance.title}
                    </CardTitle>
                    <CardDescription className="text-white-700 mt-1 text-sm sm:text-base">
                      {networkStatsContent.networkPerformance.description}
                    </CardDescription>
                  </div>
                  <Button
                    onClick={refreshNetwork}
                    size="sm"
                    variant="ghost"
                    className="text-white-700 hover:text-white-900 hover:bg-black-600 flex-shrink-0"
                    disabled={networkLoading}
                    aria-label="Refresh network statistics"
                  >
                    <RefreshCw className={`h-4 w-4 ${networkLoading ? "animate-spin" : ""}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 flex-1">
                {networkLoading || bakersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-brand-blue-600 border-t-transparent"></div>
                  </div>
                ) : (
                  <div className="space-y-4 py-4">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white-700">{networkStatsContent.networkPerformance.labels.activeBakers}</span>
                      <span className="font-semibold text-white-900 text-lg">
                        {bakersStats ? bakersStats.activeBakers : "412"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white-700">{networkStatsContent.networkPerformance.labels.totalStaked}</span>
                      <span className="font-semibold text-white-900 text-lg">
                        {bakersStats ? `${formatXTZ(bakersStats.totalStaking)}` : "486.2M"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white-700">{networkStatsContent.networkPerformance.labels.currentCycle}</span>
                      <span className="font-semibold text-white-900 text-lg">{cycle ? cycle.index : "620"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-white-700">{networkStatsContent.networkPerformance.labels.blockTime}</span>
                      <span className="font-semibold text-white-900 text-lg">8 seconds</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 p-4 sm:p-6">
                    <Link href={networkStatsContent.networkPerformance.link.href} className="w-full sm:flex-1" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full rounded-full bg-white-900 text-black-900 hover:bg-white-800 text-sm cursor-pointer" aria-label={networkStatsContent.networkPerformance.link.text}>
                        {networkStatsContent.networkPerformance.link.text}
                      </Button>
                    </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}


"use client"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronRight,
  Code,
  Cpu,
  ExternalLink,
  Globe,
  LineChart,
  Lock,
  RefreshCw,
  Server,
  Terminal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useNetworkStats, useBakersStats, useDataPreloader } from "@/hooks/use-tzkt-data-cached"
import { formatXTZ, formatPercentage } from "@/lib/tzkt-api"

export default function Home() {
  const {
    stats: networkStats,
    cycle,
    loading: networkLoading,
    error: networkError,
    lastUpdated: networkLastUpdated,
    refresh: refreshNetwork,
  } = useNetworkStats()
  const {
    stats: bakersStats,
    loading: bakersLoading,
    error: bakersError,
    lastUpdated: bakersLastUpdated,
    refresh: refreshBakers,
  } = useBakersStats()
  const { preloaded } = useDataPreloader()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/images/tezos/tezos-icon.png" alt="Tezos Logo" width={32} height={32} />
              <span className="inline-block font-bold">Tezos Baking Portal</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="#network-stats"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Network Stats
              </Link>
              <Link
                href="#tools"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Tools
              </Link>
              <Link
                href="#get-started"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Get Started
              </Link>
              <Link
                href="/statistics"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Baker Stats
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              {preloaded && (
                <Badge variant="secondary" className="mr-2 text-xs">
                  Data Preloaded
                </Badge>
              )}
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Connect Wallet
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* 1. Hero Section - BLEU */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-[#0D47A1] via-[#1565C0] to-[#1976D2] text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Tezos Baking Portal
                  </h1>
                  <p className="max-w-[600px] text-white/80 md:text-xl">
                    Your comprehensive resource for Tezos baking - from setup to optimization, governance to rewards.
                    Now with intelligent caching for optimal performance.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#get-started"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-white text-blue-900 px-8 text-sm font-medium shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/statistics"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-white/20 bg-white/10 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    View Baker Stats
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last">
                <Image
                  src="/images/tezos/tezos-baking-illustration.png"
                  width={550}
                  height={550}
                  alt="Tezos Baking"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Network Stats - NOIR */}
        <section
          id="network-stats"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/20 text-blue-200 px-3 py-1 text-sm border border-blue-400/30">
                  Network Statistics
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Tezos Network & Baking Stats
                </h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Current statistics and performance metrics for the Tezos network and baking operations.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Tabs defaultValue="rewards" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-600">
                  <TabsTrigger
                    value="rewards"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Current Rewards
                  </TabsTrigger>
                  <TabsTrigger value="dal" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    DAL Participation
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="rewards" className="p-4 border border-slate-600 rounded-md mt-4 bg-slate-800/30">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="bg-slate-800/50 border-slate-600 text-white">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-white">Current Staking APY</CardTitle>
                            <CardDescription className="text-slate-300">
                              Estimated annual percentage yield for staking XTZ
                            </CardDescription>
                          </div>
                          <Button
                            onClick={refreshBakers}
                            size="sm"
                            variant="ghost"
                            className="text-slate-400 hover:text-white"
                            disabled={bakersLoading}
                          >
                            <RefreshCw className={`h-4 w-4 ${bakersLoading ? "animate-spin" : ""}`} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {networkLoading || bakersLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="text-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                              <p className="text-sm text-slate-400 mt-2">Loading from cache...</p>
                            </div>
                          </div>
                        ) : networkError || bakersError ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-red-400">Error</div>
                              <p className="text-sm text-slate-400 mt-2">Failed to load data</p>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-center py-8">
                              <div className="text-center">
                                <div className="text-5xl font-bold text-blue-400">
                                  {bakersStats ? formatPercentage(bakersStats.averageApy) : "5.8%"}
                                </div>
                                <p className="text-sm text-slate-400 mt-2">Network Average</p>
                                {bakersLastUpdated && (
                                  <Badge variant="secondary" className="mt-2 text-xs">
                                    Updated {bakersLastUpdated.toLocaleTimeString()}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                              <div>
                                <div className="text-2xl font-bold text-white">4.2%</div>
                                <p className="text-xs text-slate-400">Minimum</p>
                              </div>
                              <div>
                                <div className="text-2xl font-bold text-white">6.5%</div>
                                <p className="text-xs text-slate-400">Maximum</p>
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        >
                          Historical Data
                        </Button>
                        <Link href="/statistics">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            View Baker Stats
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-600 text-white">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-white">Network Performance</CardTitle>
                            <CardDescription className="text-slate-300">
                              Key metrics for Tezos network performance
                            </CardDescription>
                          </div>
                          <Button
                            onClick={refreshNetwork}
                            size="sm"
                            variant="ghost"
                            className="text-slate-400 hover:text-white"
                            disabled={networkLoading}
                          >
                            <RefreshCw className={`h-4 w-4 ${networkLoading ? "animate-spin" : ""}`} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {networkLoading || bakersLoading ? (
                          <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-300">Active Bakers</span>
                              <span className="font-medium text-white">
                                {bakersStats ? bakersStats.activeBakers : "412"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-300">Total Staked XTZ</span>
                              <span className="font-medium text-white">
                                {bakersStats ? `${formatXTZ(bakersStats.totalStaking)}` : "486.2M"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-300">Current Cycle</span>
                              <span className="font-medium text-white">{cycle ? cycle.index : "620"}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-300">Block Time</span>
                              <span className="font-medium text-white">30 seconds</span>
                            </div>
                            {networkLastUpdated && (
                              <div className="pt-2 border-t border-slate-600">
                                <Badge variant="secondary" className="text-xs">
                                  Last updated: {networkLastUpdated.toLocaleTimeString()}
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Link
                          href="/statistics"
                          className="text-sm text-blue-400 flex items-center hover:text-blue-300"
                        >
                          View detailed analytics
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="dal" className="p-4 border border-slate-600 rounded-md mt-4 bg-slate-800/30">
                  <Card className="bg-slate-800/50 border-slate-600">
                    <CardHeader>
                      <CardTitle className="text-white">DAL Participation</CardTitle>
                      <CardDescription className="text-slate-300">
                        Data Availability Layer metrics and participation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                            <div className="text-2xl font-bold text-blue-400">78%</div>
                            <p className="text-xs text-slate-400">Network Participation</p>
                          </div>
                          <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                            <div className="text-2xl font-bold text-blue-400">256</div>
                            <p className="text-xs text-slate-400">Active DAL Nodes</p>
                          </div>
                          <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                            <div className="text-2xl font-bold text-blue-400">+12%</div>
                            <p className="text-xs text-slate-400">Reward Boost</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-white">DAL-o-meter Dashboard</h4>
                          <div className="bg-slate-700/50 aspect-video rounded-lg flex items-center justify-center border border-slate-600">
                            <div className="text-center">
                              <BarChart3 className="h-12 w-12 mx-auto text-blue-400" />
                              <p className="text-sm mt-2 text-slate-300">DAL-o-meter visualization would appear here</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        View History
                      </Button>
                      <Link
                        href="#get-started"
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        Setup DAL Node
                      </Link>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Autres sections restent identiques... */}
        {/* 3. What is Baking - BLEU */}
        <section
          id="what-is-baking"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white/20 text-white px-3 py-1 text-sm border border-white/30">
                  Understanding Baking
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">What is Baking?</h2>
                <p className="max-w-[900px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Baking is the process of validating transactions and adding new blocks to the Tezos blockchain. Bakers
                  are rewarded with newly minted XTZ for their contribution to the network.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-white">Consensus Mechanism</h3>
                      <p className="text-blue-100">
                        Tezos uses Liquid Proof-of-Stake (LPoS) where token holders can delegate their staking rights to
                        bakers without transferring ownership.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-white">Rewards</h3>
                      <p className="text-blue-100">
                        Bakers earn rewards for creating and endorsing blocks, which are distributed to delegators after
                        taking a fee.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-white">Requirements</h3>
                      <p className="text-blue-100">
                        To become a baker, you need at least 6,000 XTZ (1 roll) and a reliable server setup with proper
                        security measures.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                src="/images/tezos/tezos-baking-illustration.png"
                width={550}
                height={310}
                alt="Baking Process"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
            <div className="flex justify-center">
              <Link
                href="#get-started"
                className="inline-flex items-center justify-center rounded-md bg-white text-blue-900 px-6 py-2 text-sm font-medium shadow hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Learn How to Setup a Baker
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Sections suivantes identiques... */}
        {/* Pour la brièveté, je garde les sections existantes */}
        {/* 4. Tools - NOIR */}
        <section
          id="tools"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/20 text-blue-200 px-3 py-1 text-sm border border-blue-400/30">
                  Baking Tools
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Baking Cost Calculator</h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Estimate your costs and potential returns from baking on the Tezos network.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-white text-2xl">Baking Costs Calculator</CardTitle>
                  <CardDescription className="text-slate-300">
                    Estimate your costs and potential returns from baking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-white">XTZ Amount (Rolls)</label>
                        <div className="flex items-center gap-3 mt-2">
                          <input
                            type="range"
                            min="1"
                            max="100"
                            defaultValue="10"
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                          />
                          <span className="text-sm font-medium text-white bg-blue-600 px-3 py-1 rounded-full min-w-[3rem] text-center">
                            10
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">60,000 XTZ</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Server Costs (USD/month)</label>
                        <input
                          type="number"
                          defaultValue="50"
                          className="w-full mt-1 p-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Power Costs (USD/month)</label>
                        <input
                          type="number"
                          defaultValue="30"
                          className="w-full mt-1 p-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Fee Rate (%)</label>
                        <input
                          type="number"
                          defaultValue="10"
                          className="w-full mt-1 p-3 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-blue-400/30 backdrop-blur-sm">
                      <h4 className="font-medium mb-6 text-white text-lg">Estimated Results</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-sm text-slate-300">Monthly Rewards</span>
                          <span className="font-medium text-white text-lg">290 XTZ</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-sm text-slate-300">Annual Rewards</span>
                          <span className="font-medium text-white text-lg">3,480 XTZ</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-sm text-slate-300">Monthly Costs</span>
                          <span className="font-medium text-white text-lg">$80.00</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <span className="text-sm text-slate-300">Annual Costs</span>
                          <span className="font-medium text-white text-lg">$960.00</span>
                        </div>
                        <div className="border-t border-white/20 pt-4 mt-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-white">Net Annual Return</span>
                            <span className="font-bold text-green-400 text-xl">$2,520.00</span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm text-slate-300">ROI</span>
                            <span className="font-medium text-green-400 text-lg">4.2%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 text-lg shadow-lg">
                    Download Detailed Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* 5. Governance - BLEU */}
        <section
          id="governance"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white/20 text-white px-3 py-1 text-sm border border-white/30">
                  Governance
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Governance Overview</h2>
                <p className="max-w-[900px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tezos has an on-chain governance mechanism that allows the protocol to upgrade itself through a formal
                  proposal process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/images/tezos/tezos-governance-illustration.png"
                width={550}
                height={310}
                alt="Governance Process"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-white">Proposal Period</h3>
                      <p className="text-blue-100">
                        Bakers can submit and upvote protocol upgrade proposals during this period.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-white">Exploration & Testing</h3>
                      <p className="text-blue-100">
                        The winning proposal moves to an exploration vote followed by a testing period on a test
                        network.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold text-white">Promotion & Adoption</h3>
                      <p className="text-blue-100">
                        After successful testing, a promotion vote determines if the proposal is adopted into the
                        protocol.
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="flex items-center gap-4 pt-4">
                  <Link
                    href="https://tezos.com/governance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-blue-200 hover:text-white"
                  >
                    Learn more about governance
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                  <Link
                    href="https://agora.tezos.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-blue-200 hover:text-white"
                  >
                    Visit Agora
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Get Started - NOIR */}
        <section
          id="get-started"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/20 text-blue-200 px-3 py-1 text-sm border border-blue-400/30">
                  Getting Started
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">How to Get Started</h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to set up and run your own Tezos baker.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-slate-800/50 border-slate-600">
                <CardHeader>
                  <Server className="h-10 w-10 mb-2 text-blue-400" />
                  <CardTitle className="text-white">Hardware Setup</CardTitle>
                  <CardDescription className="text-slate-300">
                    Recommended specifications and configurations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Minimum 8GB RAM, 4 CPU cores</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">100GB+ SSD storage</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Stable internet connection (10+ Mbps)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Uninterruptible power supply</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-sm text-blue-400 flex items-center hover:text-blue-300">
                    View hardware guide
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-slate-800/50 border-slate-600">
                <CardHeader>
                  <Terminal className="h-10 w-10 mb-2 text-blue-400" />
                  <CardTitle className="text-white">Software Installation</CardTitle>
                  <CardDescription className="text-slate-300">Step-by-step installation process</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Install Octez software suite</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Configure node and baker</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Set up DAL node (optional)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Deploy monitoring tools</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-sm text-blue-400 flex items-center hover:text-blue-300">
                    View installation guide
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-slate-800/50 border-slate-600">
                <CardHeader>
                  <Lock className="h-10 w-10 mb-2 text-blue-400" />
                  <CardTitle className="text-white">Key Management</CardTitle>
                  <CardDescription className="text-slate-300">
                    Secure your baker with proper key management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Generate consensus & companion keys</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Hardware security modules (HSM)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Cloud HSM/KMS with Signatory</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Unikey signer setup</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-sm text-blue-400 flex items-center hover:text-blue-300">
                    View key management guide
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-slate-800/50 border-slate-600">
                <CardHeader>
                  <Cpu className="h-10 w-10 mb-2 text-blue-400" />
                  <CardTitle className="text-white">Deployment Options</CardTitle>
                  <CardDescription className="text-slate-300">Different ways to deploy your baker</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Bare metal installation</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Docker / Docker Compose</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Automated deployments (Pulumi)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Cloud provider options</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-sm text-blue-400 flex items-center hover:text-blue-300">
                    View deployment options
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-slate-800/50 border-slate-600">
                <CardHeader>
                  <LineChart className="h-10 w-10 mb-2 text-blue-400" />
                  <CardTitle className="text-white">Monitoring</CardTitle>
                  <CardDescription className="text-slate-300">Keep track of your baker's performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Garfazos monitoring setup</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Prometheus & Grafana dashboards</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Alert configuration</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Performance optimization</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-sm text-blue-400 flex items-center hover:text-blue-300">
                    View monitoring guide
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="bg-slate-800/50 border-slate-600">
                <CardHeader>
                  <Globe className="h-10 w-10 mb-2 text-blue-400" />
                  <CardTitle className="text-white">Testnets</CardTitle>
                  <CardDescription className="text-slate-300">Practice on testnets before mainnet</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Ghostnet setup</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Obtaining testnet tez</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Testing protocol upgrades</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-blue-400" />
                      <span className="text-slate-300">Participating in testnet voting</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="#" className="text-sm text-blue-400 flex items-center hover:text-blue-300">
                    View testnet guide
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div className="flex justify-center mt-8">
              <Link
                href="#documentation"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Explore Full Documentation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 7. Documentation - BLEU */}
        <section
          id="documentation"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white/20 text-white px-3 py-1 text-sm border border-white/30">
                  Documentation
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Documentation & Tutorials
                </h2>
                <p className="max-w-[900px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive guides and tutorials to help you become a successful baker.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <BookOpen className="h-10 w-10 mb-2 text-blue-200" />
                  <CardTitle className="text-white">Official Documentation</CardTitle>
                  <CardDescription className="text-blue-100">Comprehensive guides from the Tezos team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Baking Documentation</h4>
                    <p className="text-sm text-blue-100">
                      Official documentation covering all aspects of baking on Tezos.
                    </p>
                    <Link href="#" className="text-sm text-blue-200 flex items-center hover:text-white">
                      View Documentation
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Protocol Documentation</h4>
                    <p className="text-sm text-blue-100">
                      Technical details about the current and upcoming Tezos protocols.
                    </p>
                    <Link href="#" className="text-sm text-blue-200 flex items-center hover:text-white">
                      View Documentation
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">DAL Documentation</h4>
                    <p className="text-sm text-blue-100">
                      Learn about the Data Availability Layer and how to participate.
                    </p>
                    <Link href="#" className="text-sm text-blue-200 flex items-center hover:text-white">
                      View Documentation
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <Code className="h-10 w-10 mb-2 text-blue-200" />
                  <CardTitle className="text-white">Tutorials & Guides</CardTitle>
                  <CardDescription className="text-blue-100">Step-by-step tutorials for bakers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Baker Deployment Tutorial</h4>
                    <p className="text-sm text-blue-100">Complete guide to deploying a baker from scratch.</p>
                    <Link href="#" className="text-sm text-blue-200 flex items-center hover:text-white">
                      View Tutorial
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Key Management Guide</h4>
                    <p className="text-sm text-blue-100">Best practices for securing your baker's keys.</p>
                    <Link href="#" className="text-sm text-blue-200 flex items-center hover:text-white">
                      View Guide
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Open Tezos Tutorials</h4>
                    <p className="text-sm text-blue-100">Comprehensive learning resources from Open Tezos.</p>
                    <Link href="#" className="text-sm text-blue-200 flex items-center hover:text-white">
                      View Tutorials
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mt-12">
              <h3 className="text-2xl font-bold text-white">Community Resources</h3>
              <p className="max-w-[600px] text-blue-100">Connect with other bakers and get help from the community.</p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-white/20 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Discord
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-white/20 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Agora Forum
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-white/20 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Telegram
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-white/20 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Stack Exchange
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CTA Final - NOIR */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Ready to Start Baking?
                </h2>
                <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join the Tezos baking community and help secure the network while earning rewards.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="#get-started"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 text-white px-8 text-sm font-medium shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Get Started
                </Link>
                <Link
                  href="/statistics"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-slate-600 bg-slate-800/50 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-slate-700 text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  View Baker Stats
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Panel de debug du cache (uniquement en développement) */}
      {/* <CacheDebugPanel /> */}

      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Image src="/images/tezos/tezos-icon.png" alt="Tezos Logo" width={24} height={24} />
            <p className="text-center text-sm leading-loose md:text-left">
              &copy; {new Date().getFullYear()} Tezos Baking Portal. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium underline underline-offset-4">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm font-medium underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium underline underline-offset-4">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

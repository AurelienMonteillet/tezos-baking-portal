/**
 * Baker Statistics Page
 * 
 * Dedicated page for viewing detailed statistics about individual bakers.
 * 
 * Features:
 * - Search by baker address
 * - Real-time baker data fetching with caching
 * - Comprehensive baker overview (balance, fee, APY, delegators)
 * - Staking capacity and efficiency visualization
 * - Performance metrics (blocks, endorsements)
 * - Recent reward history
 * - Frozen balances breakdown
 * - Governance activity tracking
 * - Demo address for quick testing
 * 
 * Data is intelligently cached for optimal performance
 */

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, BarChart3, LineChart, PieChart, Search, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useBakerDetails } from "@/hooks/use-tzkt-data-cached"
import { formatXTZ, formatPercentage, formatAddress } from "@/lib/tzkt-api"

export default function StatisticsPage() {
  // UI state for address input
  const [address, setAddress] = useState("")
  const [searchedAddress, setSearchedAddress] = useState<string | null>(null)
  
  // Fetch baker data using custom hook with caching
  const { baker, rewards, loading, error, lastUpdated, refresh } = useBakerDetails(searchedAddress)

  /**
   * Handle search form submission
   * Triggers data fetch for the entered baker address
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (address.trim()) {
      setSearchedAddress(address.trim())
    }
  }

  /**
   * Load a demo baker address for testing
   * Uses a well-known active baker on Tezos mainnet
   */
  const handleUseMyAddress = () => {
    const demoAddress = "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb"
    setAddress(demoAddress)
    setSearchedAddress(demoAddress)
  }

  /**
   * Reset search state and clear displayed data
   */
  const handleReset = () => {
    setAddress("")
    setSearchedAddress(null)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* ========== Header with Navigation ========== */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/tezos-logo.png" alt="Tezos Logo" width={32} height={32} />
              <span className="inline-block font-bold">Tezos Baking Portal</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link
                href="/#network-stats"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Network Stats
              </Link>
              <Link
                href="/#tools"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Tools
              </Link>
              <Link
                href="/#get-started"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Get Started
              </Link>
              <Link href="/statistics" className="flex items-center text-sm font-medium text-primary transition-colors">
                Baker Stats
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Connect Wallet
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* ========== Hero Section with Search ========== */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-[#0D47A1] via-[#1565C0] to-[#1976D2] text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Baker Statistics</h1>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  View detailed statistics and performance metrics for any Tezos baker using real-time data from TzKT
                </p>
              </div>
              <div className="w-full max-w-md">
                <form onSubmit={handleSearch} className="flex flex-col gap-4 mt-6">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Enter baker address (tz1...)"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
                    />
                    <Button type="submit" className="bg-white text-blue-900 hover:bg-white/90" disabled={loading}>
                      {loading ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4 mr-2" />
                      )}
                      Search
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUseMyAddress}
                      className="border-white/20 text-white hover:bg-white/10 flex-1 bg-transparent"
                      disabled={loading}
                    >
                      Use Demo Address
                    </Button>
                    {searchedAddress && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleReset}
                        className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                        disabled={loading}
                      >
                        Reset
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* ========== Baker Statistics Display ========== */}
        {searchedAddress && (
          <section className="w-full py-12 md:py-24">
            <div className="container px-4 md:px-6">
              <div className="mb-8 flex items-center justify-between">
                <Link
                  href="/statistics"
                  className="flex items-center text-blue-600 hover:underline"
                  onClick={handleReset}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Search
                </Link>

                {baker && (
                  <div className="flex items-center gap-2">
                    {lastUpdated && (
                      <Badge variant="secondary" className="text-xs">
                        Cached: {lastUpdated.toLocaleTimeString()}
                      </Badge>
                    )}
                    <Button onClick={refresh} size="sm" variant="outline" disabled={loading}>
                      <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                      Refresh
                    </Button>
                  </div>
                )}
              </div>

              {loading && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-muted-foreground">Loading baker data from cache or TzKT API...</p>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md text-center">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Data</h3>
                    <p className="text-red-600 text-sm mb-4">{error}</p>
                    <Button onClick={refresh} variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Retry
                    </Button>
                  </div>
                </div>
              )}

              {baker && !loading && (
                <>
                  <div className="flex flex-col items-start space-y-4 mb-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter">Baker Statistics</h2>
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {formatAddress(baker.address)}
                        </div>
                        {baker.alias && (
                          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {baker.alias}
                          </div>
                        )}
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            baker.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {baker.active ? "Active" : "Inactive"}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-blue-600"
                          onClick={() => navigator.clipboard.writeText(baker.address)}
                        >
                          Copy Address
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* ========== Baker Overview Cards ========== */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Baker Overview</CardTitle>
                        <CardDescription>General information about this baker</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Balance</span>
                            <span>{formatXTZ(baker.balance)} XTZ</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Fee</span>
                            <span>{formatPercentage(baker.fee)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Delegators</span>
                            <span>{baker.numDelegators.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Estimated APY</span>
                            <span className="text-green-600 font-medium">
                              {baker.estimatedApy ? formatPercentage(baker.estimatedApy) : "N/A"}
                            </span>
                          </div>
                          {baker.software && (
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Software</span>
                              <span className="text-xs">{baker.software.version}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Staking Balance</CardTitle>
                        <CardDescription>Current staking capacity and usage</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Delegated Balance</span>
                            <span>{formatXTZ(baker.delegatedBalance)} XTZ</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Staking Balance</span>
                            <span>{formatXTZ(baker.stakingBalance)} XTZ</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Staking Capacity</span>
                            <span>{formatXTZ(baker.stakingCapacity)} XTZ</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Staking Efficiency</span>
                            <span className="text-green-600 font-medium">
                              {formatPercentage(baker.stakingEfficiency)}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(baker.stakingEfficiency, 100)}%` }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Performance</CardTitle>
                        <CardDescription>Baker performance metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Blocks Created</span>
                            <span>{baker.numBlocks.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Endorsements</span>
                            <span>{baker.numEndorsements.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Double Baking</span>
                            <span className={baker.numDoubleBaking > 0 ? "text-red-500" : ""}>
                              {baker.numDoubleBaking}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Double Endorsing</span>
                            <span className={baker.numDoubleEndorsing > 0 ? "text-red-500" : ""}>
                              {baker.numDoubleEndorsing}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* ========== Tabbed Interface for Detailed Data ========== */}
                  <Tabs defaultValue="performance" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                      <TabsTrigger value="performance">Performance Charts</TabsTrigger>
                      <TabsTrigger value="payouts">Recent Rewards</TabsTrigger>
                      <TabsTrigger value="details">Detailed Info</TabsTrigger>
                    </TabsList>
                    <TabsContent value="performance">
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                          <CardHeader>
                            <CardTitle>Block Creation</CardTitle>
                            <CardDescription>Total blocks created</CardDescription>
                          </CardHeader>
                          <CardContent className="flex items-center justify-center p-6">
                            <div className="text-center">
                              <div className="text-4xl font-bold text-blue-600 mb-2">
                                {baker.numBlocks.toLocaleString()}
                              </div>
                              <BarChart3 className="h-16 w-16 mx-auto text-blue-300" />
                              <p className="mt-2 text-sm text-muted-foreground">Total blocks</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Endorsements</CardTitle>
                            <CardDescription>Total endorsements made</CardDescription>
                          </CardHeader>
                          <CardContent className="flex items-center justify-center p-6">
                            <div className="text-center">
                              <div className="text-4xl font-bold text-blue-600 mb-2">
                                {baker.numEndorsements.toLocaleString()}
                              </div>
                              <LineChart className="h-16 w-16 mx-auto text-blue-300" />
                              <p className="mt-2 text-sm text-muted-foreground">Total endorsements</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Delegator Distribution</CardTitle>
                            <CardDescription>Number of delegators</CardDescription>
                          </CardHeader>
                          <CardContent className="flex items-center justify-center p-6">
                            <div className="text-center">
                              <div className="text-4xl font-bold text-blue-600 mb-2">
                                {baker.numDelegators.toLocaleString()}
                              </div>
                              <PieChart className="h-16 w-16 mx-auto text-blue-300" />
                              <p className="mt-2 text-sm text-muted-foreground">Active delegators</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    <TabsContent value="payouts">
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Rewards</CardTitle>
                          <CardDescription>
                            Last {rewards.length} reward cycles{" "}
                            {rewards.length > 0 && `(${rewards.length} cycles shown)`}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {rewards.length === 0 ? (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">No recent rewards data available</p>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {rewards.slice(0, 5).map((reward, index) => (
                                <div
                                  key={reward.cycle}
                                  className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                  <div className="flex items-center">
                                    <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                      <span className="text-sm font-medium text-blue-800">{reward.cycle}</span>
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium leading-none">Cycle {reward.cycle}</p>
                                      <p className="text-sm text-muted-foreground">
                                        Blocks: {reward.blocks}/{reward.expectedBlocks} | Endorsements:{" "}
                                        {reward.endorsements}/{reward.expectedEndorsements}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium">
                                      {formatXTZ(reward.blockRewards + reward.endorsementRewards + reward.blockFees)}{" "}
                                      XTZ
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {reward.quote?.usd
                                        ? `$${((reward.quote.usd * (reward.blockRewards + reward.endorsementRewards + reward.blockFees)) / 1000000).toFixed(2)}`
                                        : ""}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full bg-transparent">
                            View All Rewards History
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                    <TabsContent value="details">
                      <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                          <CardHeader>
                            <CardTitle>Frozen Balances</CardTitle>
                            <CardDescription>Currently frozen amounts</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">Frozen Deposits</span>
                                <span>{formatXTZ(baker.frozenDeposits)} XTZ</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">Frozen Rewards</span>
                                <span>{formatXTZ(baker.frozenRewards)} XTZ</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">Frozen Fees</span>
                                <span>{formatXTZ(baker.frozenFees)} XTZ</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader>
                            <CardTitle>Governance Activity</CardTitle>
                            <CardDescription>Participation in governance</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">Proposals</span>
                                <span>{baker.numProposals}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">Ballots</span>
                                <span>{baker.numBallots}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">Activations</span>
                                <span>{baker.numActivations}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </div>
          </section>
        )}
      </main>

      {/* ========== Footer ========== */}
      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <Image src="/tezos-logo.png" alt="Tezos Logo" width={24} height={24} />
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

/**
 * Tools Section Component
 * 
 * Useful tools and resources for bakers
 */

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toolsContent } from "@/content/tools"

export function ToolsSection() {
  const [showAll, setShowAll] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const INITIAL_CARDS = 6
  const TOTAL_CARDS = toolsContent.cards.length
  
  // Detect if we're in 3-column layout (lg breakpoint) where all 9 cards fit nicely
  useEffect(() => {
    const checkLayout = () => {
      // lg breakpoint is 1024px in Tailwind
      // With 3 columns, 9 cards = 3 rows, which is perfect
      const isThreeColumns = window.innerWidth >= 1024
      setShowButton(!isThreeColumns)
    }
    
    checkLayout()
    window.addEventListener('resize', checkLayout)
    return () => window.removeEventListener('resize', checkLayout)
  }, [])
  
  const remainingCount = TOTAL_CARDS - INITIAL_CARDS

  return (
    <section id="tools" className="relative min-h-screen flex items-center py-16 sm:py-24 overflow-hidden bg-black-900">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal text-white-900 text-balance">
            {toolsContent.title}
          </h2>
          <p className="max-w-[900px] text-white-900 text-sm sm:text-base md:text-lg leading-relaxed px-4">
            {toolsContent.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {toolsContent.cards.map((card, index) => {
            const isVisible = index < INITIAL_CARDS || showAll
            return (
              <Card 
                key={index} 
                className={`bg-black-800 border-black-600 hover:border-brand-blue-600/50 transition-colors flex flex-col h-full gap-0 ${!isVisible ? 'hidden lg:block' : ''}`}
              >
                <CardHeader className="pb-4 text-left">
                  {/* Icon + text aligned like Get Started cards */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-brand-blue-600/10 flex items-center justify-center flex-shrink-0">
                      <card.icon className="h-6 w-6 text-brand-blue-600" />
                    </div>

                    {/* Keep headers visually consistent even when texts differ */}
                    <div className="min-w-0 flex-1 text-left">
                      <CardTitle
                        className={[
                          "text-white-900 font-heading font-normal",
                          "text-xl leading-snug",
                          // Cross-browser alignment: fixed height + hidden overflow
                          // (multi-line clamp is not reliable in all browsers)
                          "h-[3rem] overflow-hidden",
                        ].join(" ")}
                      >
                        {card.title}
                      </CardTitle>
                      <CardDescription
                        className={[
                          "text-white-700 mt-1",
                          "text-sm leading-relaxed",
                          // Cross-browser alignment: fixed height + hidden overflow
                          "h-[3.75rem] overflow-hidden",
                        ].join(" ")}
                      >
                        {card.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1" />
                <CardFooter className="mt-auto pt-4 pb-0">
                  <Link
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-full border border-brand-blue-600 bg-transparent text-brand-blue-400 px-4 font-heading font-normal text-sm leading-6 transition-all hover:bg-brand-blue-600/10 hover:text-brand-blue-300 cursor-pointer focus-visible:ring-[3px] focus-visible:ring-[#8aabff] w-full"
                    aria-label={`Visit ${card.title}`}
                  >
                    {card.linkText} <ExternalLink className="h-4 w-4 ml-2" />
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Show more/less button - appears when not in 3-column layout */}
        {showButton && remainingCount > 0 && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="rounded-full border-white-600 text-white-900 bg-transparent hover:bg-black-600 hover:text-white-900 px-6 py-2.5 font-sans text-sm font-medium"
              aria-label={showAll ? "Show fewer tools" : "Show more tools"}
            >
              {showAll ? (
                <>
                  Show less <ChevronUp className="h-4 w-4 ml-2" />
                </>
              ) : (
                <>
                  View more ({remainingCount} more) <ChevronDown className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}


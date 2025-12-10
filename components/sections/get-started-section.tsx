/**
 * Get Started Section Component
 * 
 * Setup guide with cards for different aspects of baking
 */

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { getStartedContent } from "@/content/get-started"

export function GetStartedSection() {
  return (
    <section
      id="get-started"
      className="relative min-h-screen flex items-center py-12 md:py-16 lg:py-20 overflow-hidden bg-black-900"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src={getStartedContent.images.background}
          alt=""
          fill
          priority
          quality={70}
          className="absolute bottom-0 right-0 w-full h-full object-cover object-bottom-right opacity-70"
          style={{ maxWidth: "100%", transform: "scale(1.2)" }}
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-3 md:space-y-4 text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white-900 text-balance px-4">
            {getStartedContent.title}
          </h2>
          <p className="max-w-[900px] text-white-900 text-sm sm:text-base md:text-lg leading-relaxed px-4">
            {getStartedContent.description}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {getStartedContent.cards.map((card, index) => (
            <Card
              key={index}
              className="bg-gradient-to-b from-[#111] to-[#181818] border border-white-50/10 shadow-xl flex flex-col hover:border-brand-blue-600/30 transition-all duration-300"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-brand-blue-600/10 flex items-center justify-center mb-4">
                  <card.icon className="h-6 w-6 text-brand-blue-600" />
                </div>
                <CardTitle className="text-white-900 text-xl">{card.title}</CardTitle>
                <CardDescription className="text-white-700">{card.description}</CardDescription>
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
                  className="text-sm font-medium text-brand-blue-400 flex items-center hover:text-brand-blue-300 transition-colors underline-offset-4 hover:underline"
                  aria-label={`${card.linkText} - ${card.title}`}
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
  )
}


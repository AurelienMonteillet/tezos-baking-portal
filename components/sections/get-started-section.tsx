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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal text-white-900 text-balance px-4">
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
                <CardTitle className="text-white-900 text-xl font-heading font-normal">{card.title}</CardTitle>
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center justify-center rounded-full border border-brand-blue-600 bg-transparent text-brand-blue-400 px-4 font-heading font-normal text-sm leading-6 transition-all hover:bg-brand-blue-600/10 hover:text-brand-blue-300 cursor-pointer focus-visible:ring-[3px] focus-visible:ring-[#8aabff] w-full"
                  aria-label={`${card.linkText} - ${card.title}`}
                >
                  {card.linkText} <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:mt-12 px-4">
          <Link
            href={getStartedContent.documentationButton.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white-700 text-black-900 px-5 font-heading font-normal text-lg leading-7 transition-all hover:bg-white-900 cursor-pointer focus-visible:ring-[3px] focus-visible:ring-[#8aabff]"
            aria-label={getStartedContent.documentationButton.text}
          >
            {getStartedContent.documentationButton.text} <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}


/**
 * Tools Section Component
 * 
 * Useful tools and resources for bakers
 */

import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toolsContent } from "@/content/tools"

export function ToolsSection() {
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
                <CardDescription className="text-white-700">{card.description}</CardDescription>
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
  )
}


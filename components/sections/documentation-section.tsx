/**
 * Documentation Section Component
 * 
 * Learning resources and documentation links
 */

import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { documentationContent } from "@/content/documentation"

export function DocumentationSection() {
  return (
    <section id="docs" className="relative min-h-screen flex items-center py-16 sm:py-24 overflow-hidden bg-black-900">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-normal text-white-900 text-balance">
            {documentationContent.title}
          </h2>
          <p className="max-w-[900px] text-white-900 text-sm sm:text-base md:text-lg leading-relaxed px-4">
            {documentationContent.description}
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto">
          {documentationContent.sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-[#111] to-[#181818] shadow-[0_0_40px_rgba(0,0,0,0.3)]"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-normal text-white-900 mb-2">{section.title}</h3>
                <p className="text-sm sm:text-base text-white-700">{section.description}</p>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6">
                {section.items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    target="_blank"
                    className="flex flex-col items-start gap-4 p-4 sm:p-6 rounded-xl border border-white/5 bg-[#111] hover:border-brand-blue-600/30 transition-all cursor-pointer group shadow-[0_4px_20px_rgba(0,0,0,0.2)] underline-offset-4 hover:underline"
                    aria-label={`Open ${item.title} documentation`}
                  >
                    <div className="flex items-start justify-between gap-4 w-full">
                      <div className="flex-1">
                        <h4 className="font-heading font-normal text-white-900 text-base sm:text-lg mb-2 group-hover:text-brand-blue-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-white-700 leading-relaxed">{item.description}</p>
                      </div>
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 text-white-700 group-hover:text-brand-blue-400 transition-colors flex-shrink-0 mt-1" aria-hidden="true" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


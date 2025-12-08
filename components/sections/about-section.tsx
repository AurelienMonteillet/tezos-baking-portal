/**
 * About Section Component
 * 
 * Educational content about Tezos baking
 */

import Link from "next/link"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { aboutContent } from "@/content/about"

export function AboutSection() {
  return (
    <section id="about" className="relative py-16 md:py-32 overflow-hidden">
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
            <Image
              src={aboutContent.images.illustration}
              alt="Baking Visualization - Tezos network diagram showing baking process"
              width={800}
              height={600}
              className="w-full h-auto rounded-xl md:rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
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
  )
}


/**
 * Hero Section Component
 * 
 * Main landing section with title, description, and CTA buttons
 */

import Link from "next/link"
import Image from "next/image"
import { heroContent } from "@/content/hero"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] md:min-h-[700px] lg:min-h-screen flex items-center py-8 overflow-hidden bg-black-900"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src={heroContent.images.background}
          alt=""
          fill
          priority
          fetchPriority="high"
          className="absolute top-0 right-0 w-full h-full object-cover object-top-right opacity-70"
          style={{ maxWidth: "100%", transform: "scale(1.2)" }}
          sizes="100vw"
          quality={70}
          aria-hidden="true"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-6">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-white-900 break-words">
              {heroContent.title}
            </h1>
            <p className="max-w-[600px] text-sm sm:text-base md:text-lg text-white-900 leading-relaxed">
              {heroContent.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={heroContent.primaryButton.href}
                className="inline-flex h-10 md:h-11 items-center justify-center rounded-full bg-white-900 text-black-900 px-5 sm:px-6 md:px-8 text-sm font-semibold shadow-lg transition-all hover:bg-white-800"
                aria-label={heroContent.primaryButton.text}
              >
                {heroContent.primaryButton.text}
              </Link>
              <Link
                href={heroContent.secondaryButton.href}
                className="inline-flex h-10 md:h-11 items-center justify-center rounded-full border-2 border-white-700 text-white-900 px-5 sm:px-6 md:px-8 text-sm font-semibold transition-all hover:bg-white-900/10"
                aria-label={heroContent.secondaryButton.text}
              >
                {heroContent.secondaryButton.text}
              </Link>
            </div>
          </div>
          <div className="relative lg:block overflow-hidden">
            <div className="aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 max-h-[300px] md:max-h-[400px] lg:max-h-none relative">
              <Image
                src={heroContent.images.illustration}
                alt="Tezos Baking Portal - Comprehensive resource for baking"
                fill
                priority
                fetchPriority="high"
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


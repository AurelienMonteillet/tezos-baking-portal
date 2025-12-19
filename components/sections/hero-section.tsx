/**
 * Hero Section Component
 * 
 * Main landing section with title, description, and CTA buttons
 */

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { heroContent } from "@/content/hero"

export function HeroSection() {
  // Helper to render title with highlighted text
  const renderTitle = (text: string) => {
    return text.split('*').map((part, index) => {
      // Even parts are normal text, odd parts are highlighted (wrapped in *)
      if (index % 2 === 1) {
        return (
          <span key={index} className="text-brand-blue-600">
            {part}
          </span>
        )
      }
      return part
    })
  }

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
          quality={40}
          aria-hidden="true"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-8 lg:pt-8">
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-white-900 break-words leading-tight">
              {renderTitle(heroContent.title)}
            </h1>
            <p className="max-w-[600px] text-base sm:text-lg md:text-xl text-white-900/90 leading-relaxed font-light">
              {heroContent.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href={heroContent.primaryButton.href}
                className="group inline-flex h-14 items-center justify-center rounded-full bg-white-900 text-black-900 px-8 font-heading font-medium text-lg leading-7 transition-all hover:bg-white-800 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer focus-visible:ring-[3px] focus-visible:ring-[#8aabff]"
                aria-label={heroContent.primaryButton.text}
              >
                {heroContent.primaryButton.text}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href={heroContent.secondaryButton.href}
                className="inline-flex h-14 items-center justify-center rounded-full border border-white-600/50 bg-transparent text-white-900 px-8 font-heading font-normal text-lg leading-7 transition-all hover:bg-white-900/10 hover:border-white-900 cursor-pointer focus-visible:ring-[3px] focus-visible:ring-[#8aabff]"
                aria-label={heroContent.secondaryButton.text}
              >
                {heroContent.secondaryButton.text}
              </Link>
            </div>
          </div>
          <div className="relative lg:block overflow-hidden">
            {/* Added glow effect behind the image */}
            <div className="absolute inset-0 bg-brand-blue-600/20 blur-[100px] rounded-full transform scale-75 pointer-events-none"></div>
            
            <div className="aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 max-h-[300px] md:max-h-[400px] lg:max-h-none relative shadow-2xl shadow-black-900/50">
              <Image
                src={heroContent.images.illustration}
                alt="Tezos Baking Portal - Comprehensive resource for baking"
                fill
                priority
                fetchPriority="high"
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 640px) 400px, (max-width: 1024px) 600px, 800px"
                quality={75}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

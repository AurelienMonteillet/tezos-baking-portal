/**
 * CTA (Call to Action) Section Component
 * 
 * Prominent call-to-action section with gradient background
 */

import Link from "next/link"
import Image from "next/image"
import { ctaContent } from "@/content/cta"

export function CTASection() {
  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden mb-16 sm:mb-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full">
        <div
          className="relative rounded-3xl p-8 sm:p-12 md:p-16 overflow-hidden w-full"
          style={{ background: "linear-gradient(309.94deg, #6C235E 16.9%, #5C72FA 93.93%)" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <Image
              src={ctaContent.images.overlay}
              alt=""
              fill
              className="absolute inset-0 h-full w-full object-cover opacity-30 sm:opacity-50"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              {ctaContent.title}
            </h2>
            <p className="text-white/90 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
              {ctaContent.description}
            </p>
            <Link
              href={ctaContent.button.href}
              className="inline-flex h-11 sm:h-12 items-center justify-center rounded-full bg-[#E0E0FF] text-black-900 px-6 sm:px-8 text-sm sm:text-base font-semibold shadow-xl transition-all hover:bg-white hover:scale-105"
              aria-label={ctaContent.button.text}
            >
              {ctaContent.button.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}


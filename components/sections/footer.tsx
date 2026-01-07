"use client"

/**
 * Footer Component
 * 
 * Site footer with links, copyright, and attribution
 */

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github } from "lucide-react"
import { footerContent } from "@/content/footer"

export function Footer() {
  // Start with current year as default (2024, 2025, etc.)
  // This will be updated on client mount to ensure it's always accurate
  const [copyrightYear, setCopyrightYear] = useState("2024")

  // Update copyright year on client mount to ensure it's always current
  // This runs only on client, preventing hydration mismatch
  useEffect(() => {
    setCopyrightYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer className="w-full border-t border-white/10 bg-black-900">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Top Section: Links organized in columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Column 1: About */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 mb-2">
                <Image src={footerContent.images.logo} alt="Tezos logo" width={20} height={20} className="h-5 w-5 opacity-90" />
                <span className="text-sm font-medium text-white-900">Tezos Baking Portal</span>
              </div>
              <p className="text-xs text-white-700">
                Built by{" "}
                <Link
                  href={footerContent.builtBy[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  aria-label={`Visit ${footerContent.builtBy[0].text} website`}
                >
                  {footerContent.builtBy[0].text}
                </Link>
                {" & "}
                <Link
                  href={footerContent.builtBy[1].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                  aria-label={`Visit ${footerContent.builtBy[1].text} website`}
                >
                  {footerContent.builtBy[1].text}
                </Link>
              </p>
            </div>

            {/* Column 2: Community */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-heading font-normal text-white-900 mb-1">Community</h3>
              <div className="flex flex-col gap-2">
                {footerContent.communityLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white-700 transition-colors hover:text-white underline-offset-4 hover:underline"
                    aria-label={`Join ${link.text} community`}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Legal */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-heading font-normal text-white-900 mb-1">Legal</h3>
              <div className="flex flex-col gap-2">
                {footerContent.links.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white-700 transition-colors hover:text-white underline-offset-4 hover:underline"
                    aria-label={link.text}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 4: Source Code */}
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-heading font-normal text-white-900 mb-1">Source Code</h3>
              <Link
                href={footerContent.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-white-700 transition-colors hover:text-white underline-offset-4 hover:underline"
                aria-label="View source code on GitHub"
              >
                <Github className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
                <span>{footerContent.githubText} GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright - Outside container for full-width border */}
      <div className="w-full border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
          <p className="text-sm text-white-700 text-center">
            © {copyrightYear} Tezos Baking Portal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}


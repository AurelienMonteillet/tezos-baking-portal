/**
 * Footer Component
 * 
 * Site footer with links, copyright, and attribution
 */

import Link from "next/link"
import { Github } from "lucide-react"
import { footerContent } from "@/content/footer"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black-900">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Left Side: Logo + Built by + GitHub */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 md:order-1">
            <div className="flex items-center gap-2">
              <img src={footerContent.images.logo} alt="Tezos" className="h-5 w-5 opacity-90" />
              <span className="text-sm text-white-600">
                Built by{" "}
                <Link
                  href={footerContent.builtBy[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {footerContent.builtBy[0].text}
                </Link>
                {" & "}
                <Link
                  href={footerContent.builtBy[1].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {footerContent.builtBy[1].text}
                </Link>
              </span>
            </div>

            <span className="hidden h-4 w-px bg-white/10 sm:block" />

            <Link
              href={footerContent.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-white-600 transition-colors hover:text-white"
            >
              <Github className="h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
              <span>{footerContent.githubText} GitHub</span>
            </Link>
          </div>

          {/* Right Side: Links + Copyright */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 md:order-2">
            <div className="flex items-center gap-6">
              {footerContent.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-sm text-white-600 transition-colors hover:text-white"
                >
                  {link.text}
                </Link>
              ))}
            </div>

            <span className="hidden h-4 w-px bg-white/10 sm:block" />

            <p className="text-sm text-white-600">{footerContent.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}


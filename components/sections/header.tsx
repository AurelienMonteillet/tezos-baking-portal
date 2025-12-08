/**
 * Header/Navigation Component
 * 
 * Sticky navigation header with mobile menu support
 */

"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { headerContent } from "@/content/header"

interface HeaderProps {
  isScrolled: boolean
  mobileMenuOpen: boolean
  onMobileMenuToggle: () => void
  onSmoothScroll: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void
}

export function Header({ isScrolled, mobileMenuOpen, onMobileMenuToggle, onSmoothScroll }: HeaderProps) {
  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-black-900/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        <Link href="https://tezos.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3" aria-label="Tezos homepage">
          <Image src={headerContent.logo} alt="Tezos logo" width={32} height={32} className="h-8 w-auto" priority />
          <span className="font-heading text-lg font-semibold text-white">{headerContent.title}</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6" aria-label="Main navigation">
            {headerContent.navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={(e) => onSmoothScroll(e, link.href)}
                className="text-sm font-medium text-white/90 transition-colors hover:text-white underline-offset-4 hover:underline"
                aria-label={`Navigate to ${link.text} section`}
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>

        <button
          className="md:hidden p-2 text-white"
          onClick={onMobileMenuToggle}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black-900/95 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Mobile navigation menu">
          <nav className="container px-4 py-4 flex flex-col gap-4" aria-label="Mobile navigation">
            {headerContent.navLinks.map((link, index) => {
              const isExternal = link.href.startsWith("/")
              return (
                <Link
                  key={index}
                  href={link.href}
                  onClick={isExternal ? undefined : (e) => onSmoothScroll(e, link.href)}
                  className="text-sm font-medium text-white/90 transition-colors hover:text-white py-2 underline-offset-4 hover:underline"
                  aria-label={`Navigate to ${link.text}${isExternal ? " page" : " section"}`}
                >
                  {link.text}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}


/**
 * Header/Navigation Component
 * 
 * Sticky navigation header with mobile menu support
 */

"use client"

import Link from "next/link"
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
        <Link href="https://tezos.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
          <img src={headerContent.logo} alt="Tezos" className="h-8 w-auto" />
          <span className="font-heading text-lg font-semibold text-white">{headerContent.title}</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            {headerContent.navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={(e) => onSmoothScroll(e, link.href)}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
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
        <div className="md:hidden bg-black-900/95 backdrop-blur-md">
          <nav className="container px-4 py-4 flex flex-col gap-4">
            {headerContent.navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={(e) => onSmoothScroll(e, link.href)}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white py-2"
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}


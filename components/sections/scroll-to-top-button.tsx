/**
 * Scroll to Top Button Component
 * 
 * Floating button that appears when user scrolls down
 * Allows quick return to top of page
 */

"use client"

import { ArrowUp } from "lucide-react"

interface ScrollToTopButtonProps {
  show: boolean
  onClick: () => void
}

export function ScrollToTopButton({ show, onClick }: ScrollToTopButtonProps) {
  if (!show) return null

  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-40 h-12 w-12 rounded-full bg-brand-blue-600/80 backdrop-blur-sm text-white shadow-lg transition-all hover:bg-brand-blue-600 motion-safe:hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2 focus:ring-offset-black-900"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5 mx-auto" />
    </button>
  )
}


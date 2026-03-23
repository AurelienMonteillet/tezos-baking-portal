"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { MessageSquare, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ASANA_FORM_URL = "https://form.asana.com/?k=pdeu8b02rc3lGRCLgGmY-w&d=1152818524426944&embed=true"

export function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isShifted, setIsShifted] = useState(false)
  const pathname = usePathname()

  // Manage scroll position to shift button when "Scroll to Top" is visible
  // The Scroll to Top button appears on the home page when scrollY > 400
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (pathname === "/") {
            setIsShifted(window.scrollY > 400)
          } else {
            setIsShifted(false)
          }
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 z-50",
          "h-12 w-12 rounded-full",
          "bg-brand-blue-600/80 backdrop-blur-sm text-white shadow-lg",
          "transition-all hover:bg-brand-blue-600 motion-safe:hover:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-brand-blue-500 focus:ring-offset-2 focus:ring-offset-black-900",
          // Dynamic positioning: shifts to left when ScrollToTop is visible, otherwise same position as ScrollToTop
          isShifted ? "right-24" : "right-8"
        )}
        aria-label="Open feedback form"
      >
        <MessageSquare className="h-5 w-5 mx-auto" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className={cn(
            "fixed inset-0 z-[100]",
            "bg-black/80 backdrop-blur-sm",
            "flex items-center justify-center",
            "p-4 sm:p-6"
          )}
          onClick={() => setIsOpen(false)}
        >
          {/* Modal Content */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
            className={cn(
              "relative w-full max-w-4xl",
              "bg-black-800 rounded-2xl",
              "border border-white/10",
              "shadow-2xl",
              "flex flex-col",
              "overflow-hidden",
              "max-h-[90vh]"
            )}
            style={{ height: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
              <h2 id="feedback-modal-title" className="text-xl sm:text-2xl font-heading font-normal text-white-900">
                Share your feedback
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white-700 hover:text-white-900 hover:bg-black-600"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Modal Body with iframe */}
            <div className="flex-1 overflow-hidden min-h-0">
              <iframe
                src={ASANA_FORM_URL}
                className="w-full h-full border-0"
                title="Asana feedback form"
                allow="clipboard-write"
                sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

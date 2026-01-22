/**
 * Tag Vertical Component
 *
 * Small announcement tag based on Figma design.
 */

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface TagVerticalProps {
  text: string
  href: string
}

export function TagVertical({ text, href }: TagVerticalProps) {
  const isExternal = href.startsWith("http")

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-[2px] rounded-[4px] bg-[#491d4d] px-2 py-1 font-heading text-sm font-normal leading-[18px] tracking-[0.3px] text-[#ef5efa] underline decoration-dotted underline-offset-[3px] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#8aabff] focus-visible:ring-offset-1"
    >
      <span>{text}</span>
      <ArrowUpRight className="h-4 w-4 text-[#ef5efa]" aria-hidden="true" />
    </Link>
  )
}

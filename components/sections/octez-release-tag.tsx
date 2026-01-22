/**
 * Octez Release Tag
 *
 * Loads the latest Octez release info and renders the tag.
 */

"use client"

import { useEffect, useState } from "react"
import { TagVertical } from "@/components/ui/tag-vertical"

type OctezTagData = {
  text: string
  href: string
}

interface OctezReleaseTagProps {
  fallback: OctezTagData
}

export function OctezReleaseTag({ fallback }: OctezReleaseTagProps) {
  const [tag, setTag] = useState<OctezTagData>(fallback)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        const response = await fetch("/api/octez-latest.json")
        if (!response.ok) return
        const data = (await response.json()) as OctezTagData
        if (!data?.text || !data?.href) return
        if (isMounted) setTag(data)
      } catch {
        // Keep fallback
      }
    }

    load()

    return () => {
      isMounted = false
    }
  }, [])

  return <TagVertical text={tag.text} href={tag.href} />
}

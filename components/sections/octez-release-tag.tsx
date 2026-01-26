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

type OctezVersion = {
  major: number
  minor: number
  latest?: boolean
  active?: boolean
  rc?: number
  announcement?: string
}

interface OctezReleaseTagProps {
  fallback: OctezTagData
}

const VERSIONS_URL = "https://octez.tezos.com/releases/versions.json"

export function OctezReleaseTag({ fallback }: OctezReleaseTagProps) {
  const [tag, setTag] = useState<OctezTagData>(fallback)

  useEffect(() => {
    let isMounted = true

    const load = async () => {
      try {
        // Fetch directly from Octez API to get the latest version
        const response = await fetch(VERSIONS_URL)
        if (!response.ok) return
        
        const versions = (await response.json()) as OctezVersion[]
        const latest = versions.find(version => version.latest && !version.rc)
        
        if (!latest || !latest.announcement) return
        
        const data: OctezTagData = {
          text: `Octez v${latest.major}.${latest.minor} available now`,
          href: latest.announcement,
        }
        
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

import { NextResponse } from "next/server"

const VERSIONS_URL = "https://octez.tezos.com/releases/versions.json"
const DEFAULT_RESPONSE = {
  text: "Octez v24.4 available now",
  href: "https://octez.tezos.com/docs/releases/version-24.html",
}

type OctezVersion = {
  major: number
  minor: number
  latest?: boolean
  active?: boolean
  rc?: number
  announcement?: string
}

export const revalidate = 60 * 60 * 24

export async function GET() {
  try {
    const response = await fetch(VERSIONS_URL, {
      next: { revalidate },
    })

    if (!response.ok) {
      return NextResponse.json(DEFAULT_RESPONSE)
    }

    const versions = (await response.json()) as OctezVersion[]
    const latest = versions.find(version => version.latest && !version.rc)

    if (!latest || !latest.announcement) {
      return NextResponse.json(DEFAULT_RESPONSE)
    }

    const text = `Octez v${latest.major}.${latest.minor} available now`

    return NextResponse.json({
      text,
      href: latest.announcement,
    })
  } catch {
    return NextResponse.json(DEFAULT_RESPONSE)
  }
}

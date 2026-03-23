import { MetadataRoute } from "next"

/**
 * Sitemap.xml generation
 *
 * Helps search engines discover and index all pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bakers.tezos.com"

  return [
    {
      url: baseUrl,
      lastModified: "2025-03-04",
      changeFrequency: "weekly",
      priority: 1,
    },
  ]
}

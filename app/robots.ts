import { MetadataRoute } from "next"

/**
 * Robots.txt configuration
 * 
 * Tells search engines which pages they can or cannot access
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tezos-baking-portal.vercel.app"
  
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}


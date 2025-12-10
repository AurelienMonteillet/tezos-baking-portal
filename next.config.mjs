/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Enable Next.js image optimization in production
    formats: ['image/avif', 'image/webp'],
    // Optimized sizes for mobile-first approach
    deviceSizes: [375, 414, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // Reduce default quality for better performance
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Cache headers and security headers
  async headers() {
    const securityHeaders = [
      {
        key: 'X-DNS-Prefetch-Control',
        value: 'on',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://us.i.posthog.com https://*.posthog.com",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: https:",
          "font-src 'self' data:",
          "connect-src 'self' https://api.tzkt.io https://tez.cool https://us.i.posthog.com https://*.posthog.com",
          "frame-src 'self' https://form.asana.com",
          "frame-ancestors 'self'",
        ].join('; '),
      },
    ]

    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/:path*',
          headers: securityHeaders,
        },
        {
          source: '/_next/static/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
            ...securityHeaders,
          ],
        },
        {
          source: '/_next/image',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
            ...securityHeaders,
          ],
        },
      ]
    }
    // Development: no cache to prevent 404 errors, but keep security headers
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/_next/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
          ...securityHeaders,
        ],
      },
    ]
  },
}

export default nextConfig

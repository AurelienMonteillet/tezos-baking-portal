/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for S3 deployment
  output: 'export',
  // Note: headers() are not applied in static export (warning is expected)
  // Security headers will be configured in CloudFront distribution
  // This is normal and not a problem - CloudFront handles headers
  typescript: {
    ignoreBuildErrors: true,
  },
  // Compress output files
  compress: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot', 'next-themes'],
  },
  // Optimize compiler output
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  images: {
    unoptimized: true, // Required for static export (S3 doesn't support Next.js image optimization)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Headers are disabled for static export (output: 'export')
  // Security headers and cache headers will be configured in CloudFront distribution
}

export default nextConfig

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
  // Enable SWC minification for better performance
  swcMinify: true,
  // Compress output files
  compress: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Optimize bundle size
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot', '@radix-ui/react-tabs', 'next-themes'],
  },
  // Optimize compiler output
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  images: {
    unoptimized: true, // Required for static export (S3 doesn't support Next.js image optimization)
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
  // Headers are disabled for static export (output: 'export')
  // Security headers and cache headers will be configured in CloudFront distribution
  // See DEPLOYMENT.md for CloudFront configuration details
  // async headers() {
  //   ... (headers configuration removed - not compatible with static export)
  // },
}

export default nextConfig

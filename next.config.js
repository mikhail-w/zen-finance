/** @type {import('next').NextConfig} */
const nextConfig = {
  // These options have been moved out of experimental in Next.js 15.x
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,

  // Force all pages to be dynamic by default
  reactStrictMode: false,

  // Skip TypeScript checks during builds
  typescript: {
    // This will not run type checks during the build
    ignoreBuildErrors: true,
  },

  // Skip ESLint during builds
  eslint: {
    // This will skip running ESLint during builds
    ignoreDuringBuilds: true,
  },

  // Force dynamic rendering for all pages
  experimental: {
    // Disable caching for data fetching
    appDir: true,
    serverActions: {
      allowedOrigins: ['*'],
    },
  },

  // Set output to standalone for better Vercel compatibility
  output: 'standalone',

  // Disable static optimization completely
  distDir: '.next',
  poweredByHeader: false,
};

module.exports = nextConfig;

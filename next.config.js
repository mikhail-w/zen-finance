/** @type {import('next').NextConfig} */
const nextConfig = {
  // These options have been moved out of experimental in Next.js 15.x
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,

  // Force all pages to be dynamic by default - this helps with client hooks
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

  // Disable static generation to avoid client-side hooks issues
  staticPageGenerationTimeout: 0,

  // Set output to standalone for better Vercel compatibility
  output: 'standalone',
};

module.exports = nextConfig;

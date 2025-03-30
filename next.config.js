/** @type {import('next').NextConfig} */
const nextConfig = {
  // These options have been moved out of experimental in Next.js 15.x
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  reactStrictMode: false,

  // Skip TypeScript and ESLint checks during build only
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Set output to standalone for better Vercel compatibility
  output: 'standalone',
};

module.exports = nextConfig;

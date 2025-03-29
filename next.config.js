/** @type {import('next').NextConfig} */
const nextConfig = {
  // These options have been moved out of experimental in Next.js 15.x
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,

  // Force all pages to be dynamic by default
  reactStrictMode: false,
};

module.exports = nextConfig;

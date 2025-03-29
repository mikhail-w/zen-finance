/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Skip build errors related to useSearchParams()
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
  },
  // Force all pages to be dynamic by default
  reactStrictMode: false,
};

module.exports = nextConfig;

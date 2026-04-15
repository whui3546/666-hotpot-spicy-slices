/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['666hotpotspicyslices.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true,
  },
}

module.exports = nextConfig
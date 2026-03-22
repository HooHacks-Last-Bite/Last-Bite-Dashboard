/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['10.142.38.61'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  }
}

export default nextConfig

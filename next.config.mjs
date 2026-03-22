/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['10.142.38.61', '172.20.10.3', '172.20.10.7', '172.20.10.10', '172.20.10.9'],
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  }
}

export default nextConfig

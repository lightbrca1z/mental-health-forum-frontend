/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://mental-health-forum-backend-production.up.railway.app/api',
  },
  // 本番環境用の最適化
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // 画像最適化
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 
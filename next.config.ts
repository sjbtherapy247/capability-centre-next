import type { NextConfig } from 'next'
import path from 'node:path'

const nextConfig: NextConfig = {
  // Pin Turbopack root to this project so the stray D:\dev lockfile doesn't trip it
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async redirects() {
    return [
      // WordPress → new
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/contact-us/', destination: '/contact', permanent: true },
      { source: '/book-a-call', destination: '/book', permanent: true },
      { source: '/book-a-call/', destination: '/book', permanent: true },
      {
        source: '/blog/unlocking-business-potential',
        destination: '/blog/unlocking-potential-energy',
        permanent: true,
      },
      {
        source: '/blog/unlocking-business-potential/',
        destination: '/blog/unlocking-potential-energy',
        permanent: true,
      },
      {
        source: '/blog/thank-you-is-a-competitive-business-advantage',
        destination: '/blog/thank-you-competitive-advantage',
        permanent: true,
      },
      {
        source: '/blog/thank-you-is-a-competitive-business-advantage/',
        destination: '/blog/thank-you-competitive-advantage',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

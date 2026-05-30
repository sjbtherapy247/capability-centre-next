import type { MetadataRoute } from 'next'

/**
 * Crawler policy.
 *
 * - On production (`NEXT_PUBLIC_SITE_URL` is the canonical domain): allow all,
 *   advertise sitemap.
 * - Anywhere else (preview/staging/local): block all to avoid indexing duplicate
 *   content from Vercel preview URLs.
 *
 * The canonical domain is read from `NEXT_PUBLIC_SITE_URL`, falling back to the
 * known production hostname. Set this env var on every deploy environment.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://capabilitycentre.com.au'
const CANONICAL = 'https://capabilitycentre.com.au'

export default function robots(): MetadataRoute.Robots {
  const isProduction = SITE_URL === CANONICAL

  if (!isProduction) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Studio + API surface aren't useful in the index.
        disallow: ['/cc-admin', '/cc-admin/', '/api'],
      },
    ],
    sitemap: `${CANONICAL}/sitemap.xml`,
    host: CANONICAL,
  }
}

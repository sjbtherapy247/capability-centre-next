import { MetadataRoute } from 'next'

// Staging: block all crawlers to avoid duplicate content / indexing before launch
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', disallow: '/' }],
    sitemap: 'https://capabilitycentre.com.au/sitemap.xml',
  }
}

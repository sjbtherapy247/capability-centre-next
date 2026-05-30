import type { MetadataRoute } from 'next'
import { getAllServiceSlugs, getAllBlogPosts } from '@/lib/queries'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://capabilitycentre.com.au'

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, blogPosts] = await Promise.all([
    getAllServiceSlugs().catch(() => [] as string[]),
    getAllBlogPosts().catch(() => []),
  ])

  const now = new Date()

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/book`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
  ]

  const serviceUrls: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticUrls, ...serviceUrls, ...blogUrls]
}

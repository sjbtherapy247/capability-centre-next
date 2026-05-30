import { groq } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'
import { sanityClient } from './sanity'
import type { SanityImage } from './sanity.image'

/** Caching: revalidate Sanity reads every 60s (ISR). */
const NEXT_OPTS = { next: { revalidate: 60 } as const }

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type NavItem = { label: string; href: string }

export type OfficeHours = {
  label: string
  open?: string
  close?: string
  closed?: boolean
}

export type SocialLinks = {
  linkedin?: string
  facebook?: string
  instagram?: string
  youtube?: string
}

export type SiteSettings = {
  title: string
  tagline?: string
  description?: string
  logo?: SanityImage
  favicon?: SanityImage
  contactEmail: string
  contactPhone?: string
  address?: string
  officeHours?: OfficeHours[]
  socialLinks?: SocialLinks
  navigation?: NavItem[]
  ctaLabel?: string
  ctaHref?: string
  footerTagline?: string
}

export type Hero = {
  eyebrow?: string
  heading: string
  body?: string
  image?: SanityImage
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

export type ServiceCard = {
  _id: string
  title: string
  slug: string
  shortDescription: string
  longDescription?: string
  order?: number
  image?: SanityImage
}

export type Pillar = { title: string; body?: string }

export type TestimonialDoc = {
  _id: string
  quote: string
  author: string
  role?: string
  company?: string
  photo?: SanityImage
}

export type HomePage = {
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: SanityImage }
  hero?: Hero
  servicesSection?: {
    eyebrow?: string
    heading?: string
    body?: string
    services?: ServiceCard[]
  }
  pillarsSection?: {
    eyebrow?: string
    heading?: string
    pillars?: Pillar[]
  }
  testimonialsSection?: {
    eyebrow?: string
    testimonials?: TestimonialDoc[]
  }
  ctaSection?: {
    heading?: string
    body?: string
    ctaLabel?: string
    ctaHref?: string
  }
}

export type SimplePage = {
  title: string
  slug: string
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: SanityImage }
  hero?: {
    eyebrow?: string
    heading?: string
    subheading?: string
    image?: SanityImage
    ctaLabel?: string
    ctaHref?: string
  }
  body?: PortableTextBlock[]
  sidebar?: { heading?: string; items?: string[] }
}

export type BlogPostSummary = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  author?: string
  publishedAt: string
  tags?: string[]
  coverImage?: SanityImage
}

export type BlogPostFull = BlogPostSummary & {
  body?: PortableTextBlock[]
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: SanityImage }
}

export type ServiceFull = ServiceCard & {
  body?: PortableTextBlock[]
  outcomes?: string[]
  seo?: { metaTitle?: string; metaDescription?: string }
}

/* -------------------------------------------------------------------------- */
/* Fragments                                                                   */
/* -------------------------------------------------------------------------- */

const IMAGE_FRAG = `{
  ...,
  asset->{ _id, _ref, url, metadata { dimensions, lqip } }
}`

const SERVICE_CARD_FRAG = `{
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  longDescription,
  order,
  image ${IMAGE_FRAG}
}`

const TESTIMONIAL_FRAG = `{
  _id,
  quote,
  author,
  role,
  company,
  photo ${IMAGE_FRAG}
}`

/* -------------------------------------------------------------------------- */
/* Queries                                                                     */
/* -------------------------------------------------------------------------- */

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    title,
    tagline,
    description,
    logo ${IMAGE_FRAG},
    favicon ${IMAGE_FRAG},
    contactEmail,
    contactPhone,
    address,
    officeHours,
    socialLinks,
    navigation,
    ctaLabel,
    ctaHref,
    footerTagline
  }
`

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage"][0]{
    seo,
    hero{
      eyebrow,
      heading,
      body,
      ctaLabel,
      ctaHref,
      secondaryCtaLabel,
      secondaryCtaHref,
      image ${IMAGE_FRAG}
    },
    servicesSection{
      eyebrow,
      heading,
      body,
      "services": services[]-> ${SERVICE_CARD_FRAG}
    },
    pillarsSection{
      eyebrow,
      heading,
      pillars[]{title, body}
    },
    testimonialsSection{
      eyebrow,
      "testimonials": testimonials[]-> ${TESTIMONIAL_FRAG}
    },
    ctaSection
  }
`

export const PAGE_BY_SLUG_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    seo,
    hero{
      ...,
      image ${IMAGE_FRAG}
    },
    body,
    sidebar
  }
`

export const ALL_SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc, title asc) ${SERVICE_CARD_FRAG}
`

export const SERVICE_BY_SLUG_QUERY = groq`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    shortDescription,
    longDescription,
    image ${IMAGE_FRAG},
    body,
    outcomes,
    seo
  }
`

export const ALL_SERVICE_SLUGS_QUERY = groq`
  *[_type == "service" && defined(slug.current)][].slug.current
`

export const ALL_BLOG_POSTS_QUERY = groq`
  *[_type == "blogPost"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    author,
    publishedAt,
    tags,
    coverImage ${IMAGE_FRAG}
  }
`

export const BLOG_POST_BY_SLUG_QUERY = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    author,
    publishedAt,
    tags,
    coverImage ${IMAGE_FRAG},
    body,
    seo
  }
`

export const ALL_BLOG_SLUGS_QUERY = groq`
  *[_type == "blogPost" && defined(slug.current)][].slug.current
`

/* -------------------------------------------------------------------------- */
/* Fetchers                                                                    */
/* -------------------------------------------------------------------------- */

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY, {}, NEXT_OPTS)
}

export async function getHomePage(): Promise<HomePage | null> {
  return sanityClient.fetch<HomePage | null>(HOME_PAGE_QUERY, {}, NEXT_OPTS)
}

export async function getPageBySlug(slug: string): Promise<SimplePage | null> {
  return sanityClient.fetch<SimplePage | null>(PAGE_BY_SLUG_QUERY, { slug }, NEXT_OPTS)
}

export async function getAllServices(): Promise<ServiceCard[]> {
  return (await sanityClient.fetch<ServiceCard[]>(ALL_SERVICES_QUERY, {}, NEXT_OPTS)) ?? []
}

export async function getServiceBySlug(slug: string): Promise<ServiceFull | null> {
  return sanityClient.fetch<ServiceFull | null>(SERVICE_BY_SLUG_QUERY, { slug }, NEXT_OPTS)
}

export async function getAllServiceSlugs(): Promise<string[]> {
  return (await sanityClient.fetch<string[]>(ALL_SERVICE_SLUGS_QUERY)) ?? []
}

export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  return (await sanityClient.fetch<BlogPostSummary[]>(ALL_BLOG_POSTS_QUERY, {}, NEXT_OPTS)) ?? []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostFull | null> {
  return sanityClient.fetch<BlogPostFull | null>(BLOG_POST_BY_SLUG_QUERY, { slug }, NEXT_OPTS)
}

export async function getAllBlogSlugs(): Promise<string[]> {
  return (await sanityClient.fetch<string[]>(ALL_BLOG_SLUGS_QUERY)) ?? []
}

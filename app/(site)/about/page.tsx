import type { Metadata } from 'next'
import Link from 'next/link'
import { getPageBySlug, getSiteSettings } from '@/lib/queries'
import { PortableTextRenderer } from '@/components/PortableTextRenderer'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('about')
  return {
    title: page?.seo?.metaTitle || page?.title || 'About',
    description: page?.seo?.metaDescription,
  }
}

export default async function AboutPage() {
  const [page, settings] = await Promise.all([
    getPageBySlug('about'),
    getSiteSettings(),
  ])

  const heroEyebrow = page?.hero?.eyebrow || 'About'
  const heroHeading = page?.hero?.heading || 'About us.'
  const heroSubheading = page?.hero?.subheading
  const ctaLabel = page?.hero?.ctaLabel || settings?.ctaLabel || 'Book a Call'
  const ctaHref = page?.hero?.ctaHref || settings?.ctaHref || '/book'

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <p className="eyebrow text-teal">{heroEyebrow}</p>
        <h1 className="mt-6 text-5xl md:text-7xl text-foreground">{heroHeading}</h1>
        {heroSubheading && (
          <p className="mt-8 text-lg md:text-xl leading-relaxed text-muted max-w-2xl">
            {heroSubheading}
          </p>
        )}
      </section>

      <hr className="gold-rule mx-auto max-w-6xl" />

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
        <PortableTextRenderer value={page?.body} />
        <div className="mt-14">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-teal hover:bg-teal-dark text-white text-sm font-semibold px-7 py-3.5 transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </article>
    </>
  )
}

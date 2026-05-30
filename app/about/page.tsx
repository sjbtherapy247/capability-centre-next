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
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-brand-teal-light text-xs font-semibold tracking-[0.25em] uppercase">
            {heroEyebrow}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">{heroHeading}</h1>
          {heroSubheading && (
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">{heroSubheading}</p>
          )}
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
        <PortableTextRenderer value={page?.body} />
        <div className="mt-12">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-base font-semibold px-6 py-3 transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </article>
    </>
  )
}

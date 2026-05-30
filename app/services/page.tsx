import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllServices, getPageBySlug, getHomePage } from '@/lib/queries'
import { imageUrl } from '@/lib/sanity.image'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('services')
  return {
    title: page?.seo?.metaTitle || page?.title || 'Services',
    description: page?.seo?.metaDescription,
  }
}

export default async function ServicesPage() {
  const [services, page, home] = await Promise.all([
    getAllServices(),
    getPageBySlug('services'),
    getHomePage(),
  ])

  const heroEyebrow = page?.hero?.eyebrow || 'Services'
  const heroHeading = page?.hero?.heading || 'How we build capability — at every level.'
  const heroSubheading =
    page?.hero?.subheading ||
    'Tailored to your people, your context and the outcomes that matter most.'

  const pillarsSection = home?.pillarsSection
  const pillars = pillarsSection?.pillars ?? []

  return (
    <>
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-brand-teal-light text-xs font-semibold tracking-[0.25em] uppercase">
            {heroEyebrow}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white max-w-3xl">
            {heroHeading}
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl leading-relaxed">{heroSubheading}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {services.map((s, i) => {
          const url = imageUrl(s.image, { width: 1000 })
          return (
            <article
              key={s._id}
              id={s.slug}
              className={`grid gap-10 lg:grid-cols-2 items-center scroll-mt-24 ${i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                {url && (
                  <Image
                    src={url}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="text-brand-teal font-semibold tracking-[0.2em] uppercase text-xs">
                  {String(i + 1).padStart(2, '0')} — Service
                </p>
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-navy">{s.title}</h2>
                <p className="mt-4 text-lg text-slate-700 leading-relaxed">{s.shortDescription}</p>
                {s.longDescription && (
                  <p className="mt-4 text-slate-600 leading-relaxed">{s.longDescription}</p>
                )}
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-6 inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-sm font-semibold px-5 py-2.5 transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </article>
          )
        })}
      </section>

      {pillars.length > 0 && (
        <section className="bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl">
              {pillarsSection?.eyebrow && (
                <p className="text-brand-gold font-semibold tracking-[0.2em] uppercase text-xs">
                  {pillarsSection.eyebrow}
                </p>
              )}
              {pillarsSection?.heading && (
                <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-navy">
                  {pillarsSection.heading}
                </h2>
              )}
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p, i) => (
                <div key={`${p.title}-${i}`}>
                  <div className="text-5xl font-bold text-brand-teal/20 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-brand-navy">{p.title}</h3>
                  {p.body && (
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed">{p.body}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

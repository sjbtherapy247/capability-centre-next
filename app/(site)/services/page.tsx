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
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <p className="eyebrow text-teal">{heroEyebrow}</p>
        <h1 className="mt-6 text-5xl md:text-7xl text-foreground max-w-4xl">{heroHeading}</h1>
        <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-muted">
          {heroSubheading}
        </p>
      </section>

      <hr className="gold-rule mx-auto max-w-6xl" />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-24">
        {services.map((s, i) => {
          const url = imageUrl(s.image, { width: 1000 })
          const reverse = i % 2 === 1
          return (
            <article
              key={s._id}
              id={s.slug}
              className="grid gap-12 lg:grid-cols-2 items-center scroll-mt-24"
            >
              <div className={`relative aspect-[4/3] rounded-lg overflow-hidden bg-divider ${reverse ? 'lg:order-2' : ''}`}>
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
                <p className="eyebrow text-gold">
                  {String(i + 1).padStart(2, '0')} — Service
                </p>
                <h2 className="mt-5 text-3xl md:text-5xl text-foreground">{s.title}</h2>
                <p className="mt-6 text-lg leading-relaxed text-foreground/90">
                  {s.shortDescription}
                </p>
                {s.longDescription && (
                  <p className="mt-4 text-base leading-relaxed text-muted">{s.longDescription}</p>
                )}
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-8 inline-flex items-center text-sm font-semibold text-teal hover:text-teal-dark transition-colors group"
                >
                  Read more
                  <span aria-hidden className="ml-1.5 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </article>
          )
        })}
      </section>

      {pillars.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <hr className="gold-rule mb-20" />
          <div className="max-w-2xl">
            {pillarsSection?.eyebrow && (
              <p className="eyebrow text-gold">{pillarsSection.eyebrow}</p>
            )}
            {pillarsSection?.heading && (
              <h2 className="mt-5 text-3xl md:text-5xl text-foreground">
                {pillarsSection.heading}
              </h2>
            )}
          </div>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div key={`${p.title}-${i}`} className="border-t border-divider pt-6">
                <div className="font-display text-2xl text-gold leading-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-4 text-xl text-foreground">{p.title}</h3>
                {p.body && (
                  <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

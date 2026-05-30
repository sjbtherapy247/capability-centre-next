import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { getHomePage } from '@/lib/queries'
import { imageUrl } from '@/lib/sanity.image'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage()
  return {
    title: home?.seo?.metaTitle,
    description: home?.seo?.metaDescription,
  }
}

export default async function HomePage() {
  const home = await getHomePage()
  if (!home) {
    return <UnseededHomePage />
  }

  const heroSlides = home.heroSlides ?? []
  const servicesSection = home.servicesSection
  const services = servicesSection?.services ?? []
  const pillarsSection = home.pillarsSection
  const pillars = pillarsSection?.pillars ?? []
  const featured = home.testimonialsSection?.testimonials?.[0]
  const ctaSection = home.ctaSection

  return (
    <>
      <Hero slides={heroSlides} />

      {services.length > 0 && (
        <section id="services" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            {servicesSection?.eyebrow && (
              <p className="text-brand-teal font-semibold tracking-[0.2em] uppercase text-xs">
                {servicesSection.eyebrow}
              </p>
            )}
            {servicesSection?.heading && (
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-navy">
                {servicesSection.heading}
              </h2>
            )}
            {servicesSection?.body && (
              <p className="mt-4 text-slate-700 leading-relaxed">{servicesSection.body}</p>
            )}
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const url = imageUrl(s.image, { width: 700 })
              return (
                <Link
                  key={s._id}
                  href={`/services#${s.slug}`}
                  className="group block rounded-xl overflow-hidden border border-slate-200 bg-white hover:border-brand-teal hover:shadow-lg transition-all"
                >
                  {url && (
                    <div className="relative aspect-[16/9] bg-slate-100">
                      <Image
                        src={url}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-teal-dark">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {s.shortDescription}
                    </p>
                    <span className="mt-4 inline-block text-sm font-medium text-brand-teal group-hover:underline">
                      Learn more →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {pillars.length > 0 && (
        <section className="bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
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
                <div key={`${p.title}-${i}`} className="relative">
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

      {featured && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          {home.testimonialsSection?.eyebrow && (
            <p className="text-brand-teal font-semibold tracking-[0.2em] uppercase text-xs">
              {home.testimonialsSection.eyebrow}
            </p>
          )}
          <blockquote className="mt-6 text-xl md:text-2xl text-brand-navy leading-relaxed font-medium">
            <span className="text-brand-teal text-4xl leading-none align-top mr-1">“</span>
            {featured.quote}
            <span className="text-brand-teal text-4xl leading-none align-bottom ml-1">”</span>
          </blockquote>
          <footer className="mt-6 text-sm text-slate-600">
            <div className="font-semibold text-brand-navy">{featured.author}</div>
            <div>
              {[featured.role, featured.company].filter(Boolean).join(', ')}
            </div>
          </footer>
        </section>
      )}

      {ctaSection?.heading && (
        <section className="bg-brand-cream border-y border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">{ctaSection.heading}</h2>
            {ctaSection.body && (
              <p className="mt-4 text-lg text-slate-700">{ctaSection.body}</p>
            )}
            {ctaSection.ctaLabel && ctaSection.ctaHref && (
              <Link
                href={ctaSection.ctaHref}
                className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-gold hover:bg-brand-gold-light text-brand-navy text-base font-semibold px-6 py-3 transition-colors"
              >
                {ctaSection.ctaLabel}
              </Link>
            )}
          </div>
        </section>
      )}
    </>
  )
}

/** Shown when Sanity has no homePage document yet (pre-seed). */
function UnseededHomePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-4xl font-bold text-brand-navy">Site not yet seeded.</h1>
      <p className="mt-6 text-slate-700">
        The Sanity dataset is empty. Run{' '}
        <code className="rounded bg-slate-100 px-2 py-1 text-sm">npm run seed:sanity</code>{' '}
        to populate the site with the migration content.
      </p>
      <p className="mt-3 text-slate-500 text-sm">
        Or open the{' '}
        <Link href="/studio" className="text-brand-teal hover:underline">
          Sanity Studio
        </Link>{' '}
        and start editing.
      </p>
    </section>
  )
}

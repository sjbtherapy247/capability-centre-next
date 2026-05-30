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

  const servicesSection = home.servicesSection
  const services = servicesSection?.services ?? []
  const pillarsSection = home.pillarsSection
  const pillars = pillarsSection?.pillars ?? []
  const featured = home.testimonialsSection?.testimonials?.[0]
  const ctaSection = home.ctaSection

  return (
    <>
      {home.hero && <Hero hero={home.hero} />}

      {pillars.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
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

      {services.length > 0 && (
        <section id="services" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <hr className="gold-rule mb-20" />
          <div className="max-w-2xl">
            {servicesSection?.eyebrow && (
              <p className="eyebrow text-teal">{servicesSection.eyebrow}</p>
            )}
            {servicesSection?.heading && (
              <h2 className="mt-5 text-3xl md:text-5xl text-foreground">
                {servicesSection.heading}
              </h2>
            )}
            {servicesSection?.body && (
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {servicesSection.body}
              </p>
            )}
          </div>

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const url = imageUrl(s.image, { width: 800 })
              return (
                <Link
                  key={s._id}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col rounded-lg overflow-hidden bg-surface border border-divider shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {url && (
                    <div className="relative aspect-[5/3] bg-divider overflow-hidden">
                      <Image
                        src={url}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-7 flex-1 flex flex-col">
                    <h3 className="text-2xl text-foreground group-hover:text-teal-dark transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted flex-1">
                      {s.shortDescription}
                    </p>
                    <span className="mt-6 inline-flex items-center text-sm font-semibold text-teal">
                      Read more
                      <span aria-hidden className="ml-1.5 transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {featured && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <hr className="gold-rule mb-20" />
          {home.testimonialsSection?.eyebrow && (
            <p className="eyebrow text-teal text-center">
              {home.testimonialsSection.eyebrow}
            </p>
          )}
          <blockquote className="mt-8 font-display text-2xl md:text-3xl text-foreground text-center leading-snug">
            <span aria-hidden className="text-gold text-5xl leading-none align-top mr-1">
              “
            </span>
            {featured.quote}
            <span aria-hidden className="text-gold text-5xl leading-none align-bottom ml-1">
              ”
            </span>
          </blockquote>
          <footer className="mt-8 text-center">
            <div className="font-semibold text-foreground">{featured.author}</div>
            {(featured.role || featured.company) && (
              <div className="mt-1 text-sm text-muted">
                {[featured.role, featured.company].filter(Boolean).join(', ')}
              </div>
            )}
          </footer>
        </section>
      )}

      {ctaSection?.heading && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-24">
          <hr className="gold-rule mb-20" />
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl text-foreground">{ctaSection.heading}</h2>
            {ctaSection.body && (
              <p className="mt-6 text-lg leading-relaxed text-muted">{ctaSection.body}</p>
            )}
            {ctaSection.ctaLabel && ctaSection.ctaHref && (
              <Link
                href={ctaSection.ctaHref}
                className="mt-10 inline-flex items-center justify-center rounded-md bg-teal hover:bg-teal-dark text-white text-sm font-semibold px-7 py-3.5 transition-colors"
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

function UnseededHomePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-32 text-center">
      <p className="eyebrow text-teal">Capability Centre</p>
      <h1 className="mt-6 text-4xl md:text-5xl text-foreground">Site not yet seeded.</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        The Sanity dataset is empty. Run{' '}
        <code className="rounded bg-divider px-2 py-1 text-sm font-mono">npm run seed:sanity</code>{' '}
        to populate the site with the migration content.
      </p>
      <p className="mt-4 text-sm text-muted">
        Or open the{' '}
        <Link href="/studio" className="text-teal hover:underline underline-offset-4">
          Sanity Studio
        </Link>{' '}
        and start editing.
      </p>
    </section>
  )
}

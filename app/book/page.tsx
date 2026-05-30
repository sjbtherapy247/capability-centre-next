import type { Metadata } from 'next'
import { getPageBySlug, getSiteSettings } from '@/lib/queries'
import { PortableTextRenderer } from '@/components/PortableTextRenderer'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('book')
  return {
    title: page?.seo?.metaTitle || page?.title || 'Book a Call',
    description: page?.seo?.metaDescription,
  }
}

export default async function BookPage() {
  const [page, settings] = await Promise.all([
    getPageBySlug('book'),
    getSiteSettings(),
  ])

  const heroEyebrow = page?.hero?.eyebrow || 'Book a call'
  const heroHeading = page?.hero?.heading || 'Let’s talk.'
  const heroSubheading = page?.hero?.subheading

  const sidebar = page?.sidebar
  const email = settings?.contactEmail

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

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {sidebar && (sidebar.heading || (sidebar.items && sidebar.items.length > 0)) && (
            <aside className="md:col-span-1">
              {sidebar.heading && (
                <p className="eyebrow text-gold">{sidebar.heading}</p>
              )}
              {sidebar.items && sidebar.items.length > 0 && (
                <ul className="mt-5 space-y-3 text-foreground/90">
                  {sidebar.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="text-gold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          )}

          <div className={sidebar ? 'md:col-span-2' : 'md:col-span-3'}>
            <PortableTextRenderer value={page?.body} />
            <div
              className="mt-8 rounded-lg border border-dashed border-divider bg-surface p-12 text-center text-muted"
              aria-label="Cal.com booking embed placeholder"
            >
              <p className="font-display text-xl text-foreground">
                Cal.com embed mounts here.
              </p>
              <p className="mt-2 text-sm">
                Wire up once the Cal.com account &amp; event type are confirmed.
              </p>
            </div>
            {email && (
              <p className="mt-5 text-sm text-muted">
                In the meantime, email{' '}
                <a
                  className="text-teal hover:underline underline-offset-4"
                  href={`mailto:${email}`}
                >
                  {email}
                </a>{' '}
                and we&apos;ll get a time in the diary.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

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
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-brand-teal-light text-xs font-semibold tracking-[0.25em] uppercase">
            {heroEyebrow}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">{heroHeading}</h1>
          {heroSubheading && (
            <p className="mt-6 text-lg text-slate-300 leading-relaxed">{heroSubheading}</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {sidebar && (sidebar.heading || (sidebar.items && sidebar.items.length > 0)) && (
            <aside className="md:col-span-1">
              {sidebar.heading && (
                <h2 className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
                  {sidebar.heading}
                </h2>
              )}
              {sidebar.items && sidebar.items.length > 0 && (
                <ul className="mt-4 space-y-2 text-slate-700">
                  {sidebar.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              )}
            </aside>
          )}

          <div className={sidebar ? 'md:col-span-2' : 'md:col-span-3'}>
            <PortableTextRenderer value={page?.body} />
            <div
              className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500"
              aria-label="Cal.com booking embed placeholder"
            >
              <p className="text-brand-navy font-semibold">Cal.com embed mounts here.</p>
              <p className="mt-2 text-sm">
                Wire up once the Cal.com account & event type are confirmed.
              </p>
            </div>
            {email && (
              <p className="mt-4 text-sm text-slate-500">
                In the meantime, email{' '}
                <a className="text-brand-teal hover:underline" href={`mailto:${email}`}>
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

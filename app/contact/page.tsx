import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'
import { getPageBySlug, getSiteSettings } from '@/lib/queries'
import { PortableTextRenderer } from '@/components/PortableTextRenderer'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('contact')
  return {
    title: page?.seo?.metaTitle || page?.title || 'Contact',
    description: page?.seo?.metaDescription,
  }
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([
    getPageBySlug('contact'),
    getSiteSettings(),
  ])

  const heroEyebrow = page?.hero?.eyebrow || 'Contact'
  const heroHeading = page?.hero?.heading || 'Get in touch.'
  const heroSubheading = page?.hero?.subheading

  const title = settings?.title || 'Capability Centre'

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

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy">{title}</h2>
            <dl className="mt-6 space-y-4 text-sm">
              {settings?.contactEmail && (
                <div>
                  <dt className="font-semibold text-slate-500 uppercase tracking-wider text-xs">
                    Email
                  </dt>
                  <dd className="mt-1">
                    <a
                      className="text-brand-teal hover:underline"
                      href={`mailto:${settings.contactEmail}`}
                    >
                      {settings.contactEmail}
                    </a>
                  </dd>
                </div>
              )}
              {settings?.contactPhone && (
                <div>
                  <dt className="font-semibold text-slate-500 uppercase tracking-wider text-xs">
                    Phone
                  </dt>
                  <dd className="mt-1 text-slate-700">{settings.contactPhone}</dd>
                </div>
              )}
              {settings?.address && (
                <div>
                  <dt className="font-semibold text-slate-500 uppercase tracking-wider text-xs">
                    Office
                  </dt>
                  <dd className="mt-1 text-slate-700 whitespace-pre-line">{settings.address}</dd>
                </div>
              )}
              {settings?.officeHours && settings.officeHours.length > 0 && (
                <div>
                  <dt className="font-semibold text-slate-500 uppercase tracking-wider text-xs">
                    Hours
                  </dt>
                  <dd className="mt-1 text-slate-700 space-y-0.5">
                    {settings.officeHours.map((h, i) => (
                      <div key={i}>
                        {h.label}:{' '}
                        {h.closed
                          ? 'Closed'
                          : `${h.open ?? ''}${h.open && h.close ? ' – ' : ''}${h.close ?? ''}`}
                      </div>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
            <div className="mt-8">
              <PortableTextRenderer value={page?.body} />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  )
}

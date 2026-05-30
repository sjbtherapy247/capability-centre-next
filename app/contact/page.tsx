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
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="text-3xl text-foreground">{title}</h2>
            <dl className="mt-8 space-y-6">
              {settings?.contactEmail && (
                <div>
                  <dt className="eyebrow text-gold">Email</dt>
                  <dd className="mt-2">
                    <a
                      className="text-teal hover:underline underline-offset-4"
                      href={`mailto:${settings.contactEmail}`}
                    >
                      {settings.contactEmail}
                    </a>
                  </dd>
                </div>
              )}
              {settings?.contactPhone && (
                <div>
                  <dt className="eyebrow text-gold">Phone</dt>
                  <dd className="mt-2 text-foreground/90">{settings.contactPhone}</dd>
                </div>
              )}
              {settings?.address && (
                <div>
                  <dt className="eyebrow text-gold">Office</dt>
                  <dd className="mt-2 text-foreground/90 whitespace-pre-line">
                    {settings.address}
                  </dd>
                </div>
              )}
              {settings?.officeHours && settings.officeHours.length > 0 && (
                <div>
                  <dt className="eyebrow text-gold">Hours</dt>
                  <dd className="mt-2 text-foreground/90 space-y-1">
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
            <div className="mt-10">
              <PortableTextRenderer value={page?.body} />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  )
}

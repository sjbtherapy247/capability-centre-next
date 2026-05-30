import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  getAllServiceSlugs,
  getServiceBySlug,
  getSiteSettings,
} from '@/lib/queries'
import { imageUrl } from '@/lib/sanity.image'
import { PortableTextRenderer } from '@/components/PortableTextRenderer'

export const revalidate = 60

type Params = { slug: string }

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: 'Service Not Found' }
  return {
    title: service.seo?.metaTitle || service.title,
    description: service.seo?.metaDescription || service.shortDescription,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const [service, settings] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
  ])
  if (!service) notFound()

  const url = imageUrl(service.image, { width: 1400 })
  const ctaLabel = settings?.ctaLabel || 'Book a Call'
  const ctaHref = settings?.ctaHref || '/book'

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/services" className="text-sm text-brand-teal hover:underline">
        ← All Services
      </Link>
      <h1 className="mt-4 text-4xl md:text-5xl font-bold text-brand-navy">{service.title}</h1>
      <p className="mt-4 text-xl text-slate-700 leading-relaxed">{service.shortDescription}</p>
      {url && (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 mt-8">
          <Image src={url} alt="" fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
      )}
      {service.longDescription && (
        <p className="mt-8 text-lg text-slate-700 leading-relaxed">{service.longDescription}</p>
      )}
      <div className="mt-4">
        <PortableTextRenderer value={service.body} />
      </div>
      {service.outcomes && service.outcomes.length > 0 && (
        <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
            Outcomes
          </h2>
          <ul className="mt-3 space-y-2 text-slate-700">
            {service.outcomes.map((o) => (
              <li key={o}>• {o}</li>
            ))}
          </ul>
        </div>
      )}
      <Link
        href={ctaHref}
        className="mt-10 inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-base font-semibold px-6 py-3 transition-colors"
      >
        {ctaLabel}
      </Link>
    </article>
  )
}

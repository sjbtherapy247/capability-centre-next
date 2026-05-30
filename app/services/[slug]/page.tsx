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

  const url = imageUrl(service.image, { width: 1600 })
  const ctaLabel = settings?.ctaLabel || 'Book a Call'
  const ctaHref = settings?.ctaHref || '/book'

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
      <Link
        href="/services"
        className="inline-flex items-center text-sm font-medium text-teal hover:text-teal-dark transition-colors"
      >
        <span aria-hidden className="mr-1.5">←</span> All Services
      </Link>
      <h1 className="mt-6 text-4xl md:text-6xl text-foreground">{service.title}</h1>
      <p className="mt-6 text-xl leading-relaxed text-foreground/90">
        {service.shortDescription}
      </p>
      {url && (
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-divider mt-10">
          <Image
            src={url}
            alt=""
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )}
      {service.longDescription && (
        <p className="mt-10 text-lg leading-relaxed text-foreground/90">
          {service.longDescription}
        </p>
      )}
      <div className="mt-4">
        <PortableTextRenderer value={service.body} />
      </div>
      {service.outcomes && service.outcomes.length > 0 && (
        <div className="mt-12 border-t border-gold/40 pt-6">
          <p className="eyebrow text-gold">Outcomes</p>
          <ul className="mt-5 space-y-3 text-foreground/90">
            {service.outcomes.map((o) => (
              <li key={o} className="flex gap-3">
                <span aria-hidden className="text-gold">•</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link
        href={ctaHref}
        className="mt-14 inline-flex items-center justify-center rounded-md bg-teal hover:bg-teal-dark text-white text-sm font-semibold px-7 py-3.5 transition-colors"
      >
        {ctaLabel}
      </Link>
    </article>
  )
}

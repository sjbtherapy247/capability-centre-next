import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getService, services } from '@/lib/content'

type Params = { slug: string }

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return { title: 'Service Not Found' }
  return {
    title: service.title,
    description: service.short,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
      <Link href="/services" className="text-sm text-brand-teal hover:underline">
        ← All Services
      </Link>
      <h1 className="mt-4 text-4xl md:text-5xl font-bold text-brand-navy">{service.title}</h1>
      <p className="mt-4 text-xl text-slate-700 leading-relaxed">{service.short}</p>
      {service.image && (
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 mt-8">
          <Image src={service.image} alt="" fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
      )}
      <p className="mt-8 text-lg text-slate-700 leading-relaxed">{service.long}</p>
      <Link
        href="/book"
        className="mt-10 inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-base font-semibold px-6 py-3 transition-colors"
      >
        Book a Call
      </Link>
    </article>
  )
}

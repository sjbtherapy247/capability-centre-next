import type { Metadata } from 'next'
import Link from 'next/link'

type Params = { slug: string }

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `${slug.replace(/-/g, ' ')}`,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
      <Link href="/services" className="text-sm text-brand-teal hover:underline">
        ← All Services
      </Link>
      <h1 className="mt-4 text-4xl md:text-5xl font-bold text-brand-navy capitalize">
        {slug.replace(/-/g, ' ')}
      </h1>
      <p className="mt-6 text-lg text-slate-700 leading-relaxed">
        Placeholder service detail — content for <code className="text-brand-teal">{slug}</code> will
        come from Sanity once schemas are live.
      </p>
    </article>
  )
}

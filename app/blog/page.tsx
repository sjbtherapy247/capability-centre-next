import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on leadership, coaching and business capability.',
}

export default function BlogIndexPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
      <p className="text-brand-teal font-semibold tracking-wider uppercase text-sm">Blog</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-brand-navy">
        Insights & Articles
      </h1>
      <p className="mt-6 text-lg text-slate-700 leading-relaxed">
        Blog index placeholder — posts will be pulled from Sanity once the schemas
        are connected.
      </p>
    </article>
  )
}

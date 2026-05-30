import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet the Capability Centre — building capability in people, teams and organisations.',
}

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
      <p className="text-brand-teal font-semibold tracking-wider uppercase text-sm">About</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-brand-navy">
        Capability Centre
      </h1>
      <p className="mt-6 text-lg text-slate-700 leading-relaxed">
        Placeholder — content will be populated from the scrape of the existing
        capabilitycentre.com.au site.
      </p>
    </article>
  )
}

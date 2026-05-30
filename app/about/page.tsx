import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Louise — the executive coach, leadership facilitator and consultant behind Capability Centre.',
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-brand-teal-light text-xs font-semibold tracking-[0.25em] uppercase">
            About
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Meet Louise.
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Executive coach, leadership facilitator and consultant — building capability in people,
            teams and organisations.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 prose-lg">
        <p className="text-lg text-slate-700 leading-relaxed">
          Louise founded Capability Centre to do one thing well: build genuine capability in the
          people and teams she works with. Over many years across leadership, coaching, sales and
          transformation, she has worked alongside executives and front-line teams in the UK and
          Australia — from the NHS to professional services and high-growth businesses.
        </p>
        <p className="mt-6 text-lg text-slate-700 leading-relaxed">
          Her work blends rigorous methodology with genuine warmth. She believes the best
          performance unlocks when people are met where they are — and supported to grow into who
          they want to become.
        </p>

        <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
          <strong className="block text-brand-navy mb-1">Note for content team:</strong>
          This bio is a placeholder draft based on the scrape. Louise to review, expand and add
          credentials, photo, and any specific career milestones.
        </div>

        <div className="mt-12">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-base font-semibold px-6 py-3 transition-colors"
          >
            Book a Call
          </Link>
        </div>
      </article>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Executive coaching, leadership development, consulting and team development.',
}

const services = [
  { title: 'Leadership & Strategy', slug: 'leadership-strategy', desc: 'Sharpen vision, decision-making and execution at the top.' },
  { title: 'Executive Coaching', slug: 'executive-coaching', desc: 'One-to-one coaching for leaders ready to grow.' },
  { title: 'Business Consulting', slug: 'business-consulting', desc: 'Practical strategy and operating model work.' },
  { title: 'Team Development', slug: 'team-development', desc: 'High-performing teams, built deliberately.' },
  { title: 'Peak Performance', slug: 'peak-performance', desc: 'Sustainable performance for individuals and teams.' },
  { title: 'Sales & Negotiation', slug: 'sales-negotiation', desc: 'Win more, lose less, with structured skill.' },
]

export default function ServicesPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
      <p className="text-brand-teal font-semibold tracking-wider uppercase text-sm">Services</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-brand-navy">
        How we build capability.
      </h1>
      <p className="mt-6 text-lg text-slate-700 max-w-2xl leading-relaxed">
        Placeholder service overview — content will be populated from Sanity once
        the schema is hooked up.
      </p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="group block rounded-xl border border-slate-200 bg-white p-6 hover:border-brand-teal hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-teal-dark">
              {s.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </div>
    </article>
  )
}

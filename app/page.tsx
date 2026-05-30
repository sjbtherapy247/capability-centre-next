import Link from 'next/link'

const services = [
  { title: 'Leadership & Strategy', slug: 'leadership-strategy', desc: 'Sharpen vision, decision-making and execution at the top.' },
  { title: 'Executive Coaching', slug: 'executive-coaching', desc: 'One-to-one coaching for leaders ready to grow.' },
  { title: 'Business Consulting', slug: 'business-consulting', desc: 'Practical strategy and operating model work.' },
  { title: 'Team Development', slug: 'team-development', desc: 'High-performing teams, built deliberately.' },
  { title: 'Peak Performance', slug: 'peak-performance', desc: 'Sustainable performance for individuals and teams.' },
  { title: 'Sales & Negotiation', slug: 'sales-negotiation', desc: 'Win more, lose less, with structured skill.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-navy via-brand-navy-dark to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <p className="text-brand-teal-light text-sm font-semibold tracking-widest uppercase">
            Capability Centre
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl">
            Building capability in people, teams and organisations.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Executive coaching, leadership development and business consulting —
            designed to lift performance where it counts.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/book-a-call"
              className="inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-base font-semibold px-6 py-3 transition-colors"
            >
              Book a Call
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-md border border-slate-600 hover:border-brand-teal hover:text-brand-teal-light text-white text-base font-semibold px-6 py-3 transition-colors"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <p className="text-brand-teal font-semibold tracking-wider uppercase text-sm">What we do</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-navy">
            Services tailored to grow capability.
          </h2>
        </div>
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
              <span className="mt-4 inline-block text-sm font-medium text-brand-teal group-hover:underline">
                Learn more →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-cream border-y border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
            Ready to build capability that lasts?
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Book a no-obligation conversation and let&apos;s see if we&apos;re a fit.
          </p>
          <Link
            href="/book-a-call"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-gold hover:bg-brand-gold-light text-brand-navy text-base font-semibold px-6 py-3 transition-colors"
          >
            Book a Call
          </Link>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { services, pillars } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Leadership & strategy, executive coaching, business consulting, team development, peak performance, and sales & negotiation.',
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <p className="text-brand-teal-light text-xs font-semibold tracking-[0.25em] uppercase">
            Services
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white max-w-3xl">
            How we build capability — at every level.
          </h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl leading-relaxed">
            Six core practice areas. Tailored to your people, your context and the outcomes that
            matter most.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className={`grid gap-10 lg:grid-cols-2 items-center scroll-mt-24 ${i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
              {s.image && (
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <p className="text-brand-teal font-semibold tracking-[0.2em] uppercase text-xs">
                {String(i + 1).padStart(2, '0')} — Service
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-navy">{s.title}</h2>
              <p className="mt-4 text-lg text-slate-700 leading-relaxed">{s.short}</p>
              <p className="mt-4 text-slate-600 leading-relaxed">{s.long}</p>
              <Link
                href="/book"
                className="mt-6 inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-sm font-semibold px-5 py-2.5 transition-colors"
              >
                Discuss this with Louise →
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <p className="text-brand-gold font-semibold tracking-[0.2em] uppercase text-xs">
              How we work
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-navy">
              Four foundations under every engagement.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div key={p.title}>
                <div className="text-5xl font-bold text-brand-teal/20 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-brand-navy">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-700 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

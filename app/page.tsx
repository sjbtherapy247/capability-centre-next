import Link from 'next/link'
import Image from 'next/image'
import { Hero } from '@/components/Hero'
import { services, pillars, testimonials } from '@/lib/content'

export default function HomePage() {
  const featured = testimonials[0]

  return (
    <>
      <Hero />

      {/* Services */}
      <section id="services" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <p className="text-brand-teal font-semibold tracking-[0.2em] uppercase text-xs">
            What we do
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-navy">
            Services tailored to grow capability.
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Whatever your starting point, our work begins with understanding what you and your
            people need to thrive — then designing a path to get you there.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services#${s.slug}`}
              className="group block rounded-xl overflow-hidden border border-slate-200 bg-white hover:border-brand-teal hover:shadow-lg transition-all"
            >
              {s.image && (
                <div className="relative aspect-[16/9] bg-slate-100">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-brand-navy group-hover:text-brand-teal-dark">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.short}</p>
                <span className="mt-4 inline-block text-sm font-medium text-brand-teal group-hover:underline">
                  Learn more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <p className="text-brand-gold font-semibold tracking-[0.2em] uppercase text-xs">
              Why us
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-brand-navy">
              Built on four foundations.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <div key={p.title} className="relative">
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

      {/* Testimonial */}
      {featured && (
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-brand-teal font-semibold tracking-[0.2em] uppercase text-xs">
            What clients say
          </p>
          <blockquote className="mt-6 text-xl md:text-2xl text-brand-navy leading-relaxed font-medium">
            <span className="text-brand-teal text-4xl leading-none align-top mr-1">“</span>
            {featured.quote}
            <span className="text-brand-teal text-4xl leading-none align-bottom ml-1">”</span>
          </blockquote>
          <footer className="mt-6 text-sm text-slate-600">
            <div className="font-semibold text-brand-navy">{featured.author}</div>
            <div>
              {featured.role}, {featured.company}
            </div>
          </footer>
        </section>
      )}

      {/* CTA */}
      <section className="bg-brand-cream border-y border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">
            Ready to build capability that lasts?
          </h2>
          <p className="mt-4 text-lg text-slate-700">
            Book a no-obligation conversation with Louise and let&apos;s see if we&apos;re a fit.
          </p>
          <Link
            href="/book"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand-gold hover:bg-brand-gold-light text-brand-navy text-base font-semibold px-6 py-3 transition-colors"
          >
            Book a Call
          </Link>
        </div>
      </section>
    </>
  )
}

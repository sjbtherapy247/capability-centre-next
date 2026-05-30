import type { Metadata } from 'next'
import { ContactForm } from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Capability Centre.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-brand-teal-light text-xs font-semibold tracking-[0.25em] uppercase">
            Contact
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">Get in touch.</h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Have a question, a brief or a challenge you want a hand with? Send us a note.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy">Capability Centre</h2>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-500 uppercase tracking-wider text-xs">
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    className="text-brand-teal hover:underline"
                    href="mailto:hello@capabilitycentre.com.au"
                  >
                    hello@capabilitycentre.com.au
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500 uppercase tracking-wider text-xs">
                  Office
                </dt>
                <dd className="mt-1 text-slate-700">Sydney, Australia</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500 uppercase tracking-wider text-xs">
                  Hours
                </dt>
                <dd className="mt-1 text-slate-700">
                  Mon–Fri: 9am – 5pm
                  <br />
                  Sat–Sun: Closed
                </dd>
              </div>
            </dl>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  )
}

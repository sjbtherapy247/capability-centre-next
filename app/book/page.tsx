import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Call',
  description:
    'Book a call with Louise. She will help you understand how you can get to the next level in your career.',
}

export default function BookPage() {
  return (
    <>
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-brand-teal-light text-xs font-semibold tracking-[0.25em] uppercase">
            Book a call
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">
            Let&apos;s talk about where you&apos;re headed.
          </h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Are you looking to improve your sales technique or your leadership style so you can
            improve your pay-check or business&apos; bottom line? Book a call and tell Louise where
            you&apos;re currently at — she&apos;ll recommend what you need to get to the next level.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <aside className="md:col-span-1">
            <h2 className="text-sm font-semibold text-brand-gold uppercase tracking-wider">
              Common focus areas
            </h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>• Sales Training</li>
              <li>• FastTrack Leader™ Program</li>
              <li>• 1:1 Sales Coaching</li>
              <li>• Executive Coaching</li>
              <li>• Team Performance</li>
            </ul>
          </aside>

          <div className="md:col-span-2">
            <div
              className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500"
              aria-label="Cal.com booking embed placeholder"
            >
              <p className="text-brand-navy font-semibold">Cal.com embed mounts here.</p>
              <p className="mt-2 text-sm">
                Wire up once the Cal.com account & event type are confirmed.
              </p>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              In the meantime, email{' '}
              <a
                className="text-brand-teal hover:underline"
                href="mailto:hello@capabilitycentre.com.au"
              >
                hello@capabilitycentre.com.au
              </a>{' '}
              and we&apos;ll get a time in the diary.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

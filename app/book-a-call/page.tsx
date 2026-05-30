import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Call',
  description: 'Book a no-obligation conversation with Capability Centre.',
}

export default function BookACallPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
      <p className="text-brand-teal font-semibold tracking-wider uppercase text-sm">Book a call</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-brand-navy">
        Let&apos;s talk.
      </h1>
      <p className="mt-6 text-lg text-slate-700 leading-relaxed">
        Cal.com embed placeholder — will be wired up once the Cal.com account
        and event type are confirmed.
      </p>
      <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
        Cal.com inline embed mounts here.
      </div>
    </article>
  )
}

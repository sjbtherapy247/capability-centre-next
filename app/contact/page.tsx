import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Capability Centre.',
}

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
      <p className="text-brand-teal font-semibold tracking-wider uppercase text-sm">Contact</p>
      <h1 className="mt-3 text-4xl md:text-5xl font-bold text-brand-navy">
        Get in touch.
      </h1>
      <p className="mt-6 text-lg text-slate-700 leading-relaxed">
        Contact form placeholder — wires up to Resend once the API key is in place.
      </p>
      <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
        Contact form mounts here.
      </div>
    </article>
  )
}

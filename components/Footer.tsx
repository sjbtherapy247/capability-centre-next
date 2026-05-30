import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-brand-navy text-slate-300 mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-8 h-8 rounded-full bg-brand-teal" aria-hidden />
            <span className="font-semibold text-white text-lg">Capability Centre</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Executive coaching, leadership development and business consulting —
            building capability in people, teams and organisations.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-brand-teal-light">About</Link></li>
            <li><Link href="/services" className="hover:text-brand-teal-light">Services</Link></li>
            <li><Link href="/blog" className="hover:text-brand-teal-light">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-brand-teal-light">Contact</Link></li>
            <li><Link href="/book" className="hover:text-brand-teal-light">Book a Call</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Get in touch</h3>
          <p className="mt-4 text-sm text-slate-400">
            <a href="mailto:hello@capabilitycentre.com.au" className="hover:text-brand-teal-light">
              hello@capabilitycentre.com.au
            </a>
          </p>
          <p className="mt-2 text-sm text-slate-400">Sydney, Australia</p>
          <p className="mt-2 text-sm text-slate-400">Mon–Fri 9am–5pm</p>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} Capability Centre. All rights reserved.</p>
          <p>Built with Next.js + Sanity</p>
        </div>
      </div>
    </footer>
  )
}

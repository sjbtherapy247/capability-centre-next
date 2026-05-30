import Link from 'next/link'
import { getSiteSettings } from '@/lib/queries'

export async function Footer() {
  const settings = await getSiteSettings()
  const title = settings?.title || 'Capability Centre'
  const nav = settings?.navigation || []
  const ctaLabel = settings?.ctaLabel || 'Book a Call'
  const ctaHref = settings?.ctaHref || '/book'
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy text-slate-300 mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-8 h-8 rounded-full bg-brand-teal" aria-hidden />
            <span className="font-semibold text-white text-lg">{title}</span>
          </div>
          {settings?.footerTagline && (
            <p className="mt-4 text-sm leading-6 text-slate-400">{settings.footerTagline}</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-teal-light">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={ctaHref} className="hover:text-brand-teal-light">
                {ctaLabel}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Get in touch</h3>
          {settings?.contactEmail && (
            <p className="mt-4 text-sm text-slate-400">
              <a
                href={`mailto:${settings.contactEmail}`}
                className="hover:text-brand-teal-light"
              >
                {settings.contactEmail}
              </a>
            </p>
          )}
          {settings?.contactPhone && (
            <p className="mt-2 text-sm text-slate-400">{settings.contactPhone}</p>
          )}
          {settings?.address && (
            <p className="mt-2 text-sm text-slate-400 whitespace-pre-line">{settings.address}</p>
          )}
          {settings?.officeHours?.map((h, i) => (
            <p key={i} className="mt-1 text-sm text-slate-400">
              {h.label}: {h.closed ? 'Closed' : `${h.open ?? ''}${h.open && h.close ? ' – ' : ''}${h.close ?? ''}`}
            </p>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {year} {title}. All rights reserved.</p>
          <p>Built with Next.js + Sanity</p>
        </div>
      </div>
    </footer>
  )
}

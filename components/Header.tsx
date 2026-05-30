import Link from 'next/link'
import { getSiteSettings } from '@/lib/queries'

export async function Header() {
  const settings = await getSiteSettings()
  const title = settings?.title || 'Capability Centre'
  const nav = settings?.navigation || []
  const ctaLabel = settings?.ctaLabel || 'Book a Call'
  const ctaHref = settings?.ctaHref || '/book'

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label={`${title} — Home`}>
          <span
            className="inline-block w-8 h-8 rounded-full bg-brand-teal group-hover:bg-brand-teal-dark transition-colors"
            aria-hidden
          />
          <span className="font-semibold text-brand-navy text-lg tracking-tight">{title}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 hover:text-brand-teal transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={ctaHref}
            className="ml-2 inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            {ctaLabel}
          </Link>
        </nav>

        <Link
          href={ctaHref}
          className="md:hidden inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-sm font-semibold px-3 py-1.5 transition-colors"
        >
          {ctaLabel.split(' ')[0]}
        </Link>
      </div>
    </header>
  )
}

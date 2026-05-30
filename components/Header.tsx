import Link from 'next/link'
import { getSiteSettings } from '@/lib/queries'

export async function Header() {
  const settings = await getSiteSettings()
  const title = settings?.title || 'Capability Centre'
  const nav = settings?.navigation || []
  const ctaLabel = settings?.ctaLabel || 'Book a Call'
  const ctaHref = settings?.ctaHref || '/book'

  return (
    <header className="sticky top-0 z-40 w-full bg-background/85 backdrop-blur border-b border-divider">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-4">
        <Link
          href="/"
          className="flex items-baseline gap-2.5 group"
          aria-label={`${title} — Home`}
        >
          <span
            className="inline-block w-2.5 h-2.5 rounded-full bg-teal group-hover:bg-teal-dark transition-colors translate-y-[2px]"
            aria-hidden
          />
          <span className="font-display text-xl tracking-tight text-foreground">
            {title}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/85 hover:text-teal transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={ctaHref}
            className="ml-2 inline-flex items-center justify-center rounded-md bg-teal hover:bg-teal-dark text-white text-sm font-semibold px-5 py-2.5 transition-colors"
          >
            {ctaLabel}
          </Link>
        </nav>

        <Link
          href={ctaHref}
          className="md:hidden inline-flex items-center justify-center rounded-md bg-teal hover:bg-teal-dark text-white text-sm font-semibold px-3.5 py-2 transition-colors"
        >
          {ctaLabel.split(' ')[0]}
        </Link>
      </div>
    </header>
  )
}

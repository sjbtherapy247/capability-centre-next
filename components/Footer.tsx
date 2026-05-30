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
    <footer className="mt-32 border-t border-divider bg-background">
      <hr className="gold-rule mx-auto max-w-6xl" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <div className="flex items-baseline gap-2.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-teal translate-y-[2px]" aria-hidden />
            <span className="font-display text-xl text-foreground">{title}</span>
          </div>
          {settings?.footerTagline && (
            <p className="mt-5 text-sm leading-7 text-muted max-w-sm">
              {settings.footerTagline}
            </p>
          )}
        </div>

        <div>
          <h6 className="text-foreground/70">Explore</h6>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-foreground/85 hover:text-teal transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={ctaHref} className="text-foreground/85 hover:text-teal transition-colors">
                {ctaLabel}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h6 className="text-foreground/70">Get in touch</h6>
          {settings?.contactEmail && (
            <p className="mt-4 text-sm text-foreground/85">
              <a
                href={`mailto:${settings.contactEmail}`}
                className="hover:text-teal transition-colors"
              >
                {settings.contactEmail}
              </a>
            </p>
          )}
          {settings?.contactPhone && (
            <p className="mt-2 text-sm text-muted">{settings.contactPhone}</p>
          )}
          {settings?.address && (
            <p className="mt-2 text-sm text-muted whitespace-pre-line">{settings.address}</p>
          )}
          {settings?.officeHours?.map((h, i) => (
            <p key={i} className="mt-1 text-sm text-muted">
              {h.label}:{' '}
              {h.closed
                ? 'Closed'
                : `${h.open ?? ''}${h.open && h.close ? ' – ' : ''}${h.close ?? ''}`}
            </p>
          ))}
        </div>
      </div>

      <div className="border-t border-divider">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© {year} {title}. All rights reserved.</p>
          <p>Built with Next.js + Sanity</p>
        </div>
      </div>
    </footer>
  )
}

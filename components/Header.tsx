import Link from 'next/link'

const nav = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" aria-label="Capability Centre — Home">
          <span
            className="inline-block w-8 h-8 rounded-full bg-brand-teal group-hover:bg-brand-teal-dark transition-colors"
            aria-hidden
          />
          <span className="font-semibold text-brand-navy text-lg tracking-tight">
            Capability Centre
          </span>
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
            href="/book"
            className="ml-2 inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Book a Call
          </Link>
        </nav>

        {/* Mobile: simple book-a-call only (full mobile nav can come later) */}
        <Link
          href="/book"
          className="md:hidden inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-sm font-semibold px-3 py-1.5 transition-colors"
        >
          Book
        </Link>
      </div>
    </header>
  )
}

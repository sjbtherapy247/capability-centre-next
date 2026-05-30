import Image from 'next/image'
import Link from 'next/link'
import type { Hero as HeroData } from '@/lib/queries'
import { imageUrl } from '@/lib/sanity.image'

/**
 * Editorial hero — single statement, single primary CTA, optional secondary.
 * No carousel. Background image is optional; without one we lean on type.
 */
export function Hero({ hero }: { hero: HeroData }) {
  const url = imageUrl(hero.image, { width: 2400 })

  return (
    <section className="relative isolate overflow-hidden bg-background">
      {url && (
        <>
          <Image
            src={url}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.18] dark:opacity-[0.12]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
        </>
      )}

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-28 md:py-40">
        {hero.eyebrow && (
          <p className="eyebrow text-teal">{hero.eyebrow}</p>
        )}
        <h1 className="mt-6 text-5xl md:text-7xl text-foreground max-w-4xl">
          {hero.heading}
        </h1>
        {hero.body && (
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted leading-relaxed">
            {hero.body}
          </p>
        )}

        {(hero.ctaLabel || hero.secondaryCtaLabel) && (
          <div className="mt-12 flex flex-wrap items-center gap-5">
            {hero.ctaLabel && hero.ctaHref && (
              <Link
                href={hero.ctaHref}
                className="inline-flex items-center justify-center rounded-md bg-teal hover:bg-teal-dark text-white text-sm font-semibold tracking-wide px-7 py-3.5 transition-colors"
              >
                {hero.ctaLabel}
              </Link>
            )}
            {hero.secondaryCtaLabel && hero.secondaryCtaHref && (
              <Link
                href={hero.secondaryCtaHref}
                className="inline-flex items-center justify-center text-sm font-semibold tracking-wide text-foreground hover:text-teal transition-colors group"
              >
                {hero.secondaryCtaLabel}{' '}
                <span aria-hidden className="ml-1.5 transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { HeroSlide } from '@/lib/queries'
import { imageUrl } from '@/lib/sanity.image'

const ROTATE_MS = 6500

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [slides.length])

  if (slides.length === 0) return null

  return (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white">
      {slides.map((slide, i) => {
        const url = imageUrl(slide.image, { width: 2000 })
        return (
          <div
            key={`${slide.heading}-${i}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i !== index}
          >
            {url && (
              <Image
                src={url}
                alt=""
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/50" />
          </div>
        )
      })}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-28 md:py-40">
        {slides.map((slide, i) => (
          <div
            key={`text-${slide.heading}-${i}`}
            className={`transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 absolute inset-x-0 pointer-events-none'}`}
            aria-hidden={i !== index}
          >
            {slide.eyebrow && (
              <p className="text-brand-teal-light text-xs font-semibold tracking-[0.25em] uppercase">
                {slide.eyebrow}
              </p>
            )}
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl">
              {slide.heading}
            </h1>
            {slide.body && (
              <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed">
                {slide.body}
              </p>
            )}
          </div>
        ))}

        {slides.length > 1 && (
          <div className="mt-12 flex gap-2 relative">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-10 bg-brand-teal-light' : 'w-4 bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

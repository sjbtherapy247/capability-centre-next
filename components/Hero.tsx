'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { heroSlides } from '@/lib/content'

const ROTATE_MS = 6500

export function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative isolate overflow-hidden bg-brand-navy text-white">
      {/* slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.heading}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.image}
            alt=""
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/50" />
        </div>
      ))}

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-28 md:py-40">
        {heroSlides.map((slide, i) => (
          <div
            key={`text-${slide.heading}`}
            className={`transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0 absolute inset-x-0 pointer-events-none'}`}
            aria-hidden={i !== index}
          >
            <p className="text-brand-teal-light text-xs font-semibold tracking-[0.25em] uppercase">
              {slide.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-white max-w-3xl">
              {slide.heading}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed">
              {slide.body}
            </p>
          </div>
        ))}

        <div className="mt-10 flex flex-wrap gap-4 relative">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-base font-semibold px-6 py-3 transition-colors"
          >
            Book a Call
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-md border border-slate-400/60 hover:border-brand-teal hover:text-brand-teal-light text-white text-base font-semibold px-6 py-3 transition-colors"
          >
            Explore Services
          </Link>
        </div>

        {/* dots */}
        <div className="mt-12 flex gap-2 relative">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-10 bg-brand-teal-light' : 'w-4 bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

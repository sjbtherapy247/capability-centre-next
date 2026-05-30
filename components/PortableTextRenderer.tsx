import { PortableText, type PortableTextComponents } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'
import Image from 'next/image'
import { imageUrl, type SanityImage } from '@/lib/sanity.image'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-slate-700 leading-relaxed text-lg">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-3xl font-bold text-brand-navy">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-2xl font-bold text-brand-navy">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-brand-teal pl-5 italic text-slate-700">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-brand-navy">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = (value as { href?: string } | undefined)?.href || '#'
      const external = href.startsWith('http')
      return (
        <a
          href={href}
          className="text-brand-teal hover:underline"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc pl-6 space-y-2 text-lg text-slate-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal pl-6 space-y-2 text-lg text-slate-700">{children}</ol>
    ),
  },
  types: {
    image: ({ value }) => {
      const image = value as SanityImage
      const url = imageUrl(image, { width: 1600 })
      if (!url) return null
      return (
        <div className="my-8 relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
          <Image src={url} alt={image.alt || ''} fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" />
        </div>
      )
    },
  },
}

export function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null
  return <PortableText value={value} components={components} />
}

import { PortableText, type PortableTextComponents } from 'next-sanity'
import type { PortableTextBlock } from 'sanity'
import Image from 'next/image'
import { imageUrl, type SanityImage } from '@/lib/sanity.image'

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-6 text-lg leading-relaxed text-foreground/90">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-14 text-3xl md:text-4xl text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-2xl text-foreground">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-gold pl-6 italic text-foreground/85 font-display text-xl leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = (value as { href?: string } | undefined)?.href || '#'
      const external = href.startsWith('http')
      return (
        <a
          href={href}
          className="text-teal hover:underline underline-offset-4"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-6 list-disc pl-6 space-y-2 text-lg text-foreground/90">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-6 list-decimal pl-6 space-y-2 text-lg text-foreground/90">{children}</ol>
    ),
  },
  types: {
    image: ({ value }) => {
      const image = value as SanityImage
      const url = imageUrl(image, { width: 1600 })
      if (!url) return null
      return (
        <div className="my-10 relative aspect-[16/9] rounded-lg overflow-hidden bg-divider">
          <Image
            src={url}
            alt={image.alt || ''}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      )
    },
  },
}

export function PortableTextRenderer({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null
  return <PortableText value={value} components={components} />
}

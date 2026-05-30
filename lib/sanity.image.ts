import type { Image } from 'sanity'
import { urlFor } from './sanity'

export type SanityImage = Image & {
  alt?: string
  asset?: { _ref?: string; _type?: string }
}

/**
 * Resolve a Sanity image to a URL string, or undefined if no image present.
 * Width/height help next/image generate the right srcset.
 */
export function imageUrl(
  image: SanityImage | undefined | null,
  opts: { width?: number; height?: number; quality?: number } = {},
): string | undefined {
  if (!image?.asset) return undefined
  let builder = urlFor(image)
  if (opts.width) builder = builder.width(opts.width)
  if (opts.height) builder = builder.height(opts.height)
  builder = builder.quality(opts.quality ?? 80).auto('format').fit('max')
  return builder.url()
}

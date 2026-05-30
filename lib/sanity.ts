import { createClient, type SanityClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

type ImageUrlBuilder = ReturnType<ReturnType<typeof imageUrlBuilder>['image']>

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-10-01'

/**
 * Stub client used when Sanity isn't configured yet (e.g. before `sanity init`).
 * Lets `next build` succeed and lets pages render an "unseeded" state instead
 * of crashing.
 */
function makeStubClient(): SanityClient {
  const noop = async () => null
  return {
    fetch: noop,
    config: () => ({ projectId, dataset, apiVersion }),
  } as unknown as SanityClient
}

export const sanityClient: SanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      token: process.env.SANITY_API_TOKEN,
    })
  : makeStubClient()

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null

/** Stub image builder that returns an empty URL — used pre-Sanity-init. */
function makeStubBuilder(): ImageUrlBuilder {
  const stub: Record<string, unknown> = {}
  const chain = () => stub as unknown as ImageUrlBuilder
  const handler: ProxyHandler<Record<string, unknown>> = {
    get(target, prop) {
      if (prop === 'url' || prop === 'toString') return () => ''
      return chain
    },
  }
  return new Proxy(stub, handler) as unknown as ImageUrlBuilder
}

export function urlFor(source: Image): ImageUrlBuilder {
  if (!builder) return makeStubBuilder()
  return builder.image(source)
}

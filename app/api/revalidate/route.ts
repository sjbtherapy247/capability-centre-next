import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

/**
 * Sanity webhook target: instantly purge ISR cache when content publishes.
 *
 * Configure in https://www.sanity.io/manage → API → Webhooks:
 *   URL:      https://<domain>/api/revalidate
 *   Dataset:  production
 *   Trigger:  Create / Update / Delete
 *   HTTP Method: POST
 *   API version: v2024-10-01
 *   Secret: set the same value in `SANITY_REVALIDATE_SECRET` env var
 *   Projection:
 *     {
 *       "_type": _type,
 *       "slug": slug.current
 *     }
 */
export async function POST(req: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET

  // If a secret is configured, require it.
  if (secret) {
    const headerSecret =
      req.headers.get('sanity-webhook-signature') ||
      req.headers.get('x-webhook-secret') ||
      ''
    const url = new URL(req.url)
    const querySecret = url.searchParams.get('secret') || ''
    if (headerSecret !== secret && querySecret !== secret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  let body: { _type?: string; slug?: string } = {}
  try {
    body = await req.json()
  } catch {
    // empty body / not JSON — treat as a full purge
  }

  const revalidated: string[] = []

  // Site-wide on settings changes — layout/header/footer everywhere.
  if (!body._type || body._type === 'siteSettings') {
    revalidatePath('/', 'layout')
    revalidated.push('layout(/)')
  }

  if (!body._type || body._type === 'homePage') {
    revalidatePath('/')
    revalidated.push('/')
  }

  if (body._type === 'service') {
    revalidatePath('/services')
    revalidated.push('/services')
    if (body.slug) {
      revalidatePath(`/services/${body.slug}`)
      revalidated.push(`/services/${body.slug}`)
    }
    // Home also lists services
    revalidatePath('/')
    revalidated.push('/')
  }

  if (body._type === 'testimonial') {
    revalidatePath('/')
    revalidated.push('/')
  }

  if (body._type === 'blogPost') {
    revalidatePath('/blog')
    revalidated.push('/blog')
    if (body.slug) {
      revalidatePath(`/blog/${body.slug}`)
      revalidated.push(`/blog/${body.slug}`)
    }
  }

  if (body._type === 'page' && body.slug) {
    revalidatePath(`/${body.slug}`)
    revalidated.push(`/${body.slug}`)
  }

  return NextResponse.json({ revalidated, now: Date.now() })
}

/**
 * Sanity Studio route mounted at /cc-admin (basePath set in sanity.config.ts).
 *
 * Studio is a fully interactive SPA that uses React Context, IndexedDB,
 * and the Sanity API directly — must render only on the client.
 */
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Studio is dynamic by nature; nothing meaningful to prerender.
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}

/**
 * Sanity Studio route mounted at /cc-admin (basePath set in sanity.config.ts).
 * Renders only on the client; uses the root sanity.config.ts.
 */
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// Studio is a fully interactive SPA — nothing to prerender.
export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}

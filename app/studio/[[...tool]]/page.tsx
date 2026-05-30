/**
 * Sanity Studio route mounted at /studio
 * Renders only on the client; uses the root sanity.config.ts.
 */
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'

export default function StudioPage() {
  return <NextStudio config={config} />
}

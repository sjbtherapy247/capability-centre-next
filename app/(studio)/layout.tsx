/**
 * Studio root layout — completely separate from the marketing site layout.
 *
 * Sanity Studio:
 *   - needs to be a client SPA (its own router, theme, IndexedDB, etc.)
 *   - must NOT be wrapped in the site's Header/Footer or ThemeProvider —
 *     next-themes' `.dark` class on <html> fights Studio's internal theme
 *     management and clipped portals were hiding action buttons (publish)
 *
 * Route groups in Next.js App Router allow multiple root layouts so long
 * as each group defines its own <html>/<body>. There must be NO
 * `app/layout.tsx` at the root when using this pattern.
 *
 * See: https://nextjs.org/docs/app/building-your-application/routing/route-groups#creating-multiple-root-layouts
 */

// Sanity Studio re-exports its own <head> metadata (favicon, viewport,
// theme-color). They live on a Server Component layout because the page
// itself is `'use client'` and Next disallows metadata exports on client
// components.
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}

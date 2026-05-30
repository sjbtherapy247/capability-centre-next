// Sanity Studio bypasses the site Header/Footer — render children only.
// Studio provides its own <head> metadata (favicon, viewport, theme-color)
// via these re-exports. They live on the layout (a Server Component) because
// the page itself is `'use client'` and Next disallows metadata exports on
// client components.
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

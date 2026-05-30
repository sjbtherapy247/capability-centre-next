// Sanity Studio bypasses the site layout; render children only.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

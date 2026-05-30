// Sanity Studio bypasses the site Header/Footer — render children only.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

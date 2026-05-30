import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/queries'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://capabilitycentre.com.au'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null)
  const title = settings?.title || 'Capability Centre'
  const description =
    settings?.description ||
    'Executive coaching, leadership development and business consulting that builds capability in people, teams and organisations.'
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings?.tagline ? `${title} — ${settings.tagline}` : title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      url: siteUrl,
      siteName: title,
      title,
      description,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

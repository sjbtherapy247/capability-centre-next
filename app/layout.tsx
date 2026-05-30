import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/queries'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

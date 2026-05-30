import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getSiteSettings,
} from '@/lib/queries'
import { imageUrl } from '@/lib/sanity.image'
import { PortableTextRenderer } from '@/components/PortableTextRenderer'

export const revalidate = 60

type Params = { slug: string }

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author] : undefined,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const [post, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getSiteSettings(),
  ])
  if (!post) notFound()

  const ctaLabel = settings?.ctaLabel || 'Book a Call'
  const ctaHref = settings?.ctaHref || '/book'
  const cover = imageUrl(post.coverImage, { width: 1600 })

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="text-sm text-brand-teal hover:underline">
        ← All posts
      </Link>
      <header className="mt-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-teal">
          {formatDate(post.publishedAt)}
          {post.author ? ` · ${post.author}` : ''}
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-brand-navy leading-tight">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-5 text-xl text-slate-700 leading-relaxed">{post.excerpt}</p>
        )}
      </header>
      {cover && (
        <div className="mt-10 relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100">
          <Image src={cover} alt="" fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
        </div>
      )}
      <div className="mt-4">
        <PortableTextRenderer value={post.body} />
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <hr className="my-12 border-slate-200" />
      <div className="text-center">
        <p className="text-slate-700">Want to put insights like these to work in your team?</p>
        <Link
          href={ctaHref}
          className="mt-4 inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-base font-semibold px-6 py-3 transition-colors"
        >
          {ctaLabel}
        </Link>
      </div>
    </article>
  )
}

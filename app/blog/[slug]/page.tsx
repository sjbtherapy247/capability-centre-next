import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/lib/content'

type Params = { slug: string }

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
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

/** Inline-bold markdown: turn **text** into <strong>. */
function renderParagraph(p: string, key: number) {
  const parts = p.split(/(\*\*[^*]+\*\*)/g).filter(Boolean)
  return (
    <p key={key} className="mt-5 text-slate-700 leading-relaxed text-lg">
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="text-brand-navy">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  )
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/blog" className="text-sm text-brand-teal hover:underline">
        ← All posts
      </Link>
      <header className="mt-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-teal">
          {formatDate(post.publishedAt)} · {post.author}
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-brand-navy leading-tight">
          {post.title}
        </h1>
        <p className="mt-5 text-xl text-slate-700 leading-relaxed">{post.excerpt}</p>
      </header>
      <div className="mt-10">
        {post.body.map((para, i) => renderParagraph(para, i))}
      </div>
      {post.tags.length > 0 && (
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
          href="/book"
          className="mt-4 inline-flex items-center justify-center rounded-md bg-brand-teal hover:bg-brand-teal-dark text-white text-base font-semibold px-6 py-3 transition-colors"
        >
          Book a Call
        </Link>
      </div>
    </article>
  )
}

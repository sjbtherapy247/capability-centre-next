import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllBlogPosts, getPageBySlug } from '@/lib/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('blog')
  return {
    title: page?.seo?.metaTitle || page?.title || 'Blog',
    description: page?.seo?.metaDescription,
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogIndexPage() {
  const [posts, page] = await Promise.all([getAllBlogPosts(), getPageBySlug('blog')])

  const heroEyebrow = page?.hero?.eyebrow || 'Blog'
  const heroHeading = page?.hero?.heading || 'Insights & Articles.'
  const heroSubheading =
    page?.hero?.subheading ||
    'Thoughts on leadership, coaching, performance and the work of building capability.'

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <p className="eyebrow text-teal">{heroEyebrow}</p>
        <h1 className="mt-6 text-5xl md:text-7xl text-foreground">{heroHeading}</h1>
        <p className="mt-8 text-lg md:text-xl leading-relaxed text-muted max-w-2xl">
          {heroSubheading}
        </p>
      </section>

      <hr className="gold-rule mx-auto max-w-6xl" />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <p className="text-muted">No posts yet.</p>
        ) : (
          <ul className="divide-y divide-divider">
            {posts.map((post) => (
              <li key={post._id} className="py-10 first:pt-0 last:pb-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gold">
                    {formatDate(post.publishedAt)}
                    {post.author ? ` · ${post.author}` : ''}
                  </p>
                  <h2 className="mt-3 text-3xl md:text-4xl text-foreground group-hover:text-teal-dark transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-4 text-lg leading-relaxed text-muted">{post.excerpt}</p>
                  )}
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-teal">
                    Read article
                    <span aria-hidden className="ml-1.5 transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

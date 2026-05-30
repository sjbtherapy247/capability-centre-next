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
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-brand-teal-light text-xs font-semibold tracking-[0.25em] uppercase">
            {heroEyebrow}
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">{heroHeading}</h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">{heroSubheading}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <p className="text-slate-600">No posts yet.</p>
        ) : (
          <ul className="divide-y divide-slate-200">
            {posts.map((post) => (
              <li key={post._id} className="py-8">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-teal">
                    {formatDate(post.publishedAt)}
                    {post.author ? ` · ${post.author}` : ''}
                  </p>
                  <h2 className="mt-2 text-2xl md:text-3xl font-bold text-brand-navy group-hover:text-brand-teal-dark">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-3 text-slate-700 leading-relaxed">{post.excerpt}</p>
                  )}
                  <span className="mt-3 inline-block text-sm font-medium text-brand-teal group-hover:underline">
                    Read article →
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

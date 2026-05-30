import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on leadership, coaching and business capability.',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogIndexPage() {
  return (
    <>
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <p className="text-brand-teal-light text-xs font-semibold tracking-[0.25em] uppercase">
            Blog
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white">Insights & Articles.</h1>
          <p className="mt-6 text-lg text-slate-300 leading-relaxed">
            Thoughts on leadership, coaching, performance and the work of building capability.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <ul className="divide-y divide-slate-200">
          {blogPosts.map((post) => (
            <li key={post.slug} className="py-8">
              <Link href={`/blog/${post.slug}`} className="group block">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-brand-teal">
                  {formatDate(post.publishedAt)} · {post.author}
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-brand-navy group-hover:text-brand-teal-dark">
                  {post.title}
                </h2>
                <p className="mt-3 text-slate-700 leading-relaxed">{post.excerpt}</p>
                <span className="mt-3 inline-block text-sm font-medium text-brand-teal group-hover:underline">
                  Read article →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

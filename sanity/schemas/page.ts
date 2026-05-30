import { defineField, defineType } from 'sanity'

/**
 * Generic page (About, Book, Contact, etc.) — a singleton-style document
 * keyed by slug. Use `homePage` for the home page (richer schema).
 */
export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 },
        { name: 'ogImage', title: 'OG Image', type: 'image' },
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'subheading', title: 'Subheading', type: 'text', rows: 3 },
        { name: 'image', title: 'Background Image', type: 'image', options: { hotspot: true } },
        { name: 'ctaLabel', title: 'CTA Label', type: 'string' },
        { name: 'ctaHref', title: 'CTA Link', type: 'string' },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'sidebar',
      title: 'Sidebar (optional)',
      description:
        'Used on pages like Book a Call to list focus areas next to the embed.',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'items', title: 'Items', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({ title, subtitle: slug ? `/${slug}` : undefined }),
  },
})

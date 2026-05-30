import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  // Singleton.
  fields: [
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
      name: 'heroSlides',
      title: 'Hero Slides',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'heroSlide',
          fields: [
            { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            { name: 'body', title: 'Body', type: 'text', rows: 3 },
            {
              name: 'image',
              title: 'Background Image',
              type: 'image',
              options: { hotspot: true },
            },
          ],
          preview: {
            select: { title: 'heading', subtitle: 'eyebrow', media: 'image' },
          },
        },
      ],
    }),
    defineField({
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'What we do' },
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Body', type: 'text', rows: 3 },
        {
          name: 'services',
          title: 'Featured Services',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'service' }] }],
          description: 'Pick which services appear on the home page (in display order).',
        },
      ],
    }),
    defineField({
      name: 'pillarsSection',
      title: 'Why Us / Pillars',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Why us' },
        { name: 'heading', title: 'Heading', type: 'string' },
        {
          name: 'pillars',
          title: 'Pillars',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'pillar',
              fields: [
                { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
                { name: 'body', title: 'Body', type: 'text', rows: 3 },
              ],
              preview: { select: { title: 'title', subtitle: 'body' } },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', initialValue: 'What clients say' },
        {
          name: 'testimonials',
          title: 'Testimonials',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
        },
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'Closing CTA',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'body', title: 'Body', type: 'text', rows: 3 },
        { name: 'ctaLabel', title: 'CTA Label', type: 'string' },
        { name: 'ctaHref', title: 'CTA Link', type: 'string' },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
})

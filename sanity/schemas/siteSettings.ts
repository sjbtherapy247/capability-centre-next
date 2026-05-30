import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton — only one of these should exist.
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Capability Centre',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Site Description (SEO)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email (where website enquiries are sent)',
      type: 'string',
      description:
        'All enquiries from the website contact form will be delivered to this address.',
      validation: (Rule) =>
        Rule.required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { name: 'email' }),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Business Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'hours',
          fields: [
            {
              name: 'label',
              title: 'Day(s)',
              type: 'string',
              description: 'e.g. "Mon–Fri" or "Saturday"',
              validation: (Rule) => Rule.required(),
            },
            { name: 'open', title: 'Open', type: 'string', description: 'e.g. "9am"' },
            { name: 'close', title: 'Close', type: 'string', description: 'e.g. "5pm"' },
            { name: 'closed', title: 'Closed?', type: 'boolean', initialValue: false },
          ],
          preview: {
            select: { label: 'label', open: 'open', close: 'close', closed: 'closed' },
            prepare: ({ label, open, close, closed }) => ({
              title: label,
              subtitle: closed ? 'Closed' : `${open || '?'} – ${close || '?'}`,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'youtube', title: 'YouTube', type: 'url' },
      ],
    }),
    defineField({
      name: 'navigation',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'href', title: 'Link', type: 'string', validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Primary CTA Label',
      type: 'string',
      description: 'Button label used in the header and CTAs across the site (e.g. "Book a Call").',
      initialValue: 'Book a Call',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Primary CTA Link',
      type: 'string',
      initialValue: '/book',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({ title: title || 'Site Settings' }),
  },
})

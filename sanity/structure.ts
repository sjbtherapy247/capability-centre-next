import type { StructureResolver } from 'sanity/structure'

/**
 * Sanity Studio structure — locks `siteSettings` and `homePage` as singletons,
 * and groups the rest as normal document lists.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document().schemaType('siteSettings').documentId('siteSettings'),
        ),
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.divider(),
      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('blogPost').title('Blog Posts'),
    ])

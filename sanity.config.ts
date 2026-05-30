import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { structure } from './sanity/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8spe3j52'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'capability-centre',
  title: 'Capability Centre',
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Hide singletons from "new document" menu — only one of each should exist.
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => schemaType !== 'siteSettings' && schemaType !== 'homePage',
      ),
  },
  document: {
    // Disable delete/duplicate actions for singletons.
    actions: (input, context) => {
      if (context.schemaType === 'siteSettings' || context.schemaType === 'homePage') {
        return input.filter(
          ({ action }) => action !== 'duplicate' && action !== 'delete',
        )
      }
      return input
    },
  },
  basePath: '/cc-admin',
})

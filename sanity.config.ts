import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/lib/sanity/schema';
import { structure } from './src/lib/sanity/structure';
import { resolve } from './src/lib/sanity/presentation';

// Runs in both the browser (embedded Studio) and Node (Sanity CLI), so avoid bare `process`.
// A project ID is public, not a secret, so a default here is fine.
const nodeEnv = typeof process !== 'undefined' ? process.env : {};
const projectId = nodeEnv.PUBLIC_SANITY_PROJECT_ID || 'opdzk1nw';
const dataset = nodeEnv.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
	name: 'default',
	title: 'More Freedom Ahead',
	projectId,
	dataset,
	basePath: '/studio',
	plugins: [
		structureTool({ structure }),
		presentationTool({
			resolve,
			previewUrl: { previewMode: { enable: '/preview/enable' } }
		}),
		visionTool({ defaultApiVersion: '2026-05-15' })
	],
	schema: { types: schemaTypes },
	document: {
		// Singleton: only one Site settings document; keep Pages/Events creatable.
		actions: (input, context) =>
			context.schemaType === 'siteSettings'
				? input.filter(
						({ action }) => action && !['unpublish', 'delete', 'duplicate'].includes(action)
					)
				: input,
		newDocumentOptions: (prev, { creationContext }) =>
			creationContext.type === 'global' ? prev.filter((t) => t.templateId !== 'siteSettings') : prev
	}
});

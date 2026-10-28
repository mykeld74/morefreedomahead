import { defineField, defineType } from 'sanity';

export const seo = defineType({
	name: 'seo',
	title: 'Search & sharing',
	type: 'object',
	options: { collapsible: true, collapsed: true },
	fields: [
		defineField({
			name: 'title',
			title: 'Page title in search results',
			description: 'Leave blank to use the page title.',
			type: 'string',
			validation: (rule) => rule.max(70).warning('Under 70 characters displays best.')
		}),
		defineField({
			name: 'description',
			title: 'Description in search results',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.max(160).warning('Under 160 characters displays best.')
		}),
		defineField({
			name: 'image',
			title: 'Image when shared on social media',
			type: 'image'
		})
	]
});

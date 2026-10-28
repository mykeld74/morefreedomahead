import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons/Document';

export const page = defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	icon: DocumentIcon,
	fields: [
		defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
		defineField({
			name: 'slug',
			title: 'Web address',
			description:
				'The part after the site name, e.g. "about" becomes /about. Use "home" for the home page.',
			type: 'slug',
			options: { source: 'title', maxLength: 60 },
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'sections',
			title: 'Page sections',
			description: 'Add, reorder and edit sections to build the page.',
			type: 'pageBuilder'
		}),
		defineField({ name: 'seo', type: 'seo' })
	],
	preview: {
		select: { title: 'title', slug: 'slug.current' },
		prepare: ({ title, slug }) => ({
			title,
			subtitle: slug === 'home' ? '/ (home page)' : `/${slug}`
		})
	}
});

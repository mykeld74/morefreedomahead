import { defineArrayMember, defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';
import { hrefField } from '../objects/linkFields';

export const siteSettings = defineType({
	name: 'siteSettings',
	title: 'Site settings',
	type: 'document',
	icon: CogIcon,
	fields: [
		defineField({ name: 'siteName', type: 'string', initialValue: 'More Freedom Ahead' }),
		defineField({
			name: 'description',
			title: 'Site description',
			description: 'Used by search engines when a page has no description of its own.',
			type: 'text',
			rows: 3
		}),
		defineField({
			name: 'navigation',
			title: 'Menu links',
			description: 'The links in the top menu, in order.',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'navLink',
					fields: [
						defineField({ name: 'label', type: 'string', validation: (rule) => rule.required() }),
						hrefField('href', 'Link')
					],
					preview: { select: { title: 'label', subtitle: 'href' } }
				})
			]
		}),
		defineField({ name: 'footerTagline', type: 'string' }),
		defineField({
			name: 'contactEmail',
			title: 'Where form messages are sent',
			description: 'Contact, speaking and email sign-ups are emailed to this address.',
			type: 'string',
			validation: (rule) => rule.email()
		}),
		defineField({ name: 'defaultShareImage', title: 'Default social sharing image', type: 'image' })
	],
	preview: { prepare: () => ({ title: 'Site settings' }) }
});

import { defineArrayMember, defineField, defineType } from 'sanity';
import { validateHref } from './linkFields';

export const portableText = defineType({
	name: 'portableText',
	title: 'Rich text',
	type: 'array',
	of: [
		defineArrayMember({
			type: 'block',
			styles: [
				{ title: 'Paragraph', value: 'normal' },
				{ title: 'Heading', value: 'h2' },
				{ title: 'Subheading', value: 'h3' },
				{ title: 'Quote', value: 'blockquote' }
			],
			lists: [
				{ title: 'Bullets', value: 'bullet' },
				{ title: 'Numbers', value: 'number' }
			],
			marks: {
				decorators: [
					{ title: 'Bold', value: 'strong' },
					{ title: 'Italic', value: 'em' }
				],
				annotations: [
					defineArrayMember({
						name: 'link',
						title: 'Link',
						type: 'object',
						fields: [
							defineField({
								name: 'href',
								title: 'Link address',
								description:
									'A full web address (https://…), an email (mailto:…), or a page on this site (like /about).',
								type: 'string',
								validation: (rule) => validateHref(rule.required())
							})
						]
					})
				]
			}
		}),
		defineArrayMember({
			type: 'image',
			options: { hotspot: true },
			fields: [
				defineField({
					name: 'alt',
					title: 'Description of the image',
					description: 'Read aloud by screen readers and shown if the image fails to load.',
					type: 'string'
				})
			]
		})
	]
});

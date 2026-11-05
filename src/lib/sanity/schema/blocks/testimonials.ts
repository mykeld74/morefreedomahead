import { defineArrayMember, defineField, defineType } from 'sanity';
import { CommentIcon } from '@sanity/icons/Comment';
import { eyebrowField } from '../objects/eyebrow';
import { bandFields } from '../objects/band';

export const testimonials = defineType({
	name: 'testimonials',
	title: 'Testimonials',
	type: 'object',
	icon: CommentIcon,
	fields: [
		eyebrowField(),
		defineField({ name: 'heading', type: 'string' }),
		defineField({
			name: 'items',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'testimonial',
					fields: [
						defineField({
							name: 'quote',
							type: 'text',
							rows: 3,
							validation: (rule) => rule.required()
						}),
						defineField({ name: 'author', type: 'string' })
					],
					preview: { select: { title: 'author', subtitle: 'quote' } }
				})
			]
		}),
		...bandFields()
	],
	preview: {
		select: { title: 'heading' },
		prepare: ({ title }) => ({ title, subtitle: 'Testimonials', media: CommentIcon })
	}
});

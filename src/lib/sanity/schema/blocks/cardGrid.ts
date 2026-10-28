import { defineArrayMember, defineField, defineType } from 'sanity';
import { ThLargeIcon } from '@sanity/icons/ThLarge';
import { hrefField } from '../objects/linkFields';

export const cardGrid = defineType({
	name: 'cardGrid',
	title: 'Image cards',
	type: 'object',
	icon: ThLargeIcon,
	fields: [
		defineField({ name: 'heading', type: 'string' }),
		defineField({ name: 'intro', type: 'text', rows: 2 }),
		defineField({
			name: 'cards',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'card',
					fields: [
						defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
						defineField({ name: 'description', type: 'text', rows: 2 }),
						defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
						hrefField('href', 'Card link'),
						defineField({
							name: 'buttonLabel',
							title: 'Button text',
							type: 'string',
							initialValue: 'Learn more'
						})
					],
					preview: { select: { title: 'title', media: 'image', subtitle: 'description' } }
				})
			]
		})
	],
	preview: {
		select: { title: 'heading' },
		prepare: ({ title }) => ({ title, subtitle: 'Image cards', media: ThLargeIcon })
	}
});

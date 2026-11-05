import { defineArrayMember, defineField, defineType } from 'sanity';
import { ThLargeIcon } from '@sanity/icons/ThLarge';
import { hrefField } from '../objects/linkFields';
import { eyebrowField } from '../objects/eyebrow';

export const cardGrid = defineType({
	name: 'cardGrid',
	title: 'Image cards',
	type: 'object',
	icon: ThLargeIcon,
	fields: [
		eyebrowField(),
		defineField({ name: 'heading', type: 'string' }),
		defineField({ name: 'intro', type: 'text', rows: 2 }),
		defineField({
			name: 'layout',
			title: 'Look',
			type: 'string',
			options: {
				list: [
					{ title: 'Cards (picture, text, link)', value: 'cards' },
					{ title: 'Photo tiles (name on the photo)', value: 'tiles' }
				],
				layout: 'radio'
			},
			initialValue: 'cards'
		}),
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

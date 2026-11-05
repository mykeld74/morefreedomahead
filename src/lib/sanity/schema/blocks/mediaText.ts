import { defineField, defineType } from 'sanity';
import { SplitHorizontalIcon } from '@sanity/icons/SplitHorizontal';
import { hrefField } from '../objects/linkFields';
import { eyebrowField } from '../objects/eyebrow';

export const mediaText = defineType({
	name: 'mediaText',
	title: 'Image with text',
	type: 'object',
	icon: SplitHorizontalIcon,
	fields: [
		eyebrowField(),
		defineField({
			name: 'image',
			type: 'image',
			options: { hotspot: true },
			fields: [defineField({ name: 'alt', title: 'Description of the image', type: 'string' })],
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'imageSide',
			title: 'Image position',
			type: 'string',
			options: {
				list: [
					{ title: 'Image on the left', value: 'left' },
					{ title: 'Image on the right', value: 'right' }
				],
				layout: 'radio'
			},
			initialValue: 'left'
		}),
		defineField({ name: 'heading', type: 'string' }),
		defineField({ name: 'body', type: 'portableText' }),
		defineField({ name: 'buttonLabel', title: 'Button text', type: 'string' }),
		hrefField('buttonHref', 'Button link')
	],
	preview: {
		select: { title: 'heading', media: 'image' },
		prepare: ({ title, media }) => ({ title, subtitle: 'Image with text', media })
	}
});

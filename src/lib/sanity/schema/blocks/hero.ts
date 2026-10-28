import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons/Image';
import { hrefField } from '../objects/linkFields';

export const hero = defineType({
	name: 'hero',
	title: 'Big banner (hero)',
	type: 'object',
	icon: ImageIcon,
	fields: [
		defineField({ name: 'headline', type: 'string', validation: (rule) => rule.required() }),
		defineField({
			name: 'lines',
			title: 'Text under the headline',
			description: 'Each paragraph is its own entry.',
			type: 'array',
			of: [{ type: 'text', rows: 2 }]
		}),
		defineField({ name: 'ctaLabel', title: 'Button text', type: 'string' }),
		hrefField('ctaHref', 'Button link'),
		defineField({
			name: 'video',
			title: 'Background video',
			description:
				'Short, silent, looping video (MP4). Keep it under 10 MB. Leave empty to use the image or the default video.',
			type: 'file',
			options: { accept: 'video/mp4' }
		}),
		defineField({
			name: 'image',
			title: 'Background image',
			description: 'Used when there is no video.',
			type: 'image',
			options: { hotspot: true }
		})
	],
	preview: {
		select: { title: 'headline', media: 'image' },
		prepare: ({ title, media }) => ({ title, subtitle: 'Big banner', media: media ?? ImageIcon })
	}
});

import { defineField, defineType } from 'sanity';
import { HeartIcon } from '@sanity/icons/Heart';
import { hrefField } from '../objects/linkFields';

export const donateSection = defineType({
	name: 'donateSection',
	title: 'Donate',
	type: 'object',
	icon: HeartIcon,
	fields: [
		defineField({ name: 'heading', type: 'string' }),
		defineField({ name: 'body', type: 'portableText' }),
		defineField({
			name: 'buttonLabel',
			title: 'Button text',
			type: 'string',
			initialValue: 'Give securely'
		}),
		{
			...hrefField('buttonHref', 'Donation link'),
			description: 'Paste your Stripe Payment Link (or other donation page) here.'
		},
		defineField({
			name: 'curvedEdge',
			title: 'Curved bottom edge',
			description: 'Gives a colored background a softly curved bottom edge.',
			type: 'boolean',
			initialValue: false
		})
	],
	preview: {
		select: { title: 'heading' },
		prepare: ({ title }) => ({ title: title || 'Donate', subtitle: 'Donate', media: HeartIcon })
	}
});

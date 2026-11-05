import { defineField, defineType } from 'sanity';
import { ThLargeIcon } from '@sanity/icons/ThLarge';
import { hrefField } from '../objects/linkFields';
import { eyebrowField } from '../objects/eyebrow';

export const introSplit = defineType({
	name: 'introSplit',
	title: 'Text with highlight card',
	type: 'object',
	icon: ThLargeIcon,
	fields: [
		eyebrowField(),
		defineField({ name: 'heading', type: 'string' }),
		defineField({ name: 'body', type: 'portableText' }),
		defineField({
			name: 'cardText',
			title: 'Highlight card text',
			type: 'portableText'
		}),
		defineField({ name: 'cardButtonLabel', title: 'Card button text', type: 'string' }),
		hrefField('cardButtonHref', 'Card button link'),
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
		prepare: ({ title }) => ({ title, subtitle: 'Text with highlight card', media: ThLargeIcon })
	}
});

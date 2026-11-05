import { defineField, defineType } from 'sanity';
import { BlockContentIcon } from '@sanity/icons/BlockContent';
import { eyebrowField } from '../objects/eyebrow';

export const textSection = defineType({
	name: 'textSection',
	title: 'Text',
	type: 'object',
	icon: BlockContentIcon,
	fields: [
		eyebrowField(),
		defineField({ name: 'heading', type: 'string' }),
		defineField({ name: 'body', type: 'portableText' }),
		defineField({
			name: 'style',
			title: 'Look',
			type: 'string',
			options: {
				list: [
					{ title: 'Plain (simple centered column)', value: 'plain' },
					{ title: 'Soft tint band', value: 'soft' },
					{ title: 'Big centered statement', value: 'statement' },
					{ title: 'Dark band (white text)', value: 'dark' },
					{ title: 'Charcoal band (white text)', value: 'charcoal' },
					{ title: 'Split (heading left, text right)', value: 'split' }
				]
			},
			initialValue: 'plain'
		}),
		defineField({
			name: 'curvedEdge',
			title: 'Curved bottom edge',
			description: 'Gives a colored background a softly curved bottom edge.',
			type: 'boolean',
			initialValue: false
		})
	],
	preview: {
		select: { title: 'heading', body: 'body' },
		prepare: ({ title, body }) => ({
			title: title || body?.[0]?.children?.[0]?.text || 'Text',
			subtitle: 'Text',
			media: BlockContentIcon
		})
	}
});

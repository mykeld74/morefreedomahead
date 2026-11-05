import { defineField, defineType } from 'sanity';
import { BlockquoteIcon } from '@sanity/icons/Blockquote';
import { bandFields } from '../objects/band';

export const pullQuote = defineType({
	name: 'pullQuote',
	title: 'Big quote',
	type: 'object',
	icon: BlockquoteIcon,
	fields: [
		defineField({
			name: 'quote',
			type: 'text',
			rows: 3,
			validation: (rule) => rule.required()
		}),
		defineField({ name: 'attribution', type: 'string' }),
		...bandFields()
	],
	preview: {
		select: { title: 'quote', subtitle: 'attribution' },
		prepare: ({ title, subtitle }) => ({
			title,
			subtitle: subtitle ? `Big quote — ${subtitle}` : 'Big quote',
			media: BlockquoteIcon
		})
	}
});

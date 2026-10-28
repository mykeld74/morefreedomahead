import { defineField, defineType } from 'sanity';
import { BlockContentIcon } from '@sanity/icons/BlockContent';

export const textSection = defineType({
	name: 'textSection',
	title: 'Text',
	type: 'object',
	icon: BlockContentIcon,
	fields: [
		defineField({ name: 'heading', type: 'string' }),
		defineField({ name: 'body', type: 'portableText' }),
		defineField({
			name: 'style',
			title: 'Background',
			type: 'string',
			options: {
				list: [
					{ title: 'Plain', value: 'plain' },
					{ title: 'Soft tint', value: 'soft' }
				],
				layout: 'radio'
			},
			initialValue: 'plain'
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

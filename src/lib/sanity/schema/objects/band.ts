import { defineField } from 'sanity';

/** Optional full-width colored background (and curved edge) for a section. */
export const bandFields = () => [
	defineField({
		name: 'background',
		title: 'Background color',
		type: 'string',
		options: {
			list: [
				{ title: 'None (page color)', value: 'none' },
				{ title: 'Soft tint', value: 'soft' },
				{ title: 'Dark maroon (white text)', value: 'dark' },
				{ title: 'Charcoal (white text)', value: 'charcoal' }
			]
		},
		initialValue: 'none'
	}),
	defineField({
		name: 'curvedEdge',
		title: 'Curved bottom edge',
		description: 'Gives a colored background a softly curved bottom edge.',
		type: 'boolean',
		initialValue: false,
		hidden: ({ parent }) => !parent?.background || parent.background === 'none'
	})
];

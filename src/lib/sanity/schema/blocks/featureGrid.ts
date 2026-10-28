import { defineArrayMember, defineField, defineType } from 'sanity';
import { ThListIcon } from '@sanity/icons/ThList';

export const featureGrid = defineType({
	name: 'featureGrid',
	title: 'Columns of short points',
	type: 'object',
	icon: ThListIcon,
	fields: [
		defineField({ name: 'heading', type: 'string' }),
		defineField({
			name: 'items',
			title: 'Columns',
			type: 'array',
			validation: (rule) => rule.min(1).max(4),
			of: [
				defineArrayMember({
					type: 'object',
					name: 'featureItem',
					fields: [
						defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
						defineField({ name: 'body', type: 'text', rows: 3 })
					],
					preview: { select: { title: 'title', subtitle: 'body' } }
				})
			]
		})
	],
	preview: {
		select: { title: 'heading' },
		prepare: ({ title }) => ({ title, subtitle: 'Columns of short points', media: ThListIcon })
	}
});

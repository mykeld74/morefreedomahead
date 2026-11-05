import { defineArrayMember, defineField, defineType } from 'sanity';
import { HelpCircleIcon } from '@sanity/icons/HelpCircle';
import { eyebrowField } from '../objects/eyebrow';
import { bandFields } from '../objects/band';

export const faq = defineType({
	name: 'faq',
	title: 'FAQ (questions & answers)',
	type: 'object',
	icon: HelpCircleIcon,
	fields: [
		eyebrowField(),
		defineField({ name: 'heading', type: 'string', initialValue: 'Frequently asked questions' }),
		defineField({
			name: 'items',
			title: 'Questions',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'faqItem',
					fields: [
						defineField({
							name: 'question',
							type: 'string',
							validation: (rule) => rule.required()
						}),
						defineField({ name: 'answer', type: 'portableText' })
					],
					preview: { select: { title: 'question' } }
				})
			]
		}),
		...bandFields()
	],
	preview: {
		select: { title: 'heading' },
		prepare: ({ title }) => ({ title, subtitle: 'FAQ', media: HelpCircleIcon })
	}
});

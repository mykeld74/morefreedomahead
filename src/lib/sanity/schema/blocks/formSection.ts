import { defineField, defineType } from 'sanity';
import { EnvelopeIcon } from '@sanity/icons/Envelope';

export const formSection = defineType({
	name: 'formSection',
	title: 'Form',
	type: 'object',
	icon: EnvelopeIcon,
	fields: [
		defineField({
			name: 'formType',
			title: 'Which form?',
			type: 'string',
			options: {
				list: [
					{ title: 'Contact form', value: 'contact' },
					{ title: 'Speaking request form', value: 'speaking' },
					{ title: 'Email list sign-up', value: 'newsletter' }
				],
				layout: 'radio'
			},
			validation: (rule) => rule.required()
		}),
		defineField({ name: 'heading', type: 'string' }),
		defineField({ name: 'intro', type: 'text', rows: 2 }),
		defineField({
			name: 'successMessage',
			title: 'Message after sending',
			type: 'string',
			initialValue: 'Thank you! We will be in touch soon.'
		})
	],
	preview: {
		select: { title: 'heading', formType: 'formType' },
		prepare: ({ title, formType }) => ({
			title: title || 'Form',
			subtitle: `Form: ${formType ?? 'not chosen'}`,
			media: EnvelopeIcon
		})
	}
});

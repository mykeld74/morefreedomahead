import { defineField, defineType } from 'sanity';
import { LaunchIcon } from '@sanity/icons/Launch';
import { hrefField } from '../objects/linkFields';

export const callToAction = defineType({
	name: 'callToAction',
	title: 'Button / call to action',
	type: 'object',
	icon: LaunchIcon,
	fields: [
		defineField({ name: 'text', title: 'Text above the button', type: 'string' }),
		defineField({
			name: 'label',
			title: 'Button text',
			type: 'string',
			validation: (rule) => rule.required()
		}),
		hrefField('href', 'Button link')
	],
	preview: {
		select: { title: 'label', subtitle: 'text' },
		prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle || 'Button', media: LaunchIcon })
	}
});

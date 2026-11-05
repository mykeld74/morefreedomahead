import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons/Calendar';
import { eyebrowField } from '../objects/eyebrow';

export const eventsList = defineType({
	name: 'eventsList',
	title: 'Upcoming events',
	type: 'object',
	icon: CalendarIcon,
	fields: [
		eyebrowField(),
		defineField({ name: 'heading', type: 'string', initialValue: 'Upcoming Events' }),
		defineField({
			name: 'maxItems',
			title: 'How many to show',
			description: 'Leave empty to show all upcoming events.',
			type: 'number',
			validation: (rule) => rule.integer().min(1).max(24)
		}),
		defineField({
			name: 'emptyText',
			title: 'Message when there are no events',
			type: 'string',
			initialValue: 'Events are coming soon. Join the newsletter and be first to hear.'
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
		select: { title: 'heading' },
		prepare: ({ title }) => ({
			title,
			subtitle: 'Upcoming events (automatic)',
			media: CalendarIcon
		})
	}
});

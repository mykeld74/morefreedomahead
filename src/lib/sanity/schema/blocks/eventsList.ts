import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons/Calendar';

export const eventsList = defineType({
	name: 'eventsList',
	title: 'Upcoming events',
	type: 'object',
	icon: CalendarIcon,
	fields: [
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

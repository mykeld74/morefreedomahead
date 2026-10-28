import { defineArrayMember, defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons/Calendar';
import { hrefField } from '../objects/linkFields';

export const event = defineType({
	name: 'event',
	title: 'Event',
	type: 'document',
	icon: CalendarIcon,
	groups: [
		{ name: 'details', title: 'Details', default: true },
		{ name: 'registration', title: 'Registration' },
		{ name: 'seo', title: 'Search & sharing' }
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'details',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Web address',
			type: 'slug',
			group: 'details',
			options: { source: 'title', maxLength: 80 },
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'startAt',
			title: 'Starts',
			type: 'datetime',
			group: 'details',
			validation: (rule) => rule.required()
		}),
		defineField({
			name: 'endAt',
			title: 'Ends',
			type: 'datetime',
			group: 'details',
			validation: (rule) =>
				rule.custom((value, context) => {
					const start = (context.document as { startAt?: string } | undefined)?.startAt;
					return value && start && value < start ? 'The end must be after the start.' : true;
				})
		}),
		defineField({ name: 'location', type: 'string', group: 'details' }),
		defineField({ name: 'image', type: 'image', group: 'details', options: { hotspot: true } }),
		defineField({
			name: 'summary',
			title: 'Short summary',
			description: 'Shown on event cards and in search results.',
			type: 'text',
			rows: 3,
			group: 'details',
			validation: (rule) => rule.max(240)
		}),
		defineField({
			name: 'body',
			title: 'Full description',
			type: 'portableText',
			group: 'details'
		}),
		defineField({
			name: 'registrationMode',
			title: 'How do people sign up?',
			type: 'string',
			group: 'registration',
			options: {
				list: [
					{ title: 'Pay/register on this site (Stripe)', value: 'stripe' },
					{ title: 'Link to another site', value: 'external' },
					{ title: 'No registration', value: 'none' }
				],
				layout: 'radio'
			},
			initialValue: 'stripe'
		}),
		defineField({
			name: 'registrationClosed',
			title: 'Registration is closed / sold out',
			type: 'boolean',
			group: 'registration',
			initialValue: false
		}),
		defineField({
			name: 'tickets',
			title: 'Ticket options',
			description: 'Set the price to 0 for a free option.',
			type: 'array',
			group: 'registration',
			hidden: ({ document }) => document?.registrationMode !== 'stripe',
			validation: (rule) =>
				rule
					.custom((value, context) =>
						(context.document as { registrationMode?: string } | undefined)?.registrationMode ===
							'stripe' && !value?.length
							? 'Add at least one ticket option, or visitors will see "registration isn’t open yet".'
							: true
					)
					.warning(),
			of: [
				defineArrayMember({
					type: 'object',
					name: 'ticket',
					fields: [
						defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
						defineField({ name: 'description', type: 'string' }),
						defineField({
							name: 'price',
							title: 'Price (USD)',
							type: 'number',
							validation: (rule) => rule.required().min(0)
						})
					],
					preview: {
						select: { title: 'name', price: 'price' },
						prepare: ({ title, price }) => ({
							title,
							subtitle: price ? `$${price}` : 'Free'
						})
					}
				})
			]
		}),
		{
			...hrefField('externalUrl', 'Registration link'),
			group: 'registration',
			hidden: ({ document }) =>
				(document as { registrationMode?: string } | undefined)?.registrationMode !== 'external'
		},
		defineField({ name: 'seo', type: 'seo', group: 'seo' })
	],
	orderings: [
		{
			title: 'Date, newest first',
			name: 'startDesc',
			by: [{ field: 'startAt', direction: 'desc' }]
		},
		{ title: 'Date, oldest first', name: 'startAsc', by: [{ field: 'startAt', direction: 'asc' }] }
	],
	preview: {
		select: { title: 'title', startAt: 'startAt', media: 'image' },
		prepare: ({ title, startAt, media }) => ({
			title,
			subtitle: startAt
				? new Date(startAt).toLocaleDateString('en-US', { dateStyle: 'medium' })
				: 'No date yet',
			media
		})
	}
});

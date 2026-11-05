import { defineField } from 'sanity';

/** A tiny, widely spaced label shown above a section's heading (like "BOOKS + STUDIES"). */
export const eyebrowField = () =>
	defineField({
		name: 'eyebrow',
		title: 'Small label above the heading',
		description: 'Optional. A few words in small capital letters, like "Meet Taryn".',
		type: 'string'
	});

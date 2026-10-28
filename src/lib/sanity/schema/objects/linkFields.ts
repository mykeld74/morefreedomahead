import { defineField, type StringRule } from 'sanity';

const allowed = /^(\/[^\s]*|https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+)$/;

/** Accepts an on-site path (/events), a full URL, mailto: or tel:. */
export const validateHref = (rule: StringRule) =>
	rule.custom((value) =>
		!value || allowed.test(value)
			? true
			: 'Use a page like /events, a full address starting with https://, or mailto:you@example.com.'
	);

/** A text field that holds either an on-site path (/events) or a full URL. */
export const hrefField = (name = 'href', title = 'Link address') =>
	defineField({
		name,
		title,
		description: 'A page on this site (like /events) or a full web address (https://…).',
		type: 'string',
		validation: validateHref
	});

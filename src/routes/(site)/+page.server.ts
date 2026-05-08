import type { PageServerLoad } from './$types';
import { getSitePage } from '$lib/content/siteContent';
import { listTestimonials } from '$lib/server/content';
import { listPublishedEvents } from '$lib/server/events';

export const load: PageServerLoad = async () => {
	const page = getSitePage('home');
	return {
		page,
		testimonials: await listTestimonials('home'),
		events: await listPublishedEvents()
	};
};

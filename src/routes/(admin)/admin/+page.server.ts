import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { event, formSubmission, pageContent } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	const [pages, events, submissions] = await Promise.all([
		db.select().from(pageContent),
		db.select().from(event),
		db.select().from(formSubmission)
	]);
	return {
		counts: {
			pages: pages.length,
			events: events.length,
			submissions: submissions.length
		}
	};
};

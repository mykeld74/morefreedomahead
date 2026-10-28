import { pastEventsQuery, upcomingEventsQuery } from '$lib/sanity/queries';
import type { EventSummary } from '$lib/sanity/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { loadQuery } = locals.sanity;
	const [upcoming, past] = await Promise.all([
		loadQuery<EventSummary[]>(upcomingEventsQuery),
		loadQuery<EventSummary[]>(pastEventsQuery)
	]);
	return {
		upcomingQuery: upcomingEventsQuery,
		upcomingOptions: { initial: upcoming },
		pastQuery: pastEventsQuery,
		pastOptions: { initial: past }
	};
};

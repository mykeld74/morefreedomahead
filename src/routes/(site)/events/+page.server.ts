import type { PageServerLoad } from './$types';
import { listPublishedEvents } from '$lib/server/events';

export const load: PageServerLoad = async () => {
	return {
		events: await listPublishedEvents()
	};
};

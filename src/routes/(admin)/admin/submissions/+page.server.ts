import type { PageServerLoad } from './$types';
import { desc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { formSubmission } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	return {
		submissions: await db.select().from(formSubmission).orderBy(desc(formSubmission.createdAt))
	};
};

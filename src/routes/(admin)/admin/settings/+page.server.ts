import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { adminUser } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	return {
		adminUsers: await db.select().from(adminUser).orderBy(asc(adminUser.email))
	};
};

export const actions: Actions = {
	addAdmin: async ({ request }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '')
			.trim()
			.toLowerCase();
		if (!email) return fail(400, { error: 'Admin email is required.' });
		await db.insert(adminUser).values({ email }).onConflictDoNothing();
		return { success: true };
	}
};

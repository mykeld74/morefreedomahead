import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { getSitePage } from '$lib/content/siteContent';
import { db } from '$lib/server/db';
import { formSubmission } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => {
	return { page: getSitePage('speaking') };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = String(formData.get('name') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const message = String(formData.get('message') ?? '').trim();
		if (!email || !message) {
			return fail(400, { error: 'Email and event details are required.' });
		}
		await db.insert(formSubmission).values({
			type: 'speaking',
			name,
			email,
			message,
			payload: {
				organization: String(formData.get('organization') ?? '').trim(),
				eventDate: String(formData.get('eventDate') ?? '').trim(),
				location: String(formData.get('location') ?? '').trim()
			}
		});
		return { success: true };
	}
};

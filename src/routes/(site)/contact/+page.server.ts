import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { loadStaticPage } from '$lib/server/pageLoaders';
import { db } from '$lib/server/db';
import { formSubmission } from '$lib/server/db/schema';

export const load: PageServerLoad = async () => loadStaticPage('contact');

export const actions: Actions = {
	contact: async ({ request }) => {
		const formData = await request.formData();
		const name = String(formData.get('name') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const message = String(formData.get('message') ?? '').trim();
		if (!email || !message) return fail(400, { contactError: 'Email and message are required.' });
		await db.insert(formSubmission).values({
			type: 'contact',
			name,
			email,
			message,
			payload: {}
		});
		return { contactSuccess: true };
	},
	newsletter: async ({ request }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim();
		if (!email) return fail(400, { newsletterError: 'Email is required.' });
		await db.insert(formSubmission).values({
			type: 'newsletter',
			email,
			payload: {}
		});
		return { newsletterSuccess: true };
	}
};

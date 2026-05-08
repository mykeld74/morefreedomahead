import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import {
	confirmRegistrationForAdmin,
	deleteRegistrationForAdmin,
	listRegistrationsForAdmin,
	updateRegistrationForAdmin
} from '$lib/server/events';

export const load: PageServerLoad = async () => {
	return {
		registrations: await listRegistrationsForAdmin()
	};
};

export const actions: Actions = {
	confirm: async ({ request }) => {
		const formData = await request.formData();
		const registrationId = Number(formData.get('registrationId') ?? 0);
		if (!registrationId) return fail(400, { error: 'Invalid registration id.' });
		await confirmRegistrationForAdmin(registrationId);
		return { success: true };
	},
	update: async ({ request }) => {
		const formData = await request.formData();
		const registrationId = Number(formData.get('registrationId') ?? 0);
		const name = String(formData.get('name') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const quantity = Number(formData.get('quantity') ?? 1);
		const priceDollars = Number(formData.get('priceDollars') ?? 0);
		const priceCents = Number.isFinite(priceDollars) ? Math.round(priceDollars * 100) : NaN;
		const registrationStatusValue = String(formData.get('registrationStatus') ?? 'pending');
		const paymentStatusValue = String(formData.get('paymentStatus') ?? 'pending');

		const allowedRegistrationStatuses = new Set(['pending', 'confirmed', 'cancelled', 'checked_in']);
		const allowedPaymentStatuses = new Set(['pending', 'paid', 'failed', 'refunded']);

		if (
			!registrationId ||
			!name ||
			!email ||
			!Number.isFinite(quantity) ||
			quantity < 1 ||
			!Number.isFinite(priceCents) ||
			priceCents < 0
		) {
			return fail(400, { error: 'Please provide valid registration details.' });
		}

		if (
			!allowedRegistrationStatuses.has(registrationStatusValue) ||
			!allowedPaymentStatuses.has(paymentStatusValue)
		) {
			return fail(400, { error: 'Invalid registration or payment status.' });
		}

		await updateRegistrationForAdmin({
			registrationId,
			name,
			email,
			quantity: Math.round(quantity),
			registrationStatus: registrationStatusValue as 'pending' | 'confirmed' | 'cancelled' | 'checked_in',
			paymentStatus: paymentStatusValue as 'pending' | 'paid' | 'failed' | 'refunded',
			priceCents,
			currency: 'usd'
		});
		return { success: true };
	},
	delete: async ({ request }) => {
		const formData = await request.formData();
		const registrationId = Number(formData.get('registrationId') ?? 0);
		if (!registrationId) return fail(400, { error: 'Invalid registration id.' });
		await deleteRegistrationForAdmin(registrationId);
		return { success: true };
	}
};

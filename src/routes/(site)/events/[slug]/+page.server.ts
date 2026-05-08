import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { paymentProvider } from '$lib/server/payments/provider';
import {
	createPaymentRecord,
	createRegistration,
	getEventBySlug,
	getTicketById,
	listEventTickets
} from '$lib/server/events';

export const load: PageServerLoad = async ({ params }) => {
	const event = await getEventBySlug(params.slug);
	if (!event || event.status !== 'published') {
		throw error(404, 'Event not found');
	}
	const tickets = await listEventTickets(event.id);
	return { event, tickets };
};

export const actions: Actions = {
	register: async ({ params, request, url }) => {
		const event = await getEventBySlug(params.slug);
		if (!event) throw error(404, 'Event not found');

		const formData = await request.formData();
		const name = String(formData.get('name') ?? '').trim();
		const email = String(formData.get('email') ?? '').trim();
		const phone = String(formData.get('phone') ?? '').trim();
		const ticketId = Number(formData.get('ticketId') ?? 0);
		const quantity = Number(formData.get('quantity') ?? 1);

		if (!name || !email || !ticketId || quantity < 1) {
			return fail(400, { error: 'Please complete all required registration fields.' });
		}

		const ticket = await getTicketById(ticketId);
		if (!ticket || ticket.eventId !== event.id) {
			return fail(400, { error: 'Selected ticket is invalid.' });
		}

		const registrationId = await createRegistration({
			eventId: event.id,
			ticketId,
			name,
			email,
			phone,
			quantity
		});

		if (!registrationId) {
			return fail(500, { error: 'Unable to create registration. Please try again.' });
		}

		const amountCents = ticket.priceCents * quantity;
		if (amountCents <= 0) {
			await createPaymentRecord({
				registrationId,
				amountCents: 0,
				currency: ticket.currency,
				status: 'paid'
			});
			throw redirect(303, `/events/success?registrationId=${registrationId}`);
		}

		const checkout = await paymentProvider.createCheckout({
			eventTitle: `${event.title} - ${ticket.name}`,
			amountCents,
			currency: ticket.currency,
			successUrl: `${url.origin}/events/success?session_id={CHECKOUT_SESSION_ID}`,
			cancelUrl: `${url.origin}/events/${event.slug}`,
			customerEmail: email,
			metadata: {
				eventId: String(event.id),
				registrationId: String(registrationId)
			}
		});

		await createPaymentRecord({
			registrationId,
			amountCents,
			currency: ticket.currency,
			checkoutSessionId: checkout.checkoutSessionId,
			status: 'pending'
		});
		const checkoutUrl =
			checkout.checkoutUrl.startsWith('/')
				? `${checkout.checkoutUrl}&registrationId=${registrationId}`
				: checkout.checkoutUrl;
		throw redirect(303, checkoutUrl);
	}
};

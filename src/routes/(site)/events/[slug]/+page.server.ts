import { error, fail, redirect } from '@sveltejs/kit';
import { eventQuery, eventTicketQuery } from '$lib/sanity/queries';
import { serverClient } from '$lib/sanity/client.server';
import { formatPrice } from '$lib/sanity/format';
import { notifyOwner } from '$lib/server/email';
import { createEventCheckout, stripeConfigured } from '$lib/server/stripe';
import type { EventDoc } from '$lib/sanity/types';
import type { Actions, PageServerLoad } from './$types';

const trusted = serverClient.withConfig({ stega: false, perspective: 'published' });

export const load: PageServerLoad = async ({ locals, params }) => {
	const { slug } = params;
	const initial = await locals.sanity.loadQuery<EventDoc | null>(eventQuery, { slug });
	if (!initial.data) error(404, 'Event not found');
	return { query: eventQuery, params: { slug }, options: { initial } };
};

export const actions: Actions = {
	register: async ({ params, request, url }) => {
		const data = await request.formData();
		const name = String(data.get('name') ?? '')
			.trim()
			.slice(0, 160);
		const email = String(data.get('email') ?? '')
			.trim()
			.slice(0, 320);
		const phone = String(data.get('phone') ?? '')
			.trim()
			.slice(0, 40);
		const ticketKey = String(data.get('ticketKey') ?? '');
		const quantity = Math.min(10, Math.max(1, Math.floor(Number(data.get('quantity') ?? 1)) || 1));

		if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !ticketKey) {
			return fail(400, { error: 'Please enter your name, a valid email, and choose a ticket.' });
		}

		// Always price from Sanity, never from the submitted form.
		const event = await trusted.fetch<{
			_id: string;
			title: string;
			slug: string;
			startAt: string;
			registrationMode?: string;
			registrationClosed?: boolean;
			ticket?: { _key: string; name: string; price: number };
		} | null>(eventTicketQuery, { slug: params.slug, ticketKey });

		if (!event) error(404, 'Event not found');
		if (event.registrationMode !== 'stripe' || event.registrationClosed || !event.ticket) {
			return fail(400, { error: 'Registration is not available for this event.' });
		}

		const { ticket } = event;
		const total = ticket.price * quantity;

		if (total <= 0) {
			const sent = await notifyOwner({
				subject: `New registration: ${event.title}`,
				replyTo: email,
				text: [
					`Event: ${event.title}`,
					`Ticket: ${ticket.name} × ${quantity} (free)`,
					`Name: ${name}`,
					`Email: ${email}`,
					`Phone: ${phone || '—'}`
				].join('\n')
			});
			if (!sent)
				return fail(500, {
					error: 'Sorry, we could not complete your registration. Please try again later.'
				});
			redirect(303, '/events/success?free=1');
		}

		if (!stripeConfigured()) {
			return fail(503, {
				error: 'Online payment is not available yet. Please contact us to register.'
			});
		}

		let checkoutUrl: string | null;
		try {
			const session = await createEventCheckout({
				eventTitle: event.title,
				ticketName: `${ticket.name} (${formatPrice(ticket.price)})`,
				priceDollars: ticket.price,
				quantity,
				customerEmail: email,
				successUrl: `${url.origin}/events/success?session_id={CHECKOUT_SESSION_ID}`,
				cancelUrl: `${url.origin}/events/${event.slug}`,
				metadata: {
					eventId: event._id,
					eventTitle: event.title,
					ticket: ticket.name,
					quantity: String(quantity),
					attendeeName: name,
					attendeePhone: phone
				}
			});
			checkoutUrl = session.url;
		} catch (err) {
			console.error('Stripe checkout failed', err);
			return fail(502, { error: 'We could not start the payment. Please try again.' });
		}
		if (!checkoutUrl)
			return fail(502, { error: 'We could not start the payment. Please try again.' });
		redirect(303, checkoutUrl);
	}
};

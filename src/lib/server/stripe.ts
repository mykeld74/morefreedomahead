import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

let client: Stripe | null = null;

export function stripeConfigured() {
	return Boolean(env.STRIPE_SECRET_KEY);
}

export function getStripe() {
	if (!env.STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not set');
	// Workers have no Node http module, so use the fetch-based client.
	client ??= new Stripe(env.STRIPE_SECRET_KEY, { httpClient: Stripe.createFetchHttpClient() });
	return client;
}

export function createEventCheckout(input: {
	eventTitle: string;
	ticketName: string;
	priceDollars: number;
	quantity: number;
	customerEmail: string;
	successUrl: string;
	cancelUrl: string;
	metadata: Record<string, string>;
}) {
	return getStripe().checkout.sessions.create({
		mode: 'payment',
		success_url: input.successUrl,
		cancel_url: input.cancelUrl,
		customer_email: input.customerEmail,
		line_items: [
			{
				quantity: input.quantity,
				price_data: {
					currency: 'usd',
					unit_amount: Math.round(input.priceDollars * 100),
					product_data: { name: `${input.eventTitle} — ${input.ticketName}` }
				}
			}
		],
		metadata: input.metadata,
		payment_intent_data: { metadata: input.metadata }
	});
}

import Stripe from 'stripe';
import { env } from '$env/dynamic/private';

let stripeClient: Stripe | null = null;

export function getStripeClient() {
	if (!env.STRIPE_SECRET_KEY) {
		throw new Error('STRIPE_SECRET_KEY is not set');
	}
	if (!stripeClient) {
		stripeClient = new Stripe(env.STRIPE_SECRET_KEY);
	}
	return stripeClient;
}

export async function createStripeCheckoutSession(input: {
	eventTitle: string;
	amountCents: number;
	currency: string;
	successUrl: string;
	cancelUrl: string;
	metadata: Record<string, string>;
	customerEmail: string;
}) {
	const stripe = getStripeClient();
	return stripe.checkout.sessions.create({
		mode: 'payment',
		success_url: input.successUrl,
		cancel_url: input.cancelUrl,
		customer_email: input.customerEmail,
		line_items: [
			{
				quantity: 1,
				price_data: {
					currency: input.currency,
					unit_amount: input.amountCents,
					product_data: {
						name: input.eventTitle
					}
				}
			}
		],
		metadata: input.metadata
	});
}

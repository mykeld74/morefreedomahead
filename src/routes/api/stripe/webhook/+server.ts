import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
	// Stripe webhook processing is intentionally disabled for now.
	return new Response('Stripe webhook disabled during build phase', { status: 501 });
};

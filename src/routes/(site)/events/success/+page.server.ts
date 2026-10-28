import { stripeConfigured, getStripe } from '$lib/server/stripe';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	if (url.searchParams.get('free')) return { status: 'free' as const };

	const sessionId = url.searchParams.get('session_id');
	if (!sessionId || !stripeConfigured()) return { status: 'unknown' as const };

	try {
		const session = await getStripe().checkout.sessions.retrieve(sessionId);
		return { status: session.payment_status === 'paid' ? ('paid' as const) : ('pending' as const) };
	} catch {
		return { status: 'unknown' as const };
	}
};

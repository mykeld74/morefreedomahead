import type { PageServerLoad } from './$types';
import { getPaymentBySessionId } from '$lib/server/events';

export const load: PageServerLoad = async ({ url }) => {
	const sessionId = url.searchParams.get('session_id');
	if (!sessionId) {
		return { paid: false };
	}
	const payment = await getPaymentBySessionId(sessionId);
	return { paid: payment?.status === 'paid' };
};

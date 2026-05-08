import type { LayoutServerLoad } from './$types';
import { requireAdmin } from '$lib/server/authz';

export const load: LayoutServerLoad = async ({ locals }) => {
	await requireAdmin(locals.user?.email);
	return {
		adminEmail: locals.user?.email ?? null
	};
};

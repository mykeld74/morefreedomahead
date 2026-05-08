import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { adminUser } from '$lib/server/db/schema';

export async function isAdmin(email: string | undefined) {
	if (!email) return false;
	const record = await db.query.adminUser.findFirst({ where: eq(adminUser.email, email.toLowerCase()) });
	return Boolean(record);
}

export async function requireAdmin(email: string | undefined) {
	const allowed = await isAdmin(email);
	if (!allowed) {
		throw redirect(303, '/demo/better-auth/login');
	}
}

import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';

const fallbackBuildBaseUrl = 'https://build.local';
const fallbackBuildSecret = 'build-time-only-secret-change-in-runtime';

const baseUrl = env.ORIGIN ?? env.BETTER_AUTH_URL ?? (building ? fallbackBuildBaseUrl : undefined);
const secret = env.BETTER_AUTH_SECRET ?? (building ? fallbackBuildSecret : undefined);

if (!baseUrl) {
	throw new Error('ORIGIN (or BETTER_AUTH_URL) is not set');
}

if (!secret) {
	throw new Error('BETTER_AUTH_SECRET is not set');
}

export const auth = betterAuth({
	baseURL: baseUrl,
	secret,
	database: drizzleAdapter(db, { provider: 'pg' }),
	emailAndPassword: { enabled: true },
	plugins: [
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});

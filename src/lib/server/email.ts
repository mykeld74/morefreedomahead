import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { serverClient } from '$lib/sanity/client.server';

const plainClient = serverClient.withConfig({ stega: false, perspective: 'published' });

async function getRecipient() {
	const fromSanity = await plainClient.fetch<string | null>(
		`*[_id == "siteSettings"][0].contactEmail`
	);
	return fromSanity || env.CONTACT_TO_EMAIL || null;
}

/**
 * Emails the site owner. Returns false when delivery is not configured or fails,
 * so callers can show an honest error instead of silently dropping a message.
 */
export async function notifyOwner(input: { subject: string; text: string; replyTo?: string }) {
	const to = await getRecipient();
	if (!env.RESEND_API_KEY || !env.FORM_FROM_EMAIL || !to) {
		if (dev) {
			console.warn('[email not configured] would send:', { to, ...input });
			return true;
		}
		console.error(
			'Email is not configured: set RESEND_API_KEY, FORM_FROM_EMAIL and a contact email.'
		);
		return false;
	}

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${env.RESEND_API_KEY}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: env.FORM_FROM_EMAIL,
			to,
			subject: input.subject,
			text: input.text,
			reply_to: input.replyTo
		})
	});

	if (!response.ok) {
		console.error('Email send failed', response.status, await response.text());
		return false;
	}
	return true;
}

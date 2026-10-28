import { fail, type Actions } from '@sveltejs/kit';
import { notifyOwner } from '$lib/server/email';

const field = (data: FormData, name: string, max = 4000) =>
	String(data.get(name) ?? '')
		.trim()
		.slice(0, max);

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

type Handler = {
	subject: string;
	required: string[];
	lines: (data: FormData) => string[];
};

const handlers: Record<string, Handler> = {
	contact: {
		subject: 'New contact message',
		required: ['email', 'message'],
		lines: (d) => [`Name: ${field(d, 'name', 160)}`, '', field(d, 'message')]
	},
	speaking: {
		subject: 'New speaking request',
		required: ['email', 'message'],
		lines: (d) => [
			`Name: ${field(d, 'name', 160)}`,
			`Organization: ${field(d, 'organization', 200)}`,
			`Event date: ${field(d, 'eventDate', 100)}`,
			`Location: ${field(d, 'location', 200)}`,
			'',
			field(d, 'message')
		]
	},
	newsletter: {
		subject: 'New email list sign-up',
		required: ['email'],
		lines: () => ['Please add this person to the email list.']
	}
};

function createAction(type: keyof typeof handlers) {
	const handler = handlers[type];
	return async ({ request }: { request: Request }) => {
		const data = await request.formData();
		const key = field(data, 'key', 80);

		// Bots fill the hidden field; pretend success so they move on.
		if (field(data, 'website')) return { key, success: true };

		const email = field(data, 'email', 320);
		const missing = handler.required.some((name) => !field(data, name));
		if (missing || !isEmail(email)) {
			return fail(400, {
				key,
				error: 'Please enter a valid email address and fill in the required fields.'
			});
		}

		const sent = await notifyOwner({
			subject: handler.subject,
			replyTo: email,
			text: [`From: ${email}`, ...handler.lines(data)].join('\n')
		});
		if (!sent) {
			return fail(500, {
				key,
				error: 'Sorry, something went wrong sending that. Please try again later.'
			});
		}
		return { key, success: true };
	};
}

export const formActions = {
	contact: createAction('contact'),
	speaking: createAction('speaking'),
	newsletter: createAction('newsletter')
} satisfies Actions;

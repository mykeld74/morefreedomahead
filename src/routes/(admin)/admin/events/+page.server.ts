import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { createEvent, listAllEvents, listAllEventsForAdmin, updateEvent } from '$lib/server/events';

function slugifyTitle(title: string): string {
	const normalized = title
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return normalized || 'event';
}

function generateUniqueSlug(title: string, existingSlugs: Set<string>): string {
	const baseSlug = slugifyTitle(title);
	if (!existingSlugs.has(baseSlug)) return baseSlug;

	let suffix = 2;
	let candidate = `${baseSlug}-${suffix}`;
	while (existingSlugs.has(candidate)) {
		suffix += 1;
		candidate = `${baseSlug}-${suffix}`;
	}
	return candidate;
}

export const load: PageServerLoad = async () => {
	return {
		events: await listAllEventsForAdmin()
	};
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const title = String(formData.get('title') ?? '').trim();
		const description = String(formData.get('description') ?? '').trim();
		const location = String(formData.get('location') ?? '').trim();
		const startAt = String(formData.get('startAt') ?? '').trim();
		const priceDollars = Number(formData.get('priceDollars') ?? 0);
		const priceCents = Number.isFinite(priceDollars) ? Math.round(priceDollars * 100) : 0;
		if (!title || !description || !location || !startAt) {
			return fail(400, { error: 'All event fields except end date are required.' });
		}

		const existingEvents = await listAllEvents();
		const existingSlugs = new Set(existingEvents.map((item) => item.slug));
		const slug = generateUniqueSlug(title, existingSlugs);

		await createEvent({
			title,
			slug,
			description,
			location,
			startAt: new Date(startAt),
			endAt: formData.get('endAt') ? new Date(String(formData.get('endAt'))) : undefined,
			capacity: Number(formData.get('capacity') ?? 0) || undefined,
			status: String(formData.get('status') ?? 'draft') === 'published' ? 'published' : 'draft',
			priceCents,
			currency: 'usd'
		});
		return { success: true };
	},
	update: async ({ request }) => {
		const formData = await request.formData();
		const eventId = Number(formData.get('eventId') ?? 0);
		const title = String(formData.get('title') ?? '').trim();
		const description = String(formData.get('description') ?? '').trim();
		const location = String(formData.get('location') ?? '').trim();
		const startAt = String(formData.get('startAt') ?? '').trim();
		const priceDollars = Number(formData.get('priceDollars') ?? 0);
		const priceCents = Number.isFinite(priceDollars) ? Math.round(priceDollars * 100) : NaN;
		const statusValue = String(formData.get('status') ?? 'draft');
		const status = statusValue === 'published' || statusValue === 'archived' ? statusValue : 'draft';

		if (
			!eventId ||
			!title ||
			!description ||
			!location ||
			!startAt ||
			!Number.isFinite(priceCents) ||
			priceCents < 0
		) {
			return fail(400, { error: 'All event fields except end date are required for updates.' });
		}

		const existingEvents = await listAllEvents();
		const targetEvent = existingEvents.find((item) => item.id === eventId);
		if (!targetEvent) {
			return fail(404, { error: 'Event not found.' });
		}

		await updateEvent({
			id: eventId,
			title,
			slug: targetEvent.slug,
			description,
			location,
			startAt: new Date(startAt),
			endAt: formData.get('endAt') ? new Date(String(formData.get('endAt'))) : undefined,
			capacity: Number(formData.get('capacity') ?? 0) || undefined,
			status,
			priceCents,
			currency: 'usd'
		});

		return { success: true };
	}
};

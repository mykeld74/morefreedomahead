import { and, asc, desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import {
	event,
	eventPayment,
	eventRegistration,
	eventTicket,
	paymentStatusEnum,
	registrationStatusEnum
} from '$lib/server/db/schema';

type PaymentStatus = (typeof paymentStatusEnum.enumValues)[number];
type RegistrationStatus = (typeof registrationStatusEnum.enumValues)[number];

export async function listPublishedEvents() {
	return db
		.select()
		.from(event)
		.where(eq(event.status, 'published'))
		.orderBy(asc(event.startAt), asc(event.id));
}

export async function listAllEvents() {
	return db.select().from(event).orderBy(desc(event.createdAt));
}

export async function listAllEventsForAdmin() {
	return db.query.event.findMany({
		with: { eventTickets: true },
		orderBy: (eventTable, { desc: descOrder }) => [descOrder(eventTable.createdAt)]
	});
}

export async function getEventBySlug(slug: string) {
	return db.query.event.findFirst({
		where: eq(event.slug, slug),
		with: { eventTickets: true }
	});
}

export async function createEvent(input: {
	slug: string;
	title: string;
	description: string;
	location: string;
	startAt: Date;
	endAt?: Date;
	capacity?: number;
	status: 'draft' | 'published' | 'archived';
	priceCents: number;
	currency?: string;
}) {
	const created = await db
		.insert(event)
		.values({
			slug: input.slug,
			title: input.title,
			description: input.description,
			location: input.location,
			startAt: input.startAt,
			endAt: input.endAt,
			capacity: input.capacity,
			status: input.status
		})
		.returning({ id: event.id });

	const eventId = created[0]?.id;
	if (!eventId) return null;

	await db.insert(eventTicket).values({
		eventId,
		name: 'General Admission',
		priceCents: input.priceCents,
		currency: input.currency ?? 'usd',
		isActive: true
	});
	return eventId;
}

export async function updateEvent(input: {
	id: number;
	slug: string;
	title: string;
	description: string;
	location: string;
	startAt: Date;
	endAt?: Date;
	capacity?: number;
	status: 'draft' | 'published' | 'archived';
	priceCents?: number;
	currency?: string;
}) {
	await db
		.update(event)
		.set({
			slug: input.slug,
			title: input.title,
			description: input.description,
			location: input.location,
			startAt: input.startAt,
			endAt: input.endAt,
			capacity: input.capacity,
			status: input.status,
			updatedAt: new Date()
		})
		.where(eq(event.id, input.id));

	if (typeof input.priceCents === 'number') {
		const primaryTicket = await db
			.select({ id: eventTicket.id })
			.from(eventTicket)
			.where(eq(eventTicket.eventId, input.id))
			.orderBy(asc(eventTicket.id))
			.limit(1);

		const ticketId = primaryTicket[0]?.id;
		if (ticketId) {
			await db
				.update(eventTicket)
				.set({
					priceCents: input.priceCents,
					currency: input.currency ?? 'usd'
				})
				.where(eq(eventTicket.id, ticketId));
		}
	}
}

export async function createRegistration(input: {
	eventId: number;
	ticketId: number;
	name: string;
	email: string;
	phone?: string;
	quantity: number;
}) {
	const created = await db
		.insert(eventRegistration)
		.values({
			eventId: input.eventId,
			ticketId: input.ticketId,
			name: input.name,
			email: input.email,
			phone: input.phone,
			quantity: input.quantity
		})
		.returning({ id: eventRegistration.id });
	return created[0]?.id ?? null;
}

export async function createPaymentRecord(input: {
	registrationId: number;
	amountCents: number;
	currency: string;
	checkoutSessionId?: string;
	status?: PaymentStatus;
}) {
	const inserted = await db
		.insert(eventPayment)
		.values({
			registrationId: input.registrationId,
			amountCents: input.amountCents,
			currency: input.currency,
			status: input.status ?? 'pending',
			provider: 'stripe',
			providerCheckoutSessionId: input.checkoutSessionId
		})
		.returning({ id: eventPayment.id });
	return inserted[0]?.id ?? null;
}

export async function markPaymentPaid(checkoutSessionId: string, providerPaymentId?: string) {
	await db
		.update(eventPayment)
		.set({
			status: 'paid',
			providerPaymentId,
			updatedAt: new Date()
		})
		.where(eq(eventPayment.providerCheckoutSessionId, checkoutSessionId));
}

export async function listRegistrationsForAdmin() {
	return db
		.select({
			registrationId: eventRegistration.id,
			eventId: event.id,
			eventTitle: event.title,
			name: eventRegistration.name,
			email: eventRegistration.email,
			quantity: eventRegistration.quantity,
			registrationStatus: eventRegistration.status,
			paymentStatus: eventPayment.status,
			priceCents: eventPayment.amountCents,
			currency: eventPayment.currency,
			createdAt: eventRegistration.createdAt
		})
		.from(eventRegistration)
		.innerJoin(event, eq(event.id, eventRegistration.eventId))
		.leftJoin(eventPayment, eq(eventPayment.registrationId, eventRegistration.id))
		.orderBy(desc(eventRegistration.createdAt));
}

export async function confirmRegistrationForAdmin(registrationId: number) {
	await db
		.update(eventRegistration)
		.set({
			status: 'confirmed',
			notes: null
		})
		.where(eq(eventRegistration.id, registrationId));
}

export async function updateRegistrationForAdmin(input: {
	registrationId: number;
	name: string;
	email: string;
	quantity: number;
	registrationStatus: RegistrationStatus;
	paymentStatus: PaymentStatus;
	priceCents: number;
	currency: string;
}) {
	await db
		.update(eventRegistration)
		.set({
			name: input.name,
			email: input.email,
			quantity: input.quantity,
			status: input.registrationStatus
		})
		.where(eq(eventRegistration.id, input.registrationId));

	const existingPayment = await db.query.eventPayment.findFirst({
		where: eq(eventPayment.registrationId, input.registrationId)
	});

	if (existingPayment) {
		await db
			.update(eventPayment)
			.set({
				amountCents: input.priceCents,
				currency: input.currency,
				status: input.paymentStatus,
				updatedAt: new Date()
			})
			.where(eq(eventPayment.registrationId, input.registrationId));
	} else {
		await db.insert(eventPayment).values({
			registrationId: input.registrationId,
			amountCents: input.priceCents,
			currency: input.currency,
			status: input.paymentStatus,
			provider: 'stripe'
		});
	}
}

export async function deleteRegistrationForAdmin(registrationId: number) {
	await db.delete(eventRegistration).where(eq(eventRegistration.id, registrationId));
}

export async function getPaymentBySessionId(sessionId: string) {
	return db.query.eventPayment.findFirst({
		where: eq(eventPayment.providerCheckoutSessionId, sessionId)
	});
}

export async function getTicketById(ticketId: number) {
	return db.query.eventTicket.findFirst({
		where: eq(eventTicket.id, ticketId),
		with: { event: true }
	});
}

export async function listEventTickets(eventId: number) {
	return db
		.select()
		.from(eventTicket)
		.where(and(eq(eventTicket.eventId, eventId), eq(eventTicket.isActive, true)))
		.orderBy(asc(eventTicket.id));
}

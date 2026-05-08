import {
	boolean,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
	varchar
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const contentStatusEnum = pgEnum('content_status', ['draft', 'published']);
export const submissionTypeEnum = pgEnum('submission_type', [
	'contact',
	'speaking',
	'newsletter'
]);
export const eventStatusEnum = pgEnum('event_status', ['draft', 'published', 'archived']);
export const registrationStatusEnum = pgEnum('registration_status', [
	'pending',
	'confirmed',
	'cancelled',
	'checked_in'
]);
export const paymentStatusEnum = pgEnum('payment_status', [
	'pending',
	'paid',
	'failed',
	'refunded'
]);

export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const adminUser = pgTable(
	'admin_user',
	{
		id: serial('id').primaryKey(),
		email: varchar('email', { length: 320 }).notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => ({
		emailIdx: uniqueIndex('admin_user_email_idx').on(table.email)
	})
);

export const pageContent = pgTable(
	'page_content',
	{
		id: serial('id').primaryKey(),
		slug: varchar('slug', { length: 120 }).notNull(),
		title: varchar('title', { length: 200 }).notNull(),
		status: contentStatusEnum('status').notNull().default('published'),
		sections: jsonb('sections').notNull().$type<Record<string, unknown>>(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
		publishedAt: timestamp('published_at', { withTimezone: true })
	},
	(table) => ({
		slugIdx: uniqueIndex('page_content_slug_idx').on(table.slug)
	})
);

export const testimonial = pgTable('testimonial', {
	id: serial('id').primaryKey(),
	pageSlug: varchar('page_slug', { length: 120 }).notNull(),
	authorName: varchar('author_name', { length: 160 }).notNull(),
	quote: text('quote').notNull(),
	sortOrder: integer('sort_order').notNull().default(0),
	status: contentStatusEnum('status').notNull().default('published')
});

export const siteLink = pgTable('site_link', {
	id: serial('id').primaryKey(),
	groupName: varchar('group_name', { length: 100 }).notNull(),
	label: varchar('label', { length: 120 }).notNull(),
	url: text('url').notNull(),
	sortOrder: integer('sort_order').notNull().default(0),
	isExternal: boolean('is_external').notNull().default(false)
});

export const formSubmission = pgTable('form_submission', {
	id: serial('id').primaryKey(),
	type: submissionTypeEnum('type').notNull(),
	name: varchar('name', { length: 160 }),
	email: varchar('email', { length: 320 }).notNull(),
	phone: varchar('phone', { length: 40 }),
	message: text('message'),
	payload: jsonb('payload').notNull().$type<Record<string, unknown>>(),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const event = pgTable(
	'event',
	{
		id: serial('id').primaryKey(),
		slug: varchar('slug', { length: 140 }).notNull(),
		title: varchar('title', { length: 200 }).notNull(),
		description: text('description').notNull(),
		location: varchar('location', { length: 240 }).notNull(),
		startAt: timestamp('start_at', { withTimezone: true }).notNull(),
		endAt: timestamp('end_at', { withTimezone: true }),
		capacity: integer('capacity'),
		status: eventStatusEnum('status').notNull().default('draft'),
		imageUrl: text('image_url'),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => ({
		slugIdx: uniqueIndex('event_slug_idx').on(table.slug)
	})
);

export const eventTicket = pgTable('event_ticket', {
	id: serial('id').primaryKey(),
	eventId: integer('event_id')
		.notNull()
		.references(() => event.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 120 }).notNull(),
	description: text('description'),
	priceCents: integer('price_cents').notNull().default(0),
	currency: varchar('currency', { length: 8 }).notNull().default('usd'),
	quantityAvailable: integer('quantity_available'),
	isActive: boolean('is_active').notNull().default(true)
});

export const eventRegistration = pgTable('event_registration', {
	id: serial('id').primaryKey(),
	eventId: integer('event_id')
		.notNull()
		.references(() => event.id, { onDelete: 'cascade' }),
	ticketId: integer('ticket_id')
		.notNull()
		.references(() => eventTicket.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 160 }).notNull(),
	email: varchar('email', { length: 320 }).notNull(),
	phone: varchar('phone', { length: 40 }),
	quantity: integer('quantity').notNull().default(1),
	status: registrationStatusEnum('status').notNull().default('pending'),
	notes: text('notes'),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
});

export const eventPayment = pgTable(
	'event_payment',
	{
		id: serial('id').primaryKey(),
		registrationId: integer('registration_id')
			.notNull()
			.references(() => eventRegistration.id, { onDelete: 'cascade' }),
		amountCents: integer('amount_cents').notNull().default(0),
		currency: varchar('currency', { length: 8 }).notNull().default('usd'),
		status: paymentStatusEnum('status').notNull().default('pending'),
		provider: varchar('provider', { length: 60 }).notNull().default('stripe'),
		providerPaymentId: text('provider_payment_id'),
		providerCheckoutSessionId: text('provider_checkout_session_id'),
		metadata: jsonb('metadata').$type<Record<string, unknown>>(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
	},
	(table) => ({
		providerSessionIdx: uniqueIndex('event_payment_provider_session_idx').on(
			table.providerCheckoutSessionId
		)
	})
);

export const eventRelations = relations(event, ({ many }) => ({
	eventTickets: many(eventTicket),
	registrations: many(eventRegistration)
}));

export const eventTicketRelations = relations(eventTicket, ({ one, many }) => ({
	event: one(event, {
		fields: [eventTicket.eventId],
		references: [event.id]
	}),
	registrations: many(eventRegistration)
}));

export const eventRegistrationRelations = relations(eventRegistration, ({ one, many }) => ({
	event: one(event, {
		fields: [eventRegistration.eventId],
		references: [event.id]
	}),
	ticket: one(eventTicket, {
		fields: [eventRegistration.ticketId],
		references: [eventTicket.id]
	}),
	payments: many(eventPayment)
}));

export const eventPaymentRelations = relations(eventPayment, ({ one }) => ({
	registration: one(eventRegistration, {
		fields: [eventPayment.registrationId],
		references: [eventRegistration.id]
	})
}));

export * from './auth.schema';

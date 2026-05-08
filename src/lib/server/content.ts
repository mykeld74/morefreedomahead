import { and, asc, desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { pageContent, siteLink, testimonial, type contentStatusEnum } from '$lib/server/db/schema';

type PageStatus = (typeof contentStatusEnum.enumValues)[number];

type PageRecord = {
	title: string;
	hero?: string;
	subtitle?: string;
	body: string[];
	ctaLabel?: string;
	ctaHref?: string;
};

const defaultPages: Record<string, PageRecord> = {
	home: {
		title: "There's more freedom ahead, sis.",
		hero: 'Jesus is ready to breathe more healing into your story.',
		subtitle: 'What if healing with Jesus could feel less daunting and more like coming home to His love?',
		body: [
			"Knowing Jesus means you get to spend a lifetime watching the Lord's love for you unfold through healing, freedom and redemption.",
			'Join an encounter and experience God in community.'
		],
		ctaLabel: 'Join an Upcoming Retreat',
		ctaHref: '/events'
	},
	speaking: {
		title: "Bring Taryn to your next women's event",
		body: [
			'Taryn is a Spirit-led speaker who brings emotional depth, biblical truth, and vulnerable storytelling.',
			'Use the speaking inquiry form to request availability.'
		],
		ctaLabel: 'Book Me to Speak',
		ctaHref: '/contact'
	},
	about: {
		title: 'About More Freedom Ahead',
		body: [
			'More Freedom Ahead helps women break free from fear and shame so they can experience the intimate love of Jesus.',
			'This ministry exists to create spaces where women encounter the Living God and walk in freedom.'
		]
	},
	contact: {
		title: 'Get in touch',
		body: ['Reach out and we will respond within two business days.']
	},
	donate: {
		title: 'Donate',
		body: ['Supporting this ministry helps more women encounter Jesus and walk in freedom.']
	},
	privacy: {
		title: 'Privacy Policy',
		body: ['Privacy policy content can be managed in the admin panel.']
	},
	terms: {
		title: 'Terms and Conditions',
		body: ['Terms content can be managed in the admin panel.']
	}
};

export async function getPageBySlug(slug: string) {
	const page = await db.query.pageContent.findFirst({
		where: and(eq(pageContent.slug, slug), eq(pageContent.status, 'published'))
	});
	if (page) return page;
	const fallback = defaultPages[slug];
	if (!fallback) return null;
	return {
		id: 0,
		slug,
		title: fallback.title,
		status: 'published' as PageStatus,
		sections: fallback,
		updatedAt: new Date(),
		publishedAt: new Date()
	};
}

export async function listPageContent() {
	return db.select().from(pageContent).orderBy(asc(pageContent.slug));
}

export async function upsertPageContent(input: {
	slug: string;
	title: string;
	sections: Record<string, unknown>;
	status: PageStatus;
}) {
	const existing = await db.query.pageContent.findFirst({ where: eq(pageContent.slug, input.slug) });
	if (existing) {
		await db
			.update(pageContent)
			.set({
				title: input.title,
				sections: input.sections,
				status: input.status,
				updatedAt: new Date(),
				publishedAt: input.status === 'published' ? new Date() : null
			})
			.where(eq(pageContent.id, existing.id));
		return existing.id;
	}
	const inserted = await db
		.insert(pageContent)
		.values({
			slug: input.slug,
			title: input.title,
			sections: input.sections,
			status: input.status,
			publishedAt: input.status === 'published' ? new Date() : null
		})
		.returning({ id: pageContent.id });
	return inserted[0]?.id ?? 0;
}

export async function listTestimonials(pageSlug?: string) {
	return db
		.select()
		.from(testimonial)
		.where(pageSlug ? eq(testimonial.pageSlug, pageSlug) : undefined)
		.orderBy(asc(testimonial.pageSlug), asc(testimonial.sortOrder), desc(testimonial.id));
}

export async function listSiteLinks(groupName?: string) {
	return db
		.select()
		.from(siteLink)
		.where(groupName ? eq(siteLink.groupName, groupName) : undefined)
		.orderBy(asc(siteLink.groupName), asc(siteLink.sortOrder), asc(siteLink.id));
}

import { defineQuery } from '@sanity/sveltekit';

const upcoming = `dateTime(coalesce(endAt, startAt)) >= dateTime(now())`;

const eventSummary = `{
	_id, title, "slug": slug.current, startAt, endAt, location, summary, image
}`;

export const siteSettingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
	siteName, description, navigation[]{_key, label, href}, footerTagline, contactEmail, defaultShareImage
}`);

export const pageQuery = defineQuery(`*[_type == "page" && slug.current == $slug][0]{
	_id, title, "slug": slug.current, seo,
	sections[]{
		...,
		_type == "hero" => { ..., "videoUrl": video.asset->url },
		_type == "eventsList" => {
			...,
			"events": *[_type == "event" && defined(slug.current) && ${upcoming}] | order(startAt asc)[0...24] ${eventSummary}
		}
	}
}`);

export const upcomingEventsQuery = defineQuery(
	`*[_type == "event" && defined(slug.current) && ${upcoming}] | order(startAt asc) ${eventSummary}`
);

export const pastEventsQuery = defineQuery(
	`*[_type == "event" && defined(slug.current) && !(${upcoming})] | order(startAt desc)[0...12] ${eventSummary}`
);

export const eventQuery = defineQuery(`*[_type == "event" && slug.current == $slug][0]{
	_id, title, "slug": slug.current, startAt, endAt, location, summary, image, body,
	registrationMode, registrationClosed, externalUrl, tickets[]{_key, name, description, price}, seo
}`);

/** Trusted, server-only lookup used when creating a checkout (never trust the client price). */
export const eventTicketQuery = defineQuery(`*[_type == "event" && slug.current == $slug][0]{
	_id, title, "slug": slug.current, startAt, location, registrationMode, registrationClosed,
	"ticket": tickets[_key == $ticketKey][0]{_key, name, price}
}`);

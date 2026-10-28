import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
	locations: {
		page: defineLocations({
			select: { title: 'title', slug: 'slug.current' },
			resolve: (doc) => ({
				locations: [
					{
						title: doc?.title || 'Untitled',
						href: doc?.slug === 'home' ? '/' : `/${doc?.slug}`
					}
				]
			})
		}),
		event: defineLocations({
			select: { title: 'title', slug: 'slug.current' },
			resolve: (doc) => ({
				locations: [
					{ title: doc?.title || 'Untitled', href: `/events/${doc?.slug}` },
					{ title: 'All events', href: '/events' }
				]
			})
		})
	}
};

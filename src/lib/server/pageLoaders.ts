import { error } from '@sveltejs/kit';
import { getSitePage } from '$lib/content/siteContent';

export async function loadStaticPage(slug: string) {
	const page = getSitePage(slug);
	if (!page) {
		throw error(404, 'Page not found');
	}
	return { page };
}

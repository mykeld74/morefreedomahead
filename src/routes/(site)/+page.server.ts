import { error } from '@sveltejs/kit';
import { pageQuery } from '$lib/sanity/queries';
import { formActions } from '$lib/server/forms';
import type { PageDoc } from '$lib/sanity/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const params = { slug: 'home' };
	const initial = await locals.sanity.loadQuery<PageDoc | null>(pageQuery, params);
	if (!initial.data) error(404, 'Page not found');
	return { query: pageQuery, params, options: { initial } };
};

export const actions = formActions;

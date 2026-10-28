import { error } from '@sveltejs/kit';
import { pageQuery } from '$lib/sanity/queries';
import { formActions } from '$lib/server/forms';
import type { PageDoc } from '$lib/sanity/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const { slug } = params;
	const initial = await locals.sanity.loadQuery<PageDoc | null>(pageQuery, { slug });
	if (!initial.data) error(404, 'Page not found');
	return { query: pageQuery, params: { slug }, options: { initial } };
};

export const actions = formActions;

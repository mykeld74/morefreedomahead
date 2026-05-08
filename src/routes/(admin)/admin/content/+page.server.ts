import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { listPageContent, upsertPageContent } from '$lib/server/content';
import { listSitePageOptions } from '$lib/content/siteContent';

export const load: PageServerLoad = async () => {
	return {
		pages: await listPageContent(),
		sitePages: listSitePageOptions()
	};
};

export const actions: Actions = {
	save: async ({ request }) => {
		const formData = await request.formData();
		const slug = String(formData.get('targetPage') ?? '').trim();
		const title = String(formData.get('title') ?? '').trim();
		const status = String(formData.get('status') ?? 'draft').trim();
		const body = String(formData.get('body') ?? '').trim();
		const validPageSlugSet = new Set(listSitePageOptions().map((page) => page.slug));
		if (!slug || !title) {
			return fail(400, { error: 'Target page and title are required.' });
		}
		if (!validPageSlugSet.has(slug)) {
			return fail(400, { error: 'Please choose a valid page target.' });
		}
		await upsertPageContent({
			slug,
			title,
			status: status === 'published' ? 'published' : 'draft',
			sections: { body: body.split('\n').filter(Boolean) }
		});
		return { success: true };
	}
};

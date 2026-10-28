import { siteSettingsQuery } from '$lib/sanity/queries';
import type { SiteSettings } from '$lib/sanity/types';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const initial = await locals.sanity.loadQuery<SiteSettings | null>(siteSettingsQuery);
	return { settingsQuery: siteSettingsQuery, settingsOptions: { initial } };
};

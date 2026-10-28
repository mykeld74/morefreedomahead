import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => ({
	previewEnabled: locals.sanity.previewEnabled
});

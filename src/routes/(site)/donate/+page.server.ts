import type { PageServerLoad } from './$types';
import { loadStaticPage } from '$lib/server/pageLoaders';

export const load: PageServerLoad = async () => loadStaticPage('donate');

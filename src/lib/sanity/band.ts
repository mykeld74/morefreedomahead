import { stegaClean } from '@sanity/sveltekit';

const bands: Record<string, string> = {
	soft: 'sectionSoft',
	dark: 'textDark',
	charcoal: 'textDark textCharcoal'
};

/** Classes for a section's optional full-width colored background. */
export function bandClass(background?: string, curved?: boolean) {
	const base = bands[stegaClean(background) ?? 'none'];
	return base ? `${base}${curved ? ' bandCurved' : ''}` : '';
}

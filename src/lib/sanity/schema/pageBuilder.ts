import { defineArrayMember, defineType } from 'sanity';

export const blockTypes = [
	'hero',
	'textSection',
	'introSplit',
	'featureGrid',
	'cardGrid',
	'eventsList',
	'testimonials',
	'callToAction',
	'formSection',
	'donateSection'
] as const;

export const pageBuilder = defineType({
	name: 'pageBuilder',
	title: 'Page sections',
	type: 'array',
	of: blockTypes.map((type) => defineArrayMember({ type })),
	options: { insertMenu: { filter: true } }
});

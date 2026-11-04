import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons/Play';

export const videoEmbed = defineType({
	name: 'videoEmbed',
	title: 'Video (YouTube or Vimeo)',
	type: 'object',
	icon: PlayIcon,
	fields: [
		defineField({ name: 'heading', type: 'string' }),
		defineField({
			name: 'url',
			title: 'Video address',
			description: 'Paste the YouTube or Vimeo link.',
			type: 'url',
			validation: (rule) =>
				rule
					.required()
					.uri({ scheme: ['https'] })
					.custom((value) =>
						!value || /(youtube\.com|youtu\.be|vimeo\.com)/.test(value)
							? true
							: 'Use a YouTube or Vimeo link.'
					)
		}),
		defineField({ name: 'caption', type: 'string' })
	],
	preview: {
		select: { title: 'heading', subtitle: 'url' },
		prepare: ({ title, subtitle }) => ({
			title: title || subtitle,
			subtitle: 'Video',
			media: PlayIcon
		})
	}
});

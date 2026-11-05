import { defineArrayMember, defineField, defineType } from 'sanity';
import { ImagesIcon } from '@sanity/icons/Images';
import { eyebrowField } from '../objects/eyebrow';

export const imageGallery = defineType({
	name: 'imageGallery',
	title: 'Photo gallery',
	type: 'object',
	icon: ImagesIcon,
	fields: [
		eyebrowField(),
		defineField({ name: 'heading', type: 'string' }),
		defineField({
			name: 'images',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'image',
					options: { hotspot: true },
					fields: [
						defineField({ name: 'alt', title: 'Description of the image', type: 'string' }),
						defineField({ name: 'caption', type: 'string' })
					]
				})
			],
			options: { layout: 'grid' },
			validation: (rule) => rule.required().min(1)
		})
	],
	preview: {
		select: { title: 'heading', media: 'images.0' },
		prepare: ({ title, media }) => ({ title, subtitle: 'Photo gallery', media })
	}
});

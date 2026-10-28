import { CalendarIcon } from '@sanity/icons/Calendar';
import { CogIcon } from '@sanity/icons/Cog';
import { DocumentIcon } from '@sanity/icons/Document';
import { HomeIcon } from '@sanity/icons/Home';
import type { StructureResolver } from 'sanity/structure';

const pinned = ['siteSettings'];

export const structure: StructureResolver = (S) =>
	S.list()
		.title('Website')
		.items([
			S.listItem()
				.title('Home page')
				.icon(HomeIcon)
				.child(
					S.documentList()
						.title('Home page')
						.filter('_type == "page" && slug.current == "home"')
						.apiVersion('2026-05-15')
				),
			S.listItem()
				.title('Pages')
				.icon(DocumentIcon)
				.child(
					S.documentList()
						.title('Pages')
						.filter('_type == "page" && slug.current != "home"')
						.apiVersion('2026-05-15')
						.defaultOrdering([{ field: 'title', direction: 'asc' }])
				),
			S.documentTypeListItem('event').title('Events').icon(CalendarIcon),
			S.divider(),
			S.listItem()
				.title('Site settings')
				.icon(CogIcon)
				.child(
					S.document().schemaType('siteSettings').documentId('siteSettings').title('Site settings')
				),
			...S.documentTypeListItems().filter((item) => {
				const id = item.getId() as string;
				return !['page', 'event', ...pinned].includes(id);
			})
		]);

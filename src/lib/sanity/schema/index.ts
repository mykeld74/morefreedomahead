import { callToAction } from './blocks/callToAction';
import { cardGrid } from './blocks/cardGrid';
import { donateSection } from './blocks/donateSection';
import { eventsList } from './blocks/eventsList';
import { featureGrid } from './blocks/featureGrid';
import { formSection } from './blocks/formSection';
import { hero } from './blocks/hero';
import { introSplit } from './blocks/introSplit';
import { testimonials } from './blocks/testimonials';
import { textSection } from './blocks/textSection';
import { event } from './documents/event';
import { page } from './documents/page';
import { siteSettings } from './documents/siteSettings';
import { portableText } from './objects/portableText';
import { seo } from './objects/seo';
import { pageBuilder } from './pageBuilder';

export const schemaTypes = [
	// documents
	page,
	event,
	siteSettings,
	// page builder
	pageBuilder,
	hero,
	textSection,
	introSplit,
	featureGrid,
	cardGrid,
	eventsList,
	testimonials,
	callToAction,
	formSection,
	donateSection,
	// shared
	portableText,
	seo
];

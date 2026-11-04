import { callToAction } from './blocks/callToAction';
import { cardGrid } from './blocks/cardGrid';
import { donateSection } from './blocks/donateSection';
import { faq } from './blocks/faq';
import { eventsList } from './blocks/eventsList';
import { featureGrid } from './blocks/featureGrid';
import { formSection } from './blocks/formSection';
import { hero } from './blocks/hero';
import { imageGallery } from './blocks/imageGallery';
import { introSplit } from './blocks/introSplit';
import { mediaText } from './blocks/mediaText';
import { pullQuote } from './blocks/pullQuote';
import { testimonials } from './blocks/testimonials';
import { textSection } from './blocks/textSection';
import { videoEmbed } from './blocks/videoEmbed';
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
	mediaText,
	imageGallery,
	faq,
	videoEmbed,
	pullQuote,
	// shared
	portableText,
	seo
];

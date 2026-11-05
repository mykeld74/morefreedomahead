import type { PortableTextBlock } from '@portabletext/types';

export type SanityImage = {
	_type: 'image';
	asset?: { _ref: string; _type: 'reference' };
	alt?: string;
	hotspot?: unknown;
	crop?: unknown;
};

export type Seo = { title?: string; description?: string; image?: SanityImage };

export type EventSummary = {
	_id: string;
	title: string;
	slug: string;
	startAt: string;
	endAt?: string;
	location?: string;
	summary?: string;
	image?: SanityImage;
};

type Keyed = { _key: string };

export type HeroBlock = Keyed & {
	eyebrow?: string;
	_type: 'hero';
	headline: string;
	lines?: string[];
	ctaLabel?: string;
	ctaHref?: string;
	videoUrl?: string;
	image?: SanityImage;
};
export type TextSectionBlock = Keyed & {
	eyebrow?: string;
	curvedEdge?: boolean;
	_type: 'textSection';
	heading?: string;
	body?: PortableTextBlock[];
	style?: 'plain' | 'soft' | 'statement' | 'dark' | 'charcoal' | 'split';
};
export type IntroSplitBlock = Keyed & {
	eyebrow?: string;
	curvedEdge?: boolean;
	_type: 'introSplit';
	heading?: string;
	body?: PortableTextBlock[];
	cardText?: PortableTextBlock[];
	cardButtonLabel?: string;
	cardButtonHref?: string;
};
export type FeatureGridBlock = Keyed & {
	background?: 'none' | 'soft' | 'dark' | 'charcoal';
	curvedEdge?: boolean;
	eyebrow?: string;
	_type: 'featureGrid';
	heading?: string;
	items?: (Keyed & { title: string; body?: string })[];
};
export type CardGridBlock = Keyed & {
	eyebrow?: string;
	_type: 'cardGrid';
	layout?: 'cards' | 'tiles';
	heading?: string;
	intro?: string;
	cards?: (Keyed & {
		title: string;
		description?: string;
		image?: SanityImage;
		href?: string;
		buttonLabel?: string;
	})[];
};
export type EventsListBlock = Keyed & {
	eyebrow?: string;
	curvedEdge?: boolean;
	_type: 'eventsList';
	heading?: string;
	maxItems?: number;
	emptyText?: string;
	events?: EventSummary[];
};
export type TestimonialsBlock = Keyed & {
	background?: 'none' | 'soft' | 'dark' | 'charcoal';
	curvedEdge?: boolean;
	eyebrow?: string;
	_type: 'testimonials';
	heading?: string;
	items?: (Keyed & { quote: string; author?: string })[];
};
export type CallToActionBlock = Keyed & {
	background?: 'none' | 'soft' | 'dark' | 'charcoal';
	curvedEdge?: boolean;
	_type: 'callToAction';
	text?: string;
	label: string;
	href?: string;
};
export type FormSectionBlock = Keyed & {
	background?: 'none' | 'soft' | 'dark' | 'charcoal';
	curvedEdge?: boolean;
	_type: 'formSection';
	formType: 'contact' | 'speaking' | 'newsletter';
	heading?: string;
	intro?: string;
	successMessage?: string;
};
export type DonateSectionBlock = Keyed & {
	curvedEdge?: boolean;
	_type: 'donateSection';
	heading?: string;
	body?: PortableTextBlock[];
	buttonLabel?: string;
	buttonHref?: string;
};

export type MediaTextBlock = Keyed & {
	eyebrow?: string;
	_type: 'mediaText';
	image?: SanityImage;
	imageSide?: 'left' | 'right';
	heading?: string;
	body?: PortableTextBlock[];
	buttonLabel?: string;
	buttonHref?: string;
};
export type ImageGalleryBlock = Keyed & {
	eyebrow?: string;
	_type: 'imageGallery';
	heading?: string;
	images?: (SanityImage & { _key: string; caption?: string })[];
};
export type FaqBlock = Keyed & {
	background?: 'none' | 'soft' | 'dark' | 'charcoal';
	curvedEdge?: boolean;
	eyebrow?: string;
	_type: 'faq';
	heading?: string;
	items?: { _key: string; question: string; answer?: PortableTextBlock[] }[];
};
export type VideoEmbedBlock = Keyed & {
	_type: 'videoEmbed';
	heading?: string;
	url?: string;
	caption?: string;
};
export type PullQuoteBlock = Keyed & {
	background?: 'none' | 'soft' | 'dark' | 'charcoal';
	curvedEdge?: boolean;
	_type: 'pullQuote';
	quote: string;
	attribution?: string;
};

export type PageBlock =
	| HeroBlock
	| TextSectionBlock
	| IntroSplitBlock
	| FeatureGridBlock
	| CardGridBlock
	| EventsListBlock
	| TestimonialsBlock
	| CallToActionBlock
	| FormSectionBlock
	| DonateSectionBlock
	| MediaTextBlock
	| ImageGalleryBlock
	| FaqBlock
	| VideoEmbedBlock
	| PullQuoteBlock;

export type PageDoc = {
	_id: string;
	title: string;
	slug: string;
	seo?: Seo;
	sections?: PageBlock[];
};

export type Ticket = { _key: string; name: string; description?: string; price: number };

export type EventDoc = EventSummary & {
	_id: string;
	body?: PortableTextBlock[];
	registrationMode?: 'stripe' | 'external' | 'none';
	registrationClosed?: boolean;
	externalUrl?: string;
	tickets?: Ticket[];
	seo?: Seo;
};

export type SiteSettings = {
	siteName?: string;
	description?: string;
	navigation?: { _key: string; label: string; href: string }[];
	footerTagline?: string;
	contactEmail?: string;
	defaultShareImage?: SanityImage;
};

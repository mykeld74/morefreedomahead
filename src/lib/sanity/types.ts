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
	_type: 'hero';
	headline: string;
	lines?: string[];
	ctaLabel?: string;
	ctaHref?: string;
	videoUrl?: string;
	image?: SanityImage;
};
export type TextSectionBlock = Keyed & {
	_type: 'textSection';
	heading?: string;
	body?: PortableTextBlock[];
	style?: 'plain' | 'soft';
};
export type IntroSplitBlock = Keyed & {
	_type: 'introSplit';
	heading?: string;
	body?: PortableTextBlock[];
	cardText?: PortableTextBlock[];
	cardButtonLabel?: string;
	cardButtonHref?: string;
};
export type FeatureGridBlock = Keyed & {
	_type: 'featureGrid';
	heading?: string;
	items?: (Keyed & { title: string; body?: string })[];
};
export type CardGridBlock = Keyed & {
	_type: 'cardGrid';
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
	_type: 'eventsList';
	heading?: string;
	maxItems?: number;
	emptyText?: string;
	events?: EventSummary[];
};
export type TestimonialsBlock = Keyed & {
	_type: 'testimonials';
	heading?: string;
	items?: (Keyed & { quote: string; author?: string })[];
};
export type CallToActionBlock = Keyed & {
	_type: 'callToAction';
	text?: string;
	label: string;
	href?: string;
};
export type FormSectionBlock = Keyed & {
	_type: 'formSection';
	formType: 'contact' | 'speaking' | 'newsletter';
	heading?: string;
	intro?: string;
	successMessage?: string;
};
export type DonateSectionBlock = Keyed & {
	_type: 'donateSection';
	heading?: string;
	body?: PortableTextBlock[];
	buttonLabel?: string;
	buttonHref?: string;
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
	| DonateSectionBlock;

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

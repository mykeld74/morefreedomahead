export type ContentBlock =
	| { type: 'paragraph'; text: string }
	| { type: 'heading'; text: string }
	| { type: 'quote'; text: string; author?: string }
	| { type: 'list'; items: string[] }
	| { type: 'cta'; text: string; href: string; label: string };

export type SitePage = {
	slug: string;
	title: string;
	blocks: ContentBlock[];
};

const sitePages: Record<string, SitePage> = {
	home: {
		slug: 'home',
		title: "There's more freedom ahead, sis.",
		blocks: [
			{ type: 'paragraph', text: 'Jesus is ready to breathe more healing into your story.' },
			{
				type: 'paragraph',
				text: "Knowing Jesus means you get to spend a lifetime watching the Lord's love for you unfold through healing, freedom and redemption."
			},
			{
				type: 'paragraph',
				text: "But our past, trauma, enemy lies, fear, shame, intellectualism and our own pride can get in the way of receiving the Lord's fullness."
			},
			{
				type: 'paragraph',
				text: "God heals in the details of your story and won't stop until your soul knows it's worth."
			},
			{
				type: 'paragraph',
				text: `So that pattern you think is "just how you are" or that relationship that feels like it "will always be like this", raise your expectations. The God of the impossible, who calls you His own, is doing a new thing!`
			},
			{
				type: 'paragraph',
				text: 'What if healing with Jesus could feel less daunting and more like coming home to His love?'
			},
			{
				type: 'heading',
				text: 'Join an encounter. Experience God presence.'
			},
			{
				type: 'paragraph',
				text: "Space for YOU to sense, feel and receive the Lord's soul-deep refreshing."
			},
			{
				type: 'list',
				items: ['RETREATS', 'SPEAKING', '1:1 SUPPORT']
			},
			{
				type: 'heading',
				text: 'Let the Spirit restore your faith that God...'
			},
			{
				type: 'list',
				items: [
					'Loves to Speak to You',
					'Is Trustworthy',
					'Wants to Bring Healing'
				]
			},
			{
				type: 'cta',
				text: 'Join an upcoming retreat.',
				label: 'Join an Upcoming Retreat',
				href: '/events'
			},
			{
				type: 'quote',
				text: 'God spoke so clearly during the times of reflection as well as through each other. The whole weekend felt surrounded by Holy Spirit.',
				author: 'Kailyn Van Schooten'
			},
			{
				type: 'quote',
				text: 'The times of meditation, having a little bit of form helped me enjoy seeking the Lord without the pressure to have definitive answers.',
				author: 'Kaylen Tanner'
			},
			{
				type: 'paragraph',
				text: "Hey there, I'm Taryn, a Spiritual Formation Facilitator. I help Christian women drop the pressure, ditch the guilt, and delight in a life of peace, presence, and deeper connection."
			}
		]
	},
	speaking: {
		slug: 'speaking',
		title: "Bring Taryn to your next women's event!",
		blocks: [
			{
				type: 'paragraph',
				text: 'Taryn is a Spirit-led speaker who brings emotional depth, biblical truth, and vulnerable storytelling to every room.'
			},
			{
				type: 'paragraph',
				text: 'She helps women move from self-protective to secure trust in Jesus — leaving them changed, not just inspired.'
			},
			{
				type: 'heading',
				text: 'Keynote Topics'
			},
			{
				type: 'list',
				items: [
					"I Want to Hope for More, But I Don't Want to Be Let Down",
					'How Honest Faith Breaks the Chains of Perfectionism',
					'Is this fear or my gut? Cultivating Holy Spirit Discernment',
					'Trusting God When You Wonder if Everything Will Be Okay'
				]
			},
			{
				type: 'quote',
				text: 'Thank you again for coming and being a wonderful first speaker for us. You set the tone amazingly for the year and we loved you!',
				author: 'Brenna Cline'
			}
		]
	},
	about: {
		slug: 'about',
		title: 'About More Freedom Ahead',
		blocks: [
			{
				type: 'paragraph',
				text: "Hey there, I'm Taryn Marchena, founder of More Freedom Ahead — a ministry that helps women break free from fear and shame so they can experience the intimate love of Jesus."
			},
			{
				type: 'paragraph',
				text: 'Life with Jesus is a pilgrimage. A holy, intentional journey. One of delight.'
			},
			{
				type: 'paragraph',
				text: 'Our goal is to soften hearts to surrender so women feel safe enough to open to God for the first time or once again.'
			},
			{
				type: 'paragraph',
				text: 'Ready to experience more freedom for yourself? Sign up for the newsletter to hear about upcoming retreats and events.'
			}
		]
	},
	contact: {
		slug: 'contact',
		title: 'Get in touch',
		blocks: [
			{
				type: 'paragraph',
				text: "Reach out and I'll get back to you within the next 2 biz days."
			},
			{
				type: 'cta',
				text: 'Inquiring about bringing me as a speaker to your next event?',
				label: 'Speaking Page',
				href: '/speaking'
			}
		]
	},
	donate: {
		slug: 'donate',
		title: 'Donate',
		blocks: [
			{
				type: 'paragraph',
				text: 'Supporting Our Ministry Means More Women Encounter Jesus and Walk in Freedom.'
			},
			{
				type: 'paragraph',
				text: 'Your generosity helps women break free from the pain of their past, find safety in God presence, and step boldly into the purpose He designed for them.'
			},
			{
				type: 'list',
				items: ['Give', 'Share', 'Pray']
			}
		]
	},
	privacy: {
		slug: 'privacy',
		title: 'Privacy Policy',
		blocks: [
			{
				type: 'paragraph',
				text: 'This site collects only the information submitted through forms (name, email, message, and event inquiry details) to respond to requests and provide updates.'
			},
			{
				type: 'paragraph',
				text: 'By using this site, you consent to data processing needed to provide requested services and communications.'
			},
			{
				type: 'paragraph',
				text: 'To request data updates or deletion, contact More Freedom Ahead directly through the contact form.'
			}
		]
	},
	terms: {
		slug: 'terms',
		title: 'Terms and Conditions of Use',
		blocks: [
			{
				type: 'paragraph',
				text: 'By visiting and using this website, you agree to these Terms and Conditions of Use.'
			},
			{
				type: 'paragraph',
				text: 'Website content is protected by intellectual property laws and is for personal, noncommercial use only.'
			},
			{
				type: 'paragraph',
				text: 'Information on this site is educational and informational and does not constitute professional legal, financial, medical, or mental health advice.'
			}
		]
	}
};

export function getSitePage(slug: string) {
	return sitePages[slug] ?? null;
}

export function listSitePageOptions() {
	return Object.values(sitePages).map((page) => ({
		slug: page.slug,
		title: page.title
	}));
}

/**
 * Seeds the starter site content into Sanity from the original hardcoded copy.
 * Safe to re-run: it only creates pages that do not exist yet.
 *
 *   pnpm seed
 */
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2026-05-15' });

const key = () => crypto.randomUUID().replace(/-/g, '').slice(0, 12);

const span = (text: string, marks: string[] = []) => ({ _type: 'span', _key: key(), text, marks });
const block = (children: ReturnType<typeof span>[], style = 'normal', extra = {}) => ({
	_type: 'block',
	_key: key(),
	style,
	markDefs: [],
	children,
	...extra
});
const p = (text: string) => block([span(text)]);
const h = (text: string) => block([span(text)], 'h2');
const bullets = (items: string[]) =>
	items.map((text) => block([span(text)], 'normal', { listItem: 'bullet', level: 1 }));

const section = <T extends object>(type: string, fields: T) => ({
	_type: type,
	_key: key(),
	...fields
});

const pages = [
	{
		title: "There's more freedom ahead, sis.",
		slug: 'home',
		sections: [
			section('hero', {
				headline: "There's more freedom ahead, sis.",
				lines: [
					'Jesus is ready to breathe more healing into your story.',
					'What if healing with Jesus could feel less daunting and more like coming home to His love?'
				],
				ctaLabel: 'Join an Upcoming Retreat',
				ctaHref: '/events'
			}),
			section('introSplit', {
				heading: 'Healing with Jesus can feel like coming home.',
				body: [
					p(
						'Knowing Jesus means a lifetime of watching His love unfold through healing, freedom, and redemption.'
					),
					p(
						'The places that feel stuck are not permanent. The God of the impossible is still doing a new thing.'
					)
				],
				cardText: [
					block([
						span('Join my email list', ['strong']),
						span(
							' to receive practical encouragement and be first to hear about retreats and gatherings.'
						)
					])
				],
				cardButtonLabel: 'Stay in the Loop',
				cardButtonHref: '/contact'
			}),
			section('featureGrid', {
				heading: 'What we believe for you...',
				items: [
					{ _key: key(), title: 'Jesus is eager to heal you.' },
					{ _key: key(), title: 'Holy Spirit leads the process – pressure off.' },
					{ _key: key(), title: "It's time to walk confidently in freedom promised." }
				]
			}),
			section('featureGrid', {
				heading: 'Let the Spirit restore your faith',
				items: [
					{
						_key: key(),
						title: 'Loves to Speak to You',
						body: 'Together we create space to listen, bring your needs honestly, and reconnect to His nearness.'
					},
					{
						_key: key(),
						title: 'Is Trustworthy',
						body: 'We process hurt with Him and recover His true character as good, gentle, and powerful.'
					},
					{
						_key: key(),
						title: 'Wants to Bring Healing',
						body: 'Emotional restoration, physical healing, and redemption in the details of your story.'
					}
				]
			}),
			section('cardGrid', {
				heading: 'Join an encounter',
				intro: "Space for you to sense, feel, and receive the Lord's soul-deep refreshing.",
				cards: [
					{
						_key: key(),
						title: 'Retreats',
						description: 'Immersive spaces to rest, listen, and receive.',
						href: '/events',
						buttonLabel: 'Learn more'
					},
					{
						_key: key(),
						title: 'Speaking',
						description: 'Spirit-led messages that move women from fear to trust.',
						href: '/speaking',
						buttonLabel: 'Learn more'
					},
					{
						_key: key(),
						title: '1:1 Support',
						description: 'Personal discipleship for healing, surrender, and steady growth.',
						href: '/contact',
						buttonLabel: 'Learn more'
					}
				]
			}),
			section('eventsList', {
				heading: 'Upcoming Events',
				emptyText: 'Events are coming soon. Join the newsletter and be first to hear.'
			}),
			section('testimonials', {
				heading: 'Past retreat attendees say...',
				items: [
					{
						_key: key(),
						quote:
							'God spoke so clearly during the times of reflection as well as through each other. The whole weekend felt surrounded by Holy Spirit.',
						author: 'Kailyn Van Schooten'
					},
					{
						_key: key(),
						quote:
							'The times of meditation, having a little bit of form helped me enjoy seeking the Lord without the pressure to have definitive answers.',
						author: 'Kaylen Tanner'
					}
				]
			})
		]
	},
	{
		title: 'About More Freedom Ahead',
		slug: 'about',
		sections: [
			section('textSection', {
				body: [
					p(
						"Hey there, I'm Taryn Marchena, founder of More Freedom Ahead — a ministry that helps women break free from fear and shame so they can experience the intimate love of Jesus."
					),
					p('Life with Jesus is a pilgrimage. A holy, intentional journey. One of delight.'),
					p(
						'Our goal is to soften hearts to surrender so women feel safe enough to open to God for the first time or once again.'
					),
					p(
						'Ready to experience more freedom for yourself? Sign up for the newsletter to hear about upcoming retreats and events.'
					)
				]
			}),
			section('formSection', {
				formType: 'newsletter',
				heading: 'Stay in the Loop',
				successMessage: 'Thanks for subscribing!'
			})
		]
	},
	{
		title: "Bring Taryn to your next women's event!",
		slug: 'speaking',
		sections: [
			section('textSection', {
				body: [
					p(
						'Taryn is a Spirit-led speaker who brings emotional depth, biblical truth, and vulnerable storytelling to every room.'
					),
					p(
						'She helps women move from self-protective to secure trust in Jesus — leaving them changed, not just inspired.'
					),
					h('Keynote Topics'),
					...bullets([
						"I Want to Hope for More, But I Don't Want to Be Let Down",
						'How Honest Faith Breaks the Chains of Perfectionism',
						'Is this fear or my gut? Cultivating Holy Spirit Discernment',
						'Trusting God When You Wonder if Everything Will Be Okay'
					])
				]
			}),
			section('testimonials', {
				items: [
					{
						_key: key(),
						quote:
							'Thank you again for coming and being a wonderful first speaker for us. You set the tone amazingly for the year and we loved you!',
						author: 'Brenna Cline'
					}
				]
			}),
			section('formSection', {
				formType: 'speaking',
				heading: 'Request Taryn for your event',
				successMessage: "Thank you! I'll be in touch about availability soon."
			})
		]
	},
	{
		title: 'Get in touch',
		slug: 'contact',
		sections: [
			section('textSection', {
				body: [p("Reach out and I'll get back to you within the next 2 biz days.")]
			}),
			section('formSection', {
				formType: 'contact',
				heading: 'Contact form',
				successMessage: 'Thanks for reaching out. We will reply soon.'
			}),
			section('callToAction', {
				text: 'Inquiring about bringing me as a speaker to your next event?',
				label: 'Speaking Page',
				href: '/speaking'
			}),
			section('formSection', {
				formType: 'newsletter',
				heading: 'Stay in the Loop',
				successMessage: 'Thanks for subscribing!'
			})
		]
	},
	{
		title: 'Donate',
		slug: 'donate',
		sections: [
			section('donateSection', {
				heading: 'Supporting Our Ministry Means More Women Encounter Jesus and Walk in Freedom.',
				body: [
					p(
						'Your generosity helps women break free from the pain of their past, find safety in God’s presence, and step boldly into the purpose He designed for them.'
					),
					...bullets(['Give', 'Share', 'Pray'])
				],
				buttonLabel: 'Give securely'
			})
		]
	},
	{
		title: 'Privacy Policy',
		slug: 'privacy',
		sections: [
			section('textSection', {
				body: [
					p(
						'This site collects only the information submitted through forms (name, email, message, and event inquiry details) to respond to requests and provide updates.'
					),
					p(
						'By using this site, you consent to data processing needed to provide requested services and communications.'
					),
					p(
						'To request data updates or deletion, contact More Freedom Ahead directly through the contact form.'
					)
				]
			})
		]
	},
	{
		title: 'Terms and Conditions of Use',
		slug: 'terms',
		sections: [
			section('textSection', {
				body: [
					p('By visiting and using this website, you agree to these Terms and Conditions of Use.'),
					p(
						'Website content is protected by intellectual property laws and is for personal, noncommercial use only.'
					),
					p(
						'Information on this site is educational and informational and does not constitute professional legal, financial, medical, or mental health advice.'
					)
				]
			})
		]
	}
];

async function main() {
	await client.createIfNotExists({
		_id: 'siteSettings',
		_type: 'siteSettings',
		siteName: 'More Freedom Ahead',
		description:
			'More Freedom Ahead helps women encounter Jesus through retreats, speaking, and discipleship.',
		navigation: [
			['Home', '/'],
			['Speaking', '/speaking'],
			['About', '/about'],
			['Contact', '/contact'],
			['Donate', '/donate'],
			['Events', '/events']
		].map(([label, href]) => ({ _key: key(), label, href })),
		footerTagline: "Encounters for you to experience more of God's presence."
	});

	for (const page of pages) {
		const exists = await client.fetch<boolean>(
			`count(*[_type == "page" && slug.current == $slug]) > 0`,
			{ slug: page.slug }
		);
		if (exists) {
			console.log(`skip   /${page.slug} (already exists)`);
			continue;
		}
		await client.create({
			_type: 'page',
			title: page.title,
			slug: { _type: 'slug', current: page.slug },
			sections: page.sections
		});
		console.log(`create /${page.slug}`);
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

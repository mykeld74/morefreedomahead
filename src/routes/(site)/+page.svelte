<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import backgroundVideo from '$lib/assets/backgroundVideo-compressed.mp4';
	let { data } = $props();
	let encounterAnimationStarted = $state(false);

	const encounterPaths = [
		{
			title: 'Retreats',
			description: 'Immersive spaces to rest, listen, and receive.',
			path: '/events' as const
		},
		{
			title: 'Speaking',
			description: 'Spirit-led messages that move women from fear to trust.',
			path: '/speaking' as const
		},
		{
			title: '1:1 Support',
			description: 'Personal discipleship for healing, surrender, and steady growth.',
			path: '/contact' as const
		}
	];

	const faithPillars = [
		{
			title: 'Loves to Speak to You',
			body: 'Together we create space to listen, bring your needs honestly, and reconnect to His nearness.',
			imageUrl: 'https://picsum.photos/seed/morefreedomfaith1/900/900'
		},
		{
			title: 'Is Trustworthy',
			body: 'We process hurt with Him and recover His true character as good, gentle, and powerful.',
			imageUrl: 'https://picsum.photos/seed/morefreedomfaith2/900/900'
		},
		{
			title: 'Wants to Bring Healing',
			body: 'Emotional restoration, physical healing, and redemption in the details of your story.',
			imageUrl: 'https://picsum.photos/seed/morefreedomfaith3/900/900'
		}
	];

	onMount(() => {
		const sectionNode = document.getElementById('encounterSection');
		if (!sectionNode) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (!entry) {
					return;
				}

				if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
					encounterAnimationStarted = true;
					return;
				}

				/*
				 * Reset only when section is fully out of view below the viewport
				 * so it can replay on the next downward scroll.
				 */
				if (entry.intersectionRatio === 0 && entry.boundingClientRect.top >= window.innerHeight) {
					encounterAnimationStarted = false;
				}
			},
			{
				threshold: [0, 0.75]
			}
		);

		observer.observe(sectionNode);

		return () => observer.disconnect();
	});
</script>

<section class="heroBlock heroFullBleed">
	<video class="heroVideo" autoplay muted loop playsinline preload="metadata">
		<source src={backgroundVideo} type="video/mp4" />
	</video>
	<div class="heroOverlay"></div>
	<div class="heroContent">
		<h1>There's more freedom ahead, sis.</h1>
		<p>Jesus is ready to breathe more healing into your story.</p>
		<p>
			What if healing with Jesus could feel less daunting and more like coming home to His love?
		</p>
		<a class="heroCta" href={resolve('/events')}>Join an Upcoming Retreat</a>
	</div>
</section>

<section class="homeIntro sectionSoft">
	<div>
		<h2>Healing with Jesus can feel like coming home.</h2>
		<p>
			Knowing Jesus means a lifetime of watching His love unfold through healing, freedom, and
			redemption.
		</p>
		<p>
			The places that feel stuck are not permanent. The God of the impossible is still doing a new
			thing.
		</p>
	</div>
	<div class="introAccentCard">
		<p>
			<strong>Join my email list</strong> to receive practical encouragement and be first to hear about
			retreats and gatherings.
		</p>
		<a class="heroCta" href={resolve('/contact')}>Stay in the Loop</a>
	</div>
</section>

<section class="sectionPlain sectionDividerTop keynoteSection">
	<h2>Let the Spirit restore your faith</h2>
	<div class="keynoteGrid">
		{#each faithPillars as pillar (pillar.title)}
			<article class="keynoteCard">
				<img
					class="keynoteImage"
					src={pillar.imageUrl}
					alt={`Placeholder image for ${pillar.title}`}
				/>
				<h3>{pillar.title}</h3>
				<p>{pillar.body}</p>
			</article>
		{/each}
	</div>
</section>

<section
	id="encounterSection"
	class="sectionPlain encounterSection"
	class:encounterSectionActive={encounterAnimationStarted}
>
	<h2>Join an encounter</h2>
	<p>Space for you to sense, feel, and receive the Lord's soul-deep refreshing.</p>
	<div class="flowGrid">
		{#each encounterPaths as item (item.title)}
			<article class="featureItem">
				<h3>{item.title}</h3>
				<p>{item.description}</p>
				<a href={resolve(item.path)}>Learn more</a>
			</article>
		{/each}
	</div>
</section>

<section class="sectionSoft">
	<h2>Upcoming Events</h2>
	{#if data.events.length === 0}
		<p>Events are coming soon. Join the newsletter and be first to hear.</p>
	{:else}
		<div class="flowGrid">
			{#each data.events as event (event.id)}
				<article class="eventItem">
					<h3>{event.title}</h3>
					<p>{event.location}</p>
					<p>{new Date(event.startAt).toLocaleDateString()}</p>
					<a href={resolve(`/events/${event.slug}`)}>View event</a>
				</article>
			{/each}
		</div>
	{/if}
</section>

<section class="sectionPlain">
	<h2>Past retreat attendees say...</h2>
	{#if data.testimonials.length === 0}
		<p>Testimonials can be added from the admin panel.</p>
	{:else}
		<div class="testimonialGrid">
			{#each data.testimonials as item (item.id)}
				<blockquote class="testimonialItem">
					"{item.quote}"
					<footer>{item.authorName}</footer>
				</blockquote>
			{/each}
		</div>
	{/if}
</section>

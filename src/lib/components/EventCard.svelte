<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatEventWhen } from '$lib/sanity/format';
	import type { EventSummary } from '$lib/sanity/types';
	import SanityImage from './SanityImage.svelte';

	let { event }: { event: EventSummary } = $props();
</script>

<article class="eventItem eventCard">
	{#if event.image}
		<SanityImage
			class="eventImage"
			image={event.image}
			alt={event.title}
			width={800}
			height={500}
		/>
	{/if}
	<h3><a href={resolve(`/events/${event.slug}`)}>{event.title}</a></h3>
	{#if event.location}<p>{event.location}</p>{/if}
	<p>{formatEventWhen(event.startAt, event.endAt)}</p>
	{#if event.summary}<p>{event.summary}</p>{/if}
	<a href={resolve(`/events/${event.slug}`)}>View event</a>
</article>

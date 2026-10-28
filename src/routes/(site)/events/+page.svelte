<script lang="ts">
	import { useQuery } from '@sanity/sveltekit';
	import EventCard from '$lib/components/EventCard.svelte';
	import type { EventSummary } from '$lib/sanity/types';

	let { data } = $props();

	const upcomingStore = $derived(
		useQuery<EventSummary[]>({ query: data.upcomingQuery, options: data.upcomingOptions })
	);
	const pastStore = $derived(
		useQuery<EventSummary[]>({ query: data.pastQuery, options: data.pastOptions })
	);
	const upcoming = $derived($upcomingStore.data ?? []);
	const past = $derived($pastStore.data ?? []);
</script>

<svelte:head><title>Events</title></svelte:head>

<h1 class="pageTitle">Events</h1>

<section class="sectionSoft">
	<h2>Upcoming</h2>
	{#if upcoming.length === 0}
		<p>New events are coming soon. Check back or join the email list to be first to hear.</p>
	{:else}
		<div class="flowGrid">
			{#each upcoming as event (event._id)}
				<EventCard {event} />
			{/each}
		</div>
	{/if}
</section>

{#if past.length}
	<section class="sectionPlain">
		<h2>Past events</h2>
		<div class="flowGrid">
			{#each past as event (event._id)}
				<EventCard {event} />
			{/each}
		</div>
	</section>
{/if}

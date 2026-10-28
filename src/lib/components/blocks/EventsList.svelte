<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';
	import type { EventsListBlock } from '$lib/sanity/types';

	let { block }: { block: EventsListBlock } = $props();

	const events = $derived((block.events ?? []).slice(0, block.maxItems ?? 24));
</script>

<section class="sectionSoft">
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	{#if events.length === 0}
		<p>{block.emptyText}</p>
	{:else}
		<div class="flowGrid">
			{#each events as event (event._id)}
				<EventCard {event} />
			{/each}
		</div>
	{/if}
</section>

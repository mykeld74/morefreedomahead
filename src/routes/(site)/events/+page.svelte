<script lang="ts">
	import EventCard from '$lib/components/EventCard.svelte';

	let { data } = $props();
</script>

<h1>Events</h1>
{#if data.events.length === 0}
	<p>No events have been published yet.</p>
{:else}
	<div class="flowGrid">
		{#each data.events as event (event.id)}
			<EventCard {event} />
		{/each}
	</div>
{/if}

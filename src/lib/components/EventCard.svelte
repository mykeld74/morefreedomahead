<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from '$routes/(site)/events/$types';

	type EventItem = PageData['events'][number];

	let { event }: { event: EventItem } = $props();

	const formatDate = (value: Date | string) =>
		new Intl.DateTimeFormat('en-US', {
			dateStyle: 'medium',
			timeStyle: 'short'
		}).format(new Date(value));
</script>

<article class="eventItem eventCard">
	<h2>
		<a href={resolve(`/events/${event.slug}`)}>{event.title}</a>
	</h2>
	<p>{event.location}</p>
	<p>{formatDate(event.startAt)}</p>
	<a href={resolve(`/events/${event.slug}`)}>View event</a>
</article>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { stegaClean, useQuery } from '@sanity/sveltekit';
	import RichText from '$lib/components/RichText.svelte';
	import SanityImage from '$lib/components/SanityImage.svelte';
	import SmartLink from '$lib/components/SmartLink.svelte';
	import { formatEventWhen, formatPrice } from '$lib/sanity/format';
	import type { EventDoc } from '$lib/sanity/types';

	let { data, form } = $props();

	const store = $derived(useQuery<EventDoc | null>(data));
	const event = $derived($store.data);
	const mode = $derived(stegaClean(event?.registrationMode) ?? 'stripe');
	let submitting = $state(false);
</script>

<svelte:head>
	{#if event}
		<title>{event.seo?.title || event.title}</title>
		{#if event.seo?.description || event.summary}
			<meta name="description" content={event.seo?.description || event.summary} />
		{/if}
	{/if}
</svelte:head>

{#if event}
	<article class="eventDetail">
		<h1>{event.title}</h1>
		<p>{formatEventWhen(event.startAt, event.endAt)}</p>
		{#if event.location}<p>{event.location}</p>{/if}
		<SanityImage class="eventImage" image={event.image} alt={event.title} width={1400} />
		<RichText value={event.body} />
	</article>

	{#if mode === 'external' && event.externalUrl && !event.registrationClosed}
		<section class="sectionSoft ctaSection">
			<SmartLink class="heroCta" href={event.externalUrl}>Register</SmartLink>
		</section>
	{:else if mode === 'stripe'}
		<section class="sectionSoft">
			<h2>Register</h2>
			{#if event.registrationClosed}
				<p>Registration for this event is closed.</p>
			{:else if !event.tickets?.length}
				<p>Registration for this event isn’t open yet. Check back soon!</p>
			{:else}
				<form
					method="POST"
					action="?/register"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							await update({ reset: false });
							submitting = false;
						};
					}}
				>
					<label>Name <input name="name" autocomplete="name" required /></label>
					<label>Email <input type="email" name="email" autocomplete="email" required /></label>
					<label>Phone <input name="phone" autocomplete="tel" /></label>
					<label>
						Ticket
						<select name="ticketKey" required>
							{#each event.tickets as ticket (ticket._key)}
								<option value={ticket._key}>
									{ticket.name} – {formatPrice(ticket.price)}
								</option>
							{/each}
						</select>
					</label>
					<label>Quantity <input type="number" name="quantity" min="1" max="10" value="1" /></label>
					<button type="submit" disabled={submitting}>
						{submitting ? 'One moment…' : 'Continue'}
					</button>
				</form>
				{#if form?.error}<p class="formMessage" role="alert">{form.error}</p>{/if}
			{/if}
		</section>
	{/if}
{/if}

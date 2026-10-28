<script lang="ts">
	import { enhance } from '$app/forms';
	import { stegaClean } from '@sanity/sveltekit';
	import type { FormSectionBlock } from '$lib/sanity/types';

	type FormResult = { key?: string; success?: boolean; error?: string } | null | undefined;

	let { block, form }: { block: FormSectionBlock; form?: FormResult } = $props();

	const formType = $derived(stegaClean(block.formType));
	const result = $derived(form?.key === block._key ? form : undefined);
	let sending = $state(false);
</script>

<section class="sectionPlain formSection">
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	{#if block.intro}<p>{block.intro}</p>{/if}

	{#if result?.success}
		<p class="formMessage" role="status">
			{block.successMessage || 'Thank you! We will be in touch soon.'}
		</p>
	{:else}
		<form
			method="POST"
			action={`?/${formType}`}
			use:enhance={() => {
				sending = true;
				return async ({ update }) => {
					await update({ reset: false });
					sending = false;
				};
			}}
		>
			<input type="hidden" name="key" value={block._key} />
			<input
				type="text"
				name="website"
				class="honeypot"
				tabindex="-1"
				autocomplete="off"
				aria-hidden="true"
			/>

			{#if formType !== 'newsletter'}
				<label>Name <input name="name" autocomplete="name" /></label>
			{/if}
			<label>Email <input name="email" type="email" autocomplete="email" required /></label>

			{#if formType === 'speaking'}
				<label>Organization <input name="organization" /></label>
				<label>Event date <input name="eventDate" /></label>
				<label>Event location <input name="location" /></label>
			{/if}

			{#if formType !== 'newsletter'}
				<label>
					{formType === 'speaking' ? 'Tell me about your event' : 'Message'}
					<textarea name="message" rows="5" required></textarea>
				</label>
			{/if}

			<button type="submit" disabled={sending}>
				{sending ? 'Sending…' : formType === 'newsletter' ? 'Subscribe' : 'Submit'}
			</button>
		</form>
		{#if result?.error}<p class="formMessage" role="alert">{result.error}</p>{/if}
	{/if}
</section>

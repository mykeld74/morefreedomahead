<script lang="ts">
	import { onMount, type Component } from 'svelte';

	// Loaded in the browser only so the Cloudflare worker bundle never includes the Studio.
	let Studio = $state<Component | null>(null);

	onMount(async () => {
		const [{ SanityStudio }, { default: config }] = await Promise.all([
			import('@sanity/sveltekit'),
			import('../../../../sanity.config')
		]);
		Studio = (() => null) as unknown as Component;
		Studio = SanityStudio as unknown as Component;
		studioConfig = config;
	});

	let studioConfig = $state<unknown>(null);
</script>

{#if Studio && studioConfig}
	<Studio config={studioConfig} />
{/if}

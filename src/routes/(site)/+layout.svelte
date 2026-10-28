<script lang="ts">
	import { useQuery } from '@sanity/sveltekit';
	import '$lib/css/reset.css';
	import '$lib/css/styles.css';
	import SiteNav from '$lib/components/SiteNav.svelte';
	import type { SiteSettings } from '$lib/sanity/types';

	let { data, children } = $props();
	const currentYear = new Date().getFullYear();

	const settingsStore = $derived(
		useQuery<SiteSettings | null>({
			query: data.settingsQuery,
			options: data.settingsOptions
		})
	);
	const settings = $derived($settingsStore.data);
</script>

<svelte:head>
	{#if settings?.description}
		<meta name="description" content={settings.description} />
	{/if}
</svelte:head>

<div class="siteShell">
	<SiteNav links={settings?.navigation ?? []} />

	<main class="container siteMain">
		{@render children()}
	</main>

	<footer class="siteFooter">
		<div class="container">
			{#if settings?.footerTagline}<p class="footerTagline">{settings.footerTagline}</p>{/if}
			<p class="footerCopyright">&copy;{currentYear} More Freedom Ahead. All rights reserved.</p>
		</div>
	</footer>
</div>

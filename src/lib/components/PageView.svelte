<script lang="ts">
	import { useQuery } from '@sanity/sveltekit';
	import PageBuilder from '$lib/components/PageBuilder.svelte';
	import type { PageDoc } from '$lib/sanity/types';

	type FormResult = { key?: string; success?: boolean; error?: string } | null;

	let {
		data,
		form
	}: {
		data: Parameters<typeof useQuery<PageDoc | null>>[0];
		form?: FormResult;
	} = $props();

	const store = $derived(useQuery<PageDoc | null>(data));
	const page = $derived($store.data);
	const startsWithHero = $derived(page?.sections?.[0]?._type === 'hero');
</script>

<svelte:head>
	{#if page}
		<title>{page.seo?.title || page.title}</title>
		{#if page.seo?.description}
			<meta name="description" content={page.seo.description} />
		{/if}
	{/if}
</svelte:head>

{#if page}
	{#if !startsWithHero}
		<h1 class="pageTitle">{page.title}</h1>
	{/if}
	<PageBuilder sections={page.sections} {form} />
{/if}

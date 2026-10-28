<script lang="ts">
	import { PreviewMode, QueryLoader, VisualEditing } from '@sanity/sveltekit';
	import favicon from '$lib/assets/favicon.svg';
	import { client } from '$lib/sanity/client';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	// svelte-ignore state_referenced_locally
	const { previewEnabled } = data;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="https://use.typekit.net/dws8ord.css" />
</svelte:head>

<PreviewMode enabled={previewEnabled}>
	<VisualEditing enabled={previewEnabled}>
		<QueryLoader enabled={previewEnabled} {client}>
			{@render children()}
		</QueryLoader>
	</VisualEditing>
</PreviewMode>

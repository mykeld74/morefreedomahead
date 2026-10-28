<script lang="ts">
	import type { Snippet } from 'svelte';
	import { stegaClean } from '@sanity/sveltekit';
	import { resolve } from '$app/paths';

	let {
		href,
		class: className,
		children
	}: { href?: string; class?: string; children: Snippet } = $props();

	const clean = $derived(stegaClean(href) ?? '');
	const external = $derived(/^https?:\/\//.test(clean));
	const direct = $derived(/^(https?:|mailto:|tel:)/.test(clean));
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- hrefs come from the CMS and may be external; internal ones go through resolve() -->

{#if clean}
	<a
		class={className}
		href={direct ? clean : resolve(clean as '/')}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
	>
		{@render children()}
	</a>
{/if}

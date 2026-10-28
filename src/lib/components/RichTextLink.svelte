<script lang="ts">
	import type { Snippet } from 'svelte';
	import { stegaClean } from '@sanity/sveltekit';
	import { resolve } from '$app/paths';

	let {
		portableText,
		children
	}: { portableText: { value?: { href?: string } }; children?: Snippet } = $props();

	const href = $derived(stegaClean(portableText.value?.href) ?? '#');
	const external = $derived(/^https?:\/\//.test(href));
	const direct = $derived(/^(https?:|mailto:|tel:)/.test(href));
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- hrefs come from the CMS and may be external; internal ones go through resolve() -->

<a
	href={direct ? href : resolve(href as '/')}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener noreferrer' : undefined}
>
	{@render children?.()}
</a>

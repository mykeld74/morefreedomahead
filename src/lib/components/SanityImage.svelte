<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import type { SanityImage } from '$lib/sanity/types';

	let {
		image,
		alt = '',
		width = 900,
		height,
		class: className
	}: {
		image?: SanityImage;
		alt?: string;
		width?: number;
		height?: number;
		class?: string;
	} = $props();

	const src = $derived.by(() => {
		if (!image?.asset) return undefined;
		const builder = urlFor(image).width(width).auto('format');
		return (height ? builder.height(height).fit('crop') : builder).url();
	});
</script>

{#if src}
	<img class={className} {src} alt={image?.alt || alt} loading="lazy" />
{/if}

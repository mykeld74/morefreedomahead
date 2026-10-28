<script lang="ts">
	import { urlFor } from '$lib/sanity/image';
	import type { SanityImage } from '$lib/sanity/types';

	let { portableText }: { portableText: { value: SanityImage } } = $props();
	const image = $derived(portableText.value);
</script>

{#if image?.asset}
	<img
		class="richImage"
		src={urlFor(image).width(1200).auto('format').url()}
		alt={image.alt ?? ''}
		loading="lazy"
	/>
{/if}

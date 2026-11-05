<script lang="ts">
	import { stegaClean } from '@sanity/sveltekit';
	import RichText from '$lib/components/RichText.svelte';
	import SanityImage from '$lib/components/SanityImage.svelte';
	import SmartLink from '$lib/components/SmartLink.svelte';
	import type { MediaTextBlock } from '$lib/sanity/types';

	let { block }: { block: MediaTextBlock } = $props();
</script>

<section
	class="sectionPlain mediaText"
	class:mediaTextRight={stegaClean(block.imageSide) === 'right'}
>
	<SanityImage class="mediaTextImage" image={block.image} width={900} />
	<div>
		{#if block.eyebrow}<p class="eyebrow">{block.eyebrow}</p>{/if}
		{#if block.heading}<h2>{block.heading}</h2>{/if}
		<RichText value={block.body} />
		{#if block.buttonLabel}
			<SmartLink class="heroCta" href={block.buttonHref}>{block.buttonLabel}</SmartLink>
		{/if}
	</div>
</section>

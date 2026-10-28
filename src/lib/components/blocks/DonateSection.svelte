<script lang="ts">
	import RichText from '$lib/components/RichText.svelte';
	import SmartLink from '$lib/components/SmartLink.svelte';
	import type { DonateSectionBlock } from '$lib/sanity/types';

	let { block }: { block: DonateSectionBlock } = $props();
</script>

<section class="sectionSoft ctaSection">
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	<RichText value={block.body} />
	{#if block.buttonHref}
		<SmartLink class="heroCta" href={block.buttonHref}
			>{block.buttonLabel || 'Give securely'}</SmartLink
		>
	{/if}
</section>

<script lang="ts">
	import RichText from '$lib/components/RichText.svelte';
	import SmartLink from '$lib/components/SmartLink.svelte';
	import type { DonateSectionBlock } from '$lib/sanity/types';

	let { block }: { block: DonateSectionBlock } = $props();
</script>

<section class="textDark donateBand" class:bandCurved={block.curvedEdge}>
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	<div class="textBody"><RichText value={block.body} /></div>
	{#if block.buttonHref}
		<SmartLink class="heroCta" href={block.buttonHref}
			>{block.buttonLabel || 'Give securely'}</SmartLink
		>
	{/if}
</section>

<script lang="ts">
	import { bandClass } from '$lib/sanity/band';
	import SmartLink from '$lib/components/SmartLink.svelte';
	import type { CallToActionBlock } from '$lib/sanity/types';

	let { block }: { block: CallToActionBlock } = $props();

	const band = $derived(bandClass(block.background, block.curvedEdge));
</script>

<section class="sectionPlain ctaSection {band}">
	{#if block.text}<p>{block.text}</p>{/if}
	<SmartLink class="heroCta" href={block.href}>{block.label}</SmartLink>
</section>

<script lang="ts">
	import { bandClass } from '$lib/sanity/band';
	import RichText from '$lib/components/RichText.svelte';
	import type { FaqBlock } from '$lib/sanity/types';

	let { block }: { block: FaqBlock } = $props();

	const band = $derived(bandClass(block.background, block.curvedEdge));
</script>

<section class="sectionPlain faqSection {band}">
	{#if block.eyebrow}<p class="eyebrow">{block.eyebrow}</p>{/if}
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	{#each block.items ?? [] as item (item._key)}
		<details class="faqItem">
			<summary>{item.question}</summary>
			<RichText value={item.answer} />
		</details>
	{/each}
</section>

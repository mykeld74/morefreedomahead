<script lang="ts">
	import RichText from '$lib/components/RichText.svelte';
	import type { FaqBlock } from '$lib/sanity/types';

	let { block }: { block: FaqBlock } = $props();
</script>

<section class="sectionPlain faqSection">
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	{#each block.items ?? [] as item (item._key)}
		<details class="faqItem">
			<summary>{item.question}</summary>
			<RichText value={item.answer} />
		</details>
	{/each}
</section>

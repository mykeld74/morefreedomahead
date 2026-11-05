<script lang="ts">
	import { bandClass } from '$lib/sanity/band';
	import type { TestimonialsBlock } from '$lib/sanity/types';

	let { block }: { block: TestimonialsBlock } = $props();

	const band = $derived(bandClass(block.background, block.curvedEdge));
</script>

<section class="sectionPlain {band}">
	{#if block.eyebrow}<p class="eyebrow">{block.eyebrow}</p>{/if}
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	<div class="testimonialGrid">
		{#each block.items ?? [] as item (item._key)}
			<blockquote class="testimonialItem">
				“{item.quote}”
				{#if item.author}<footer>{item.author}</footer>{/if}
			</blockquote>
		{/each}
	</div>
</section>

<script lang="ts">
	import { bandClass } from '$lib/sanity/band';
	import type { FeatureGridBlock } from '$lib/sanity/types';

	let { block }: { block: FeatureGridBlock } = $props();

	const band = $derived(bandClass(block.background, block.curvedEdge));
</script>

<section class="beliefsSection {band}">
	{#if block.eyebrow}<p class="eyebrow">{block.eyebrow}</p>{/if}
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	<div class="beliefsGrid">
		{#each block.items ?? [] as item (item._key)}
			<article class="beliefColumn">
				<h3>{item.title}</h3>
				{#if item.body}<p class="beliefBody">{item.body}</p>{/if}
			</article>
		{/each}
	</div>
</section>

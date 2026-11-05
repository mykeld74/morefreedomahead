<script lang="ts">
	import { bandClass } from '$lib/sanity/band';
	import type { PullQuoteBlock } from '$lib/sanity/types';

	let { block }: { block: PullQuoteBlock } = $props();

	const band = $derived(bandClass(block.background, block.curvedEdge));
</script>

<section class="sectionPlain {band}">
	<blockquote class="pullQuote">
		<p>“{block.quote}”</p>
		{#if block.attribution}<footer>{block.attribution}</footer>{/if}
	</blockquote>
</section>

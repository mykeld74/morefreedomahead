<script lang="ts">
	import type { PullQuoteBlock } from '$lib/sanity/types';

	let { block }: { block: PullQuoteBlock } = $props();
</script>

<section class="sectionPlain">
	<blockquote class="pullQuote">
		<p>“{block.quote}”</p>
		{#if block.attribution}<footer>{block.attribution}</footer>{/if}
	</blockquote>
</section>

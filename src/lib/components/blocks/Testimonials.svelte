<script lang="ts">
	import type { TestimonialsBlock } from '$lib/sanity/types';

	let { block }: { block: TestimonialsBlock } = $props();
</script>

<section class="sectionPlain">
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

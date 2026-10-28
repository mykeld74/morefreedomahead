<script lang="ts">
	import { stegaClean } from '@sanity/sveltekit';
	import RichText from '$lib/components/RichText.svelte';
	import type { TextSectionBlock } from '$lib/sanity/types';

	let { block }: { block: TextSectionBlock } = $props();
</script>

<section class={stegaClean(block.style) === 'soft' ? 'sectionSoft' : 'sectionPlain'}>
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	<RichText value={block.body} />
</section>

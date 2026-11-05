<script lang="ts">
	import { stegaClean } from '@sanity/sveltekit';
	import RichText from '$lib/components/RichText.svelte';
	import type { TextSectionBlock } from '$lib/sanity/types';

	let { block }: { block: TextSectionBlock } = $props();

	const looks: Record<string, string> = {
		plain: 'sectionPlain',
		soft: 'sectionSoft',
		statement: 'sectionPlain textStatement',
		dark: 'textDark',
		charcoal: 'textDark textCharcoal',
		split: 'sectionPlain textSplit'
	};
</script>

<section
	class={`textSection ${looks[stegaClean(block.style) ?? 'plain'] ?? looks.plain}${block.curvedEdge ? ' bandCurved' : ''}`}
>
	{#if block.eyebrow}<p class="eyebrow">{block.eyebrow}</p>{/if}
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	<div class="textBody"><RichText value={block.body} /></div>
</section>

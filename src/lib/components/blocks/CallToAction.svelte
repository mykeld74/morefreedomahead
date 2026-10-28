<script lang="ts">
	import SmartLink from '$lib/components/SmartLink.svelte';
	import type { CallToActionBlock } from '$lib/sanity/types';

	let { block }: { block: CallToActionBlock } = $props();
</script>

<section class="sectionPlain ctaSection">
	{#if block.text}<p>{block.text}</p>{/if}
	<SmartLink class="heroCta" href={block.href}>{block.label}</SmartLink>
</section>

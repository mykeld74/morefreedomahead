<script lang="ts">
	import RichText from '$lib/components/RichText.svelte';
	import SmartLink from '$lib/components/SmartLink.svelte';
	import type { IntroSplitBlock } from '$lib/sanity/types';

	let { block }: { block: IntroSplitBlock } = $props();
</script>

<section class="homeIntro sectionSoft" class:bandCurved={block.curvedEdge}>
	<div>
		{#if block.eyebrow}<p class="eyebrow">{block.eyebrow}</p>{/if}
		{#if block.heading}<h2>{block.heading}</h2>{/if}
		<RichText value={block.body} />
	</div>
	{#if block.cardText?.length || block.cardButtonLabel}
		<div class="introAccentCard">
			<RichText value={block.cardText} />
			{#if block.cardButtonLabel}
				<SmartLink class="heroCta" href={block.cardButtonHref}>{block.cardButtonLabel}</SmartLink>
			{/if}
		</div>
	{/if}
</section>

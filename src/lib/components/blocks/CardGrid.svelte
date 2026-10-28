<script lang="ts">
	import SanityImage from '$lib/components/SanityImage.svelte';
	import SmartLink from '$lib/components/SmartLink.svelte';
	import type { CardGridBlock } from '$lib/sanity/types';

	let { block }: { block: CardGridBlock } = $props();
</script>

<section class="sectionPlain sectionDividerTop keynoteSection">
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	{#if block.intro}<p class="keynoteIntro">{block.intro}</p>{/if}
	<div class="keynoteGrid">
		{#each block.cards ?? [] as card (card._key)}
			<article class="keynoteCard">
				<SanityImage
					class="keynoteImage"
					image={card.image}
					alt={card.title}
					width={900}
					height={900}
				/>
				<h3>{card.title}</h3>
				{#if card.description}<p>{card.description}</p>{/if}
				{#if card.href}
					<SmartLink class="learnMoreButton" href={card.href}
						>{card.buttonLabel || 'Learn more'}</SmartLink
					>
				{/if}
			</article>
		{/each}
	</div>
</section>

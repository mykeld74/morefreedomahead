<script lang="ts">
	import { stegaClean } from '@sanity/sveltekit';
	import SanityImage from '$lib/components/SanityImage.svelte';
	import SmartLink from '$lib/components/SmartLink.svelte';
	import type { CardGridBlock } from '$lib/sanity/types';

	let { block }: { block: CardGridBlock } = $props();

	const tiles = $derived(stegaClean(block.layout) === 'tiles');
</script>

<section class="sectionPlain sectionDividerTop keynoteSection">
	{#if block.eyebrow}<p class="eyebrow">{block.eyebrow}</p>{/if}
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	{#if block.intro}<p class="keynoteIntro">{block.intro}</p>{/if}
	<div class="keynoteGrid" class:tileGrid={tiles}>
		{#each block.cards ?? [] as card (card._key)}
			{#if tiles}
				{#if card.href}
					<SmartLink class="tile" href={card.href}>
						{@render tile(card)}
					</SmartLink>
				{:else}
					<div class="tile">{@render tile(card)}</div>
				{/if}
			{:else}
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
			{/if}
		{/each}
	</div>
</section>

{#snippet tile(card: NonNullable<CardGridBlock['cards']>[number])}
	<SanityImage image={card.image} alt={card.title} width={900} height={700} />
	<span class="tileLabel">{card.title}</span>
{/snippet}

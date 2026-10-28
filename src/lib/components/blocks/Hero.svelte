<script lang="ts">
	import defaultVideo from '$lib/assets/backgroundVideo-compressed.mp4';
	import SanityImage from '$lib/components/SanityImage.svelte';
	import SmartLink from '$lib/components/SmartLink.svelte';
	import type { HeroBlock } from '$lib/sanity/types';

	let { block }: { block: HeroBlock } = $props();

	const useVideo = $derived(Boolean(block.videoUrl) || !block.image);
</script>

<section class="heroBlock heroFullBleed">
	{#if useVideo}
		<video class="heroVideo" autoplay muted loop playsinline preload="metadata">
			<source src={block.videoUrl ?? defaultVideo} type="video/mp4" />
		</video>
	{:else}
		<SanityImage class="heroVideo" image={block.image} width={2000} />
	{/if}
	<div class="heroOverlay"></div>
	<div class="heroContent">
		<h1>{block.headline}</h1>
		{#each block.lines ?? [] as line, i (i)}
			<p>{line}</p>
		{/each}
		{#if block.ctaLabel}
			<SmartLink class="heroCta" href={block.ctaHref}>{block.ctaLabel}</SmartLink>
		{/if}
	</div>
</section>

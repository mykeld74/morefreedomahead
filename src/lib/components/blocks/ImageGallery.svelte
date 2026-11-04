<script lang="ts">
	import SanityImage from '$lib/components/SanityImage.svelte';
	import type { ImageGalleryBlock } from '$lib/sanity/types';

	let { block }: { block: ImageGalleryBlock } = $props();
</script>

<section class="sectionPlain">
	{#if block.heading}<h2>{block.heading}</h2>{/if}
	<div class="galleryGrid">
		{#each block.images ?? [] as image (image._key)}
			<figure>
				<SanityImage {image} width={700} height={700} />
				{#if image.caption}<figcaption>{image.caption}</figcaption>{/if}
			</figure>
		{/each}
	</div>
</section>

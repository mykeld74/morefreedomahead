<script lang="ts">
	import { stegaClean } from '@sanity/sveltekit';
	import type { VideoEmbedBlock } from '$lib/sanity/types';

	let { block }: { block: VideoEmbedBlock } = $props();

	/** Turns a YouTube/Vimeo page link into its privacy-friendly embed address. */
	const embedUrl = $derived.by(() => {
		const url = stegaClean(block.url);
		if (!url) return undefined;
		try {
			const u = new URL(url);
			const host = u.hostname.replace(/^www\./, '');
			if (host === 'youtu.be')
				return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
			if (host.endsWith('youtube.com')) {
				const id = u.searchParams.get('v') ?? u.pathname.split('/').filter(Boolean).pop();
				return id ? `https://www.youtube-nocookie.com/embed/${id}` : undefined;
			}
			if (host.endsWith('vimeo.com')) {
				const id = u.pathname.split('/').filter(Boolean).pop();
				return id ? `https://player.vimeo.com/video/${id}?dnt=1` : undefined;
			}
		} catch {
			return undefined;
		}
		return undefined;
	});
</script>

{#if embedUrl}
	<section class="sectionPlain">
		{#if block.heading}<h2>{block.heading}</h2>{/if}
		<div class="videoFrame">
			<iframe
				src={embedUrl}
				title={block.heading || 'Video'}
				loading="lazy"
				allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
				allowfullscreen
			></iframe>
		</div>
		{#if block.caption}<p class="videoCaption">{block.caption}</p>{/if}
	</section>
{/if}

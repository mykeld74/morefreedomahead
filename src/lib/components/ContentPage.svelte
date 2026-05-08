<script lang="ts">
	import type { ContentBlock } from '$lib/content/siteContent';
	import ContentBlocks from '$lib/components/ContentBlocks.svelte';

	let { title, blocks } = $props<{
		title: string;
		blocks: ContentBlock[];
	}>();
</script>

<section>
	<h1>{title}</h1>
	<ContentBlocks {blocks} />
</section>

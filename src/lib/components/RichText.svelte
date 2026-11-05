<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import type { PortableTextBlock } from '@portabletext/types';
	import RichTextImage from './RichTextImage.svelte';
	import RichTextLink from './RichTextLink.svelte';
	import RichTextScript from './RichTextScript.svelte';

	let { value }: { value?: PortableTextBlock[] } = $props();

	const components = {
		marks: { link: RichTextLink, script: RichTextScript },
		types: { image: RichTextImage }
	};
</script>

{#if value?.length}
	<PortableText {value} {components} />
{/if}

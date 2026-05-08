<script lang="ts">
	import type { ContentBlock } from '$lib/content/siteContent';

	let { blocks } = $props<{ blocks: ContentBlock[] }>();
</script>

{#each blocks as block, index (`${block.type}-${index}`)}
	{#if block.type === 'heading'}
		<h2>{block.text}</h2>
	{:else if block.type === 'paragraph'}
		<p>{block.text}</p>
	{:else if block.type === 'list'}
		<ul>
			{#each block.items as item, itemIndex (`${item}-${itemIndex}`)}
				<li>{item}</li>
			{/each}
		</ul>
	{:else if block.type === 'quote'}
		<blockquote>
			"{block.text}"
			{#if block.author}
				<footer>{block.author}</footer>
			{/if}
		</blockquote>
	{:else if block.type === 'cta'}
		<p>
			{block.text}
			<a href={block.href}>{block.label}</a>
		</p>
	{/if}
{/each}

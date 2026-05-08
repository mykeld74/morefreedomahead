<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	let { data } = $props();
</script>

<ContentPage title={data.page.title} blocks={data.page.blocks} />

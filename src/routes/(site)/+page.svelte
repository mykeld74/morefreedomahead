<script lang="ts">
	import PageView from '$lib/components/PageView.svelte';

	let { data, form } = $props();
</script>

<PageView {data} {form} />

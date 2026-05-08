<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '$lib/css/reset.css';
	import '$lib/css/styles.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="stylesheet" href="https://use.typekit.net/dws8ord.css" />
</svelte:head>

{@render children()}

<script lang="ts">
	import SiteNav from '$lib/components/SiteNav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<meta
		name="description"
		content="More Freedom Ahead helps women encounter Jesus through retreats, speaking, and discipleship."
	/>
</svelte:head>

<div class="siteShell">
	<SiteNav />

	<main class="container siteMain">
		{@render children()}
	</main>

	<footer class="siteFooter">
		<div class="container">
			<p class="footerTagline">Encounters for you to experience more of God's presence.</p>
			<p class="footerCopyright">Copyright © 2026 More Freedom Ahead. All rights reserved.</p>
		</div>
	</footer>
</div>

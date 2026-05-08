<script lang="ts">
	let { children, data } = $props();
</script>

<div class="adminShell">
	<header class="adminHeader">
		<h1>Admin</h1>
		<p class="adminMeta">Signed in as {data.adminEmail}</p>
		<nav class="adminNav" aria-label="Admin sections">
			<a href="/admin">Dashboard</a>
			<a href="/admin/content">Content</a>
			<a href="/admin/events">Events</a>
			<a href="/admin/registrations">Registrations</a>
			<a href="/admin/submissions">Submissions</a>
			<a href="/admin/settings">Settings</a>
		</nav>
	</header>

	<div class="adminPanel">
		{@render children()}
	</div>
</div>

<style>
	.adminShell {
		display: grid;
		gap: 1rem;
		width: min(100%, 1280px);
		margin: 0 auto;
		padding: 1rem 1.2rem 2rem;
	}

	.adminHeader {
		display: grid;
		gap: 0.6rem;
		padding: 1rem;
		background: var(--surfaceColor);
		border: 1px solid var(--lineColor);
		border-radius: 14px;
	}

	.adminMeta {
		margin: 0;
		color: var(--mutedTextColor);
		font-size: 0.95rem;
	}

	.adminNav {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: max-content;
		gap: 0.5rem;
		justify-content: start;
		overflow-x: auto;
		padding-bottom: 0.2rem;
	}

	.adminNav a {
		display: inline-block;
		padding: 0.45rem 0.75rem;
		border: 1px solid var(--lineColor);
		border-radius: 999px;
		background: var(--bgColor);
		font-size: 0.9rem;
		white-space: nowrap;
	}

	.adminPanel {
		display: grid;
		gap: 1rem;
		padding: 1rem;
		background: var(--surfaceColor);
		border: 1px solid var(--lineColor);
		border-radius: 14px;
	}

	.adminPanel :global(h2) {
		margin: 0;
	}

	.adminPanel :global(h3) {
		margin: 0.3rem 0 0;
	}

	.adminPanel :global(form) {
		gap: 0.8rem;
	}

	.adminPanel :global(label) {
		display: grid;
		gap: 0.35rem;
		margin-bottom: 0;
	}

	.adminPanel :global(table) {
		font-size: 0.95rem;
	}

	.adminPanel :global(ul) {
		margin: 0;
	}
</style>

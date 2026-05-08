<script lang="ts">
	let { data } = $props();
</script>

<h2>Overview</h2>
<div class="statGrid">
	<article class="statCard">
		<p class="statLabel">Pages</p>
		<p class="statValue">{data.counts.pages}</p>
	</article>
	<article class="statCard">
		<p class="statLabel">Events</p>
		<p class="statValue">{data.counts.events}</p>
	</article>
	<article class="statCard">
		<p class="statLabel">Submissions</p>
		<p class="statValue">{data.counts.submissions}</p>
	</article>
</div>

<style>
	.statGrid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.75rem;
	}

	.statCard {
		padding: 0.9rem;
		border: 1px solid var(--lineColor);
		border-radius: 12px;
		background: var(--bgColor);
	}

	.statLabel {
		margin: 0;
		font-size: 0.86rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.statValue {
		margin: 0.2rem 0 0;
		font-family: 'Libre Baskerville', Georgia, serif;
		font-size: 1.75rem;
		line-height: 1.1;
		color: var(--textColor);
	}

	@media (max-width: 780px) {
		.statGrid {
			grid-template-columns: 1fr;
		}
	}
</style>

<script lang="ts">
	let { data } = $props();
</script>

<h2>Form Submissions</h2>
{#if data.submissions.length === 0}
	<p>No submissions captured yet.</p>
{:else}
	<ul class="adminList">
		{#each data.submissions as item, index (`${item.email}-${item.type}-${index}`)}
			<li>
				<strong>{item.type}</strong> - {item.email}
				{#if item.name}
					({item.name})
				{/if}
			</li>
		{/each}
	</ul>
{/if}

<style>
	.adminList {
		display: grid;
		gap: 0.5rem;
	}
</style>

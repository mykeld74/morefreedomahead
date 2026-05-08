<script lang="ts">
	let { data, form } = $props();
</script>

<h2>Page Content</h2>
<form method="POST" action="?/save">
	<label>Target page
		<select name="targetPage" required>
			<option value="" disabled selected>Select a page</option>
			{#each data.sitePages as page (page.slug)}
				<option value={page.slug}>{page.slug} - {page.title}</option>
			{/each}
		</select>
	</label>
	<label>Title <input name="title" required /></label>
	<label>Status
		<select name="status">
			<option value="draft">draft</option>
			<option value="published">published</option>
		</select>
	</label>
	<label>Body paragraphs (one per line)
		<textarea name="body" rows="6"></textarea>
	</label>
	<button type="submit">Save</button>
</form>
{#if form?.error}
	<p class="formError">{form.error}</p>
{/if}
{#if form?.success}
	<p class="formSuccess">Saved.</p>
{/if}

<h3>Existing Pages</h3>
<ul class="adminList">
	{#each data.pages as page (page.id)}
		<li><strong>{page.slug}</strong> - {page.title} ({page.status})</li>
	{/each}
</ul>

<style>
	.formError {
		margin: 0;
		color: var(--primaryColor);
	}

	.formSuccess {
		margin: 0;
		color: var(--mutedTextColor);
	}

	.adminList {
		display: grid;
		gap: 0.45rem;
	}
</style>

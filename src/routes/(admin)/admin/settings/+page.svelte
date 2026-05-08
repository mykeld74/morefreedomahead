<script lang="ts">
	let { data, form } = $props();
</script>

<h2>Admin Settings</h2>
<form method="POST" action="?/addAdmin">
	<label>Admin email <input name="email" type="email" required /></label>
	<button type="submit">Add admin</button>
</form>
{#if form?.error}
	<p class="formError">{form.error}</p>
{/if}
{#if form?.success}
	<p class="formSuccess">Admin added.</p>
{/if}

<h3>Current admins</h3>
<ul class="adminList">
	{#each data.adminUsers as user (user.email)}
		<li>{user.email}</li>
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

<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	let { data, form } = $props();
</script>

<ContentPage title={data.page.title} blocks={data.page.blocks} />

<section>
	<h2>Speaking Inquiry</h2>
	<form method="POST">
		<label>Name <input name="name" /></label>
		<label>Email <input type="email" name="email" required /></label>
		<label>Organization <input name="organization" /></label>
		<label>Event Date <input type="date" name="eventDate" /></label>
		<label>Location <input name="location" /></label>
		<label>Event Details <textarea name="message" rows="5" required></textarea></label>
		<button type="submit">Submit</button>
	</form>
	{#if form?.error}
		<p>{form.error}</p>
	{/if}
	{#if form?.success}
		<p>Thanks. We will follow up shortly.</p>
	{/if}
</section>

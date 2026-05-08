<script lang="ts">
	import ContentPage from '$lib/components/ContentPage.svelte';
	let { data, form } = $props();
</script>

<ContentPage title={data.page.title} blocks={data.page.blocks} />

<section>
	<h2>Contact Form</h2>
	<form method="POST" action="?/contact">
		<label>Name <input name="name" /></label>
		<label>Email <input name="email" type="email" required /></label>
		<label>Message <textarea name="message" rows="5" required></textarea></label>
		<button type="submit">Submit</button>
	</form>
	{#if form?.contactError}
		<p>{form.contactError}</p>
	{/if}
	{#if form?.contactSuccess}
		<p>Thanks for reaching out. We will reply soon.</p>
	{/if}
</section>

<section>
	<h2>Stay in the Loop</h2>
	<form method="POST" action="?/newsletter">
		<label>Email <input name="email" type="email" required /></label>
		<button type="submit">Subscribe</button>
	</form>
	{#if form?.newsletterError}
		<p>{form.newsletterError}</p>
	{/if}
	{#if form?.newsletterSuccess}
		<p>Thanks for subscribing.</p>
	{/if}
</section>

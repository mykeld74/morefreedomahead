<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head><title>Registration</title></svelte:head>

<h1 class="pageTitle">
	{data.status === 'pending' ? 'Almost there' : 'You’re registered!'}
</h1>

{#if data.status === 'paid'}
	<p>Thank you! Your payment went through and a receipt is on its way to your email.</p>
{:else if data.status === 'free'}
	<p>Thank you for registering. We’ll be in touch with the details.</p>
{:else if data.status === 'pending'}
	<p>Your payment is still processing. You’ll get a receipt by email as soon as it completes.</p>
{:else}
	<p>Thank you! If you don’t hear from us soon, please reach out through the contact page.</p>
{/if}

<p><a href={resolve('/events')}>Back to events</a></p>

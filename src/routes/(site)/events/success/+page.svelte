<script lang="ts">
	let { data } = $props();
</script>

<h1>Registration received</h1>
{#if data.paid}
	<p>Your payment is confirmed. We sent your event confirmation details to your inbox.</p>
{:else}
	<p>Your registration was received. Payment confirmation may still be processing.</p>
{/if}
<p><a href="/events">Back to events</a></p>

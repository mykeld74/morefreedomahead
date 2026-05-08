<script lang="ts">
	let { data, form } = $props();

	const formatPrice = (priceCents: number, currency: string) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: currency.toUpperCase()
		}).format(priceCents / 100);
</script>

<h1>{data.event.title}</h1>
<p>{data.event.description}</p>
<p>{data.event.location}</p>
<p>{new Date(data.event.startAt).toLocaleString()}</p>

<section>
	<h2>Register</h2>
	<form method="POST" action="?/register">
		<label>Name <input name="name" required /></label>
		<label>Email <input type="email" name="email" required /></label>
		<label>Phone <input name="phone" /></label>
		<label>Ticket
			<select name="ticketId" required>
				{#each data.tickets as ticket (ticket.id)}
					<option value={ticket.id}>
						{ticket.name} - {formatPrice(ticket.priceCents, ticket.currency)}
					</option>
				{/each}
			</select>
		</label>
		<label>Quantity <input type="number" name="quantity" min="1" value="1" /></label>
		<button type="submit">Continue to Payment</button>
	</form>
	{#if form?.error}
		<p>{form.error}</p>
	{/if}
</section>

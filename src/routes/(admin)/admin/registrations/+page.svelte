<script lang="ts">
	let { data, form } = $props();
	let selectedRegistrationId = $state<number | null>(null);
	let dialogClosing = $state(false);
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	const selectedRegistration = $derived(
		selectedRegistrationId === null
			? null
			: (data.registrations.find((row) => row.registrationId === selectedRegistrationId) ?? null)
	);

	const getEditDialog = () =>
		document.getElementById('registrationEditDialog') as HTMLDialogElement | null;

	const openEditModal = (registrationId: number) => {
		selectedRegistrationId = registrationId;
		dialogClosing = false;
		getEditDialog()?.showModal();
	};

	const handleDialogClosed = () => {
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = null;
		}
		dialogClosing = false;
		selectedRegistrationId = null;
	};

	const closeEditModal = () => {
		const editDialog = getEditDialog();
		if (!editDialog?.open || dialogClosing) return;
		dialogClosing = true;
		closeTimer = setTimeout(() => {
			editDialog.close();
		}, 220);
	};

	const toDollars = (cents: number | null) => ((cents ?? 0) / 100).toFixed(2);
</script>

<h2>Registrations</h2>
{#if form?.error}
	<p class="formError">{form.error}</p>
{/if}
{#if form?.success}
	<p class="formSuccess">Registration updated.</p>
{/if}
{#if data.registrations.length === 0}
	<p>No registrations yet.</p>
{:else}
	<div class="tableWrap">
		<table>
		<thead>
			<tr>
				<th>Event</th>
				<th>Name</th>
				<th>Email</th>
				<th>Qty</th>
				<th>Registration</th>
				<th>Payment</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.registrations as row, index (`${row.email}-${row.eventTitle}-${index}`)}
				<tr>
					<td>{row.eventTitle}</td>
					<td>{row.name}</td>
					<td>{row.email}</td>
					<td>{row.quantity}</td>
					<td>{row.registrationStatus}</td>
					<td>{row.paymentStatus ?? 'pending'}</td>
					<td class="rowActions">
						<form method="POST" action="?/confirm">
							<input type="hidden" name="registrationId" value={row.registrationId} />
							<button type="submit" class="smallButton">Confirm</button>
						</form>
						<button type="button" class="smallButton" onclick={() => openEditModal(row.registrationId)}>
							Edit
						</button>
						<form method="POST" action="?/delete">
							<input type="hidden" name="registrationId" value={row.registrationId} />
							<button type="submit" class="smallButton dangerButton">Delete</button>
						</form>
					</td>
				</tr>
			{/each}
		</tbody>
		</table>
	</div>
{/if}

<dialog
	id="registrationEditDialog"
	class="registrationEditDialog"
	class:registrationEditDialogClosing={dialogClosing}
	onclose={handleDialogClosed}
>
	<div class="registrationEditSurface">
		<div class="registrationEditHeader">
			<h3>Edit registration</h3>
			<button type="button" class="registrationEditClose" onclick={closeEditModal} aria-label="Close edit dialog">
				✕
			</button>
		</div>
		{#if selectedRegistration}
			<form method="POST" action="?/update" class="registrationEditForm">
				<input type="hidden" name="registrationId" value={selectedRegistration.registrationId} />
				<label>Name <input name="name" value={selectedRegistration.name} required /></label>
				<label>Email <input name="email" type="email" value={selectedRegistration.email} required /></label>
				<label>Quantity <input name="quantity" type="number" min="1" value={selectedRegistration.quantity} required /></label>
				<label>Price (USD)
					<input
						name="priceDollars"
						type="number"
						min="0"
						step="0.01"
						value={toDollars(selectedRegistration.priceCents)}
						required
					/>
				</label>
				<label>Registration status
					<select name="registrationStatus">
						<option value="pending" selected={selectedRegistration.registrationStatus === 'pending'}>pending</option>
						<option value="confirmed" selected={selectedRegistration.registrationStatus === 'confirmed'}>confirmed</option>
						<option value="cancelled" selected={selectedRegistration.registrationStatus === 'cancelled'}>cancelled</option>
						<option value="checked_in" selected={selectedRegistration.registrationStatus === 'checked_in'}>checked_in</option>
					</select>
				</label>
				<label>Payment status
					<select name="paymentStatus">
						<option value="pending" selected={(selectedRegistration.paymentStatus ?? 'pending') === 'pending'}>pending</option>
						<option value="paid" selected={selectedRegistration.paymentStatus === 'paid'}>paid</option>
						<option value="failed" selected={selectedRegistration.paymentStatus === 'failed'}>failed</option>
						<option value="refunded" selected={selectedRegistration.paymentStatus === 'refunded'}>refunded</option>
					</select>
				</label>
				<div class="registrationEditActions">
					<button type="button" class="registrationEditCancel" onclick={closeEditModal}>Cancel</button>
					<button type="submit">Save changes</button>
				</div>
			</form>
		{/if}
	</div>
</dialog>

<style>
	.tableWrap {
		overflow-x: auto;
	}

	.formError {
		margin: 0 0 0.7rem;
		color: var(--primaryColor);
	}

	.formSuccess {
		margin: 0 0 0.7rem;
		color: var(--mutedTextColor);
	}

	.rowActions {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: max-content;
		gap: 0.35rem;
	}

	.smallButton {
		padding: 0.35rem 0.6rem;
		font-size: 0.82rem;
	}

	.dangerButton {
		background: var(--primaryColor);
	}

	.registrationEditDialog {
		border: 0;
		padding: 0;
		width: min(92vw, 620px);
		max-height: 90dvh;
		background: transparent;
	}

	.registrationEditDialog::backdrop {
		background: var(--textColor);
		opacity: 0.55;
		animation: regBackdropIn 220ms ease;
	}

	.registrationEditDialog.registrationEditDialogClosing::backdrop {
		animation: regBackdropOut 220ms ease forwards;
	}

	.registrationEditSurface {
		display: grid;
		gap: 0.9rem;
		padding: 1rem;
		border: 1px solid var(--lineColor);
		border-radius: 14px;
		background: var(--surfaceColor);
		animation: regModalIn 260ms ease;
	}

	.registrationEditDialog.registrationEditDialogClosing .registrationEditSurface {
		animation: regModalOut 220ms ease forwards;
	}

	.registrationEditHeader {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.5rem;
	}

	.registrationEditClose {
		width: 40px;
		height: 40px;
		padding: 0;
		border-radius: 10px;
	}

	.registrationEditForm {
		display: grid;
		gap: 0.6rem;
	}

	.registrationEditActions {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: max-content;
		justify-content: end;
		gap: 0.5rem;
	}

	.registrationEditCancel {
		background: var(--surfaceColor);
		color: var(--textColor);
		border: 1px solid var(--lineColor);
	}

	@keyframes regBackdropIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 0.55;
		}
	}

	@keyframes regBackdropOut {
		from {
			opacity: 0.55;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes regModalIn {
		from {
			opacity: 0;
			transform: translateY(16px) scale(0.99);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes regModalOut {
		from {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
		to {
			opacity: 0;
			transform: translateY(10px) scale(0.995);
		}
	}
</style>

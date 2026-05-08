<script lang="ts">
	let { data, form } = $props();
	let selectedEventId = $state<number | null>(null);
	let dialogClosing = $state(false);
	let closeTimer: ReturnType<typeof setTimeout> | null = null;

	const toDateTimeLocal = (value: string | Date) => {
		const dateValue = value instanceof Date ? value : new Date(value);
		if (Number.isNaN(dateValue.getTime())) return '';
		return dateValue.toISOString().slice(0, 16);
	};

	const toDollars = (cents: number | null | undefined) => ((cents ?? 0) / 100).toFixed(2);

	const getCurrentEventPriceCents = (
		eventItem: { eventTickets?: Array<{ id: number; priceCents: number }> } | null
	) => {
		if (!eventItem?.eventTickets?.length) return 0;
		const primaryTicket = [...eventItem.eventTickets].sort((a, b) => a.id - b.id)[0];
		return primaryTicket?.priceCents ?? 0;
	};

	const selectedEvent = $derived(
		selectedEventId === null ? null : (data.events.find((item) => item.id === selectedEventId) ?? null)
	);

	const getEditDialog = () => document.getElementById('eventEditDialog') as HTMLDialogElement | null;

	const openEditModal = (eventId: number) => {
		selectedEventId = eventId;
		dialogClosing = false;
		getEditDialog()?.showModal();
	};

	const handleDialogClosed = () => {
		if (closeTimer) {
			clearTimeout(closeTimer);
			closeTimer = null;
		}
		dialogClosing = false;
		selectedEventId = null;
	};

	const closeEditModal = () => {
		const editDialog = getEditDialog();
		if (!editDialog?.open || dialogClosing) return;
		dialogClosing = true;
		closeTimer = setTimeout(() => {
			editDialog.close();
		}, 220);
	};
</script>

<h2>Events</h2>
<form method="POST" action="?/create">
	<label>Title <input name="title" required /></label>
	<p class="formHint">Slug is automatically generated from title and made unique.</p>
	<label>Description <textarea name="description" required></textarea></label>
	<label>Location <input name="location" required /></label>
	<label>Start At <input name="startAt" type="datetime-local" required /></label>
	<label>End At <input name="endAt" type="datetime-local" /></label>
	<label>Capacity <input name="capacity" type="number" min="1" /></label>
	<label>Price (USD) <input name="priceDollars" type="number" min="0" step="0.01" value="0.00" /></label>
	<label>Status
		<select name="status">
			<option value="draft">draft</option>
			<option value="published">published</option>
		</select>
	</label>
	<button type="submit">Create event</button>
</form>
{#if form?.error}
	<p class="formError">{form.error}</p>
{/if}
{#if form?.success}
	<p class="formSuccess">Event created.</p>
{/if}

<ul class="adminList">
	{#each data.events as item (item.id)}
		<li class="eventEditor">
			<div class="eventMeta">
				<strong>{item.title}</strong> ({item.status}) - {new Date(item.startAt).toLocaleString()}<br />
				<span class="eventSlug">/{item.slug}</span>
			</div>
			<button type="button" class="editButton" onclick={() => openEditModal(item.id)}>Edit event</button>
		</li>
	{/each}
</ul>

<dialog
	id="eventEditDialog"
	class="eventEditDialog"
	class:eventEditDialogClosing={dialogClosing}
	onclose={handleDialogClosed}
>
	<div class="eventEditSurface">
		<div class="eventEditHeader">
			<h3>Edit event</h3>
			<button type="button" class="eventEditClose" onclick={closeEditModal} aria-label="Close edit dialog">
				✕
			</button>
		</div>

		{#if selectedEvent}
			<form method="POST" action="?/update" class="eventEditorForm">
				<input type="hidden" name="eventId" value={selectedEvent.id} />
				<label>Title <input name="title" value={selectedEvent.title} required /></label>
				<label>Description
					<textarea name="description" required>{selectedEvent.description}</textarea>
				</label>
				<label>Location <input name="location" value={selectedEvent.location} required /></label>
				<label>Start At
					<input
						name="startAt"
						type="datetime-local"
						value={toDateTimeLocal(selectedEvent.startAt)}
						required
					/>
				</label>
				<label>End At
					<input
						name="endAt"
						type="datetime-local"
						value={selectedEvent.endAt ? toDateTimeLocal(selectedEvent.endAt) : ''}
					/>
				</label>
				<label>Capacity
					<input name="capacity" type="number" min="1" value={selectedEvent.capacity ?? ''} />
				</label>
				<label>Price (USD)
					<input
						name="priceDollars"
						type="number"
						min="0"
						step="0.01"
						value={toDollars(getCurrentEventPriceCents(selectedEvent))}
						required
					/>
				</label>
				<label>Status
					<select name="status">
						<option value="draft" selected={selectedEvent.status === 'draft'}>draft</option>
						<option value="published" selected={selectedEvent.status === 'published'}>published</option>
						<option value="archived" selected={selectedEvent.status === 'archived'}>archived</option>
					</select>
				</label>
				<div class="eventEditActions">
					<button type="button" class="eventEditCancel" onclick={closeEditModal}>Cancel</button>
					<button type="submit">Save changes</button>
				</div>
			</form>
		{/if}
	</div>
</dialog>

<style>
	.formError {
		margin: 0;
		color: var(--primaryColor);
	}

	.formSuccess {
		margin: 0;
		color: var(--mutedTextColor);
	}

	.formHint {
		margin: -0.2rem 0 0.1rem;
		font-size: 0.9rem;
		color: var(--mutedTextColor);
	}

	.adminList {
		display: grid;
		gap: 0.75rem;
	}

	.eventEditor {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.75rem;
		border: 1px solid var(--lineColor);
		border-radius: 12px;
		background: var(--bgColor);
		padding: 0.8rem;
	}

	.eventMeta {
		margin-bottom: 0;
	}

	.eventSlug {
		font-size: 0.88rem;
		color: var(--mutedTextColor);
	}

	.editButton {
		padding: 0.55rem 0.95rem;
	}

	.eventEditDialog {
		border: 0;
		padding: 0;
		width: min(92vw, 720px);
		max-height: 90dvh;
		background: transparent;
	}

	.eventEditDialog::backdrop {
		background: var(--textColor);
		opacity: 0.55;
		animation: eventBackdropIn 220ms ease;
	}

	.eventEditDialog.eventEditDialogClosing::backdrop {
		animation: eventBackdropOut 220ms ease forwards;
	}

	.eventEditSurface {
		display: grid;
		gap: 0.9rem;
		padding: 1rem;
		border: 1px solid var(--lineColor);
		border-radius: 14px;
		background: var(--surfaceColor);
		animation: eventModalIn 260ms ease;
	}

	.eventEditDialog.eventEditDialogClosing .eventEditSurface {
		animation: eventModalOut 220ms ease forwards;
	}

	.eventEditHeader {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.5rem;
	}

	.eventEditClose {
		width: 40px;
		height: 40px;
		padding: 0;
		border-radius: 10px;
	}

	.eventEditActions {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: max-content;
		justify-content: end;
		gap: 0.5rem;
	}

	.eventEditCancel {
		background: var(--surfaceColor);
		color: var(--textColor);
		border: 1px solid var(--lineColor);
	}

	.eventEditorForm {
		display: grid;
		gap: 0.6rem;
	}

	@keyframes eventBackdropIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 0.55;
		}
	}

	@keyframes eventBackdropOut {
		from {
			opacity: 0.55;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes eventModalIn {
		from {
			opacity: 0;
			transform: translateY(16px) scale(0.99);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes eventModalOut {
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

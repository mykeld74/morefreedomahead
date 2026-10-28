const dateFormat = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'full',
	timeZone: 'America/New_York'
});
const timeFormat = new Intl.DateTimeFormat('en-US', {
	timeStyle: 'short',
	timeZone: 'America/New_York'
});

export function formatEventWhen(startAt: string, endAt?: string) {
	const start = new Date(startAt);
	const date = dateFormat.format(start);
	if (!endAt) return `${date}, ${timeFormat.format(start)}`;
	const end = new Date(endAt);
	const sameDay = dateFormat.format(end) === date;
	return sameDay
		? `${date}, ${timeFormat.format(start)} – ${timeFormat.format(end)}`
		: `${date} – ${dateFormat.format(end)}`;
}

export const formatPrice = (price: number) =>
	price > 0
		? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
		: 'Free';

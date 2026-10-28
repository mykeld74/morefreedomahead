import { describe, expect, it } from 'vitest';
import { formatEventWhen, formatPrice } from './format';

describe('formatPrice', () => {
	it('shows free for zero', () => {
		expect(formatPrice(0)).toBe('Free');
	});

	it('formats dollars', () => {
		expect(formatPrice(25)).toBe('$25.00');
	});
});

describe('formatEventWhen', () => {
	it('shows a single date with a time range for same-day events', () => {
		const text = formatEventWhen('2026-11-14T14:00:00Z', '2026-11-14T20:00:00Z');
		expect(text).toContain('Saturday, November 14, 2026');
		expect(text).toContain('–');
	});

	it('shows both dates for multi-day retreats', () => {
		const text = formatEventWhen('2026-11-13T14:00:00Z', '2026-11-15T17:00:00Z');
		expect(text).toContain('Friday, November 13, 2026');
		expect(text).toContain('Sunday, November 15, 2026');
	});

	it('handles events without an end', () => {
		expect(formatEventWhen('2026-11-14T14:00:00Z')).toContain('Saturday, November 14, 2026');
	});
});

import { describe, expect, it } from 'vitest';
import { formatCurrency } from './format';

describe('formatCurrency', () => {
  it('formats mock prices as Vietnamese dong', () => {
    expect(formatCurrency(150000)).toBe('150.000 VND');
    expect(formatCurrency(12450)).toBe('12.450 VND');
  });
});

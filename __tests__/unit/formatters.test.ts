import { formatCurrency, formatPercentage } from '../../src/utils/formatters';

describe('Formatters', () => {
  describe('formatCurrency', () => {
    it('should format currency in ARS', () => {
      const formatted = formatCurrency(1234.56);
      expect(formatted).toContain('1.234,56');
      expect(formatted).toContain('$');
    });

    it('should handle zero', () => {
      const formatted = formatCurrency(0);
      expect(formatted).toContain('0,00');
      expect(formatted).toContain('$');
    });

    it('should handle negative values', () => {
      const formatted = formatCurrency(-100);
      expect(formatted).toContain('-');
      expect(formatted).toContain('100,00');
    });
  });

  describe('formatPercentage', () => {
    it('should format positive percentage with plus sign', () => {
      expect(formatPercentage(10.5)).toBe('+10.50%');
    });

    it('should format negative percentage', () => {
      expect(formatPercentage(-5.25)).toBe('-5.25%');
    });

    it('should format zero', () => {
      expect(formatPercentage(0)).toBe('+0.00%');
    });
  });
});

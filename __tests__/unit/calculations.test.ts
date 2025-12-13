import {
  calculateReturn,
  calculateMarketValue,
  calculateProfit,
  calculateProfitPercentage,
  calculateQuantityFromAmount,
} from '../../src/utils/calculations';

describe('Return Calculations', () => {
  describe('calculateReturn', () => {
    it('should calculate positive return correctly', () => {
      expect(calculateReturn(110, 100)).toBe(10);
    });

    it('should calculate negative return correctly', () => {
      expect(calculateReturn(90, 100)).toBe(-10);
    });

    it('should handle zero close price', () => {
      expect(calculateReturn(100, 0)).toBe(0);
    });

    it('should calculate fractional return', () => {
      expect(calculateReturn(45.72, 50.07)).toBeCloseTo(-8.69, 2);
    });
  });
});

describe('Portfolio Calculations', () => {
  describe('calculateMarketValue', () => {
    it('should calculate market value correctly', () => {
      expect(calculateMarketValue(10, 100)).toBe(1000);
    });

    it('should handle fractional prices', () => {
      expect(calculateMarketValue(4, 84.27)).toBeCloseTo(337.08, 2);
    });
  });

  describe('calculateProfit', () => {
    it('should calculate positive profit', () => {
      const profit = calculateProfit(10, 110, 100);
      expect(profit).toBe(100);
    });

    it('should calculate negative profit (loss)', () => {
      const profit = calculateProfit(4, 84.27, 94.66);
      expect(profit).toBeCloseTo(-41.56, 2);
    });
  });

  describe('calculateProfitPercentage', () => {
    it('should calculate positive percentage', () => {
      expect(calculateProfitPercentage(110, 100)).toBe(10);
    });

    it('should calculate negative percentage', () => {
      expect(calculateProfitPercentage(90, 100)).toBe(-10);
    });

    it('should handle zero avg cost', () => {
      expect(calculateProfitPercentage(100, 0)).toBe(0);
    });
  });
});

describe('Order Calculations', () => {
  describe('calculateQuantityFromAmount', () => {
    it('should floor the result (no fractional shares)', () => {
      expect(calculateQuantityFromAmount(1000, 45.72)).toBe(21);
    });

    it('should return 0 when price is 0', () => {
      expect(calculateQuantityFromAmount(1000, 0)).toBe(0);
    });

    it('should handle exact division', () => {
      expect(calculateQuantityFromAmount(1000, 100)).toBe(10);
    });
  });
});

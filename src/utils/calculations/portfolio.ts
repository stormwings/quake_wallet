export const calculateMarketValue = (quantity: number, lastPrice: number): number => {
  return quantity * lastPrice;
};

export const calculateProfit = (
  quantity: number,
  lastPrice: number,
  avgCostPrice: number
): number => {
  return (lastPrice - avgCostPrice) * quantity;
};

export const calculateProfitPercentage = (
  lastPrice: number,
  avgCostPrice: number
): number => {
  if (avgCostPrice === 0) return 0;
  return ((lastPrice - avgCostPrice) / avgCostPrice) * 100;
};

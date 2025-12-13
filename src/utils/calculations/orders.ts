export const calculateQuantityFromAmount = (
  amount: number,
  price: number
): number => {
  if (price === 0) return 0;
  return Math.floor(amount / price);
};

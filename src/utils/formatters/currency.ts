import { formatMoneyDecimal, formatPercentage as formatPct } from "../../i18n/format";

export const formatCurrency = (amount: number): string => {
  return formatMoneyDecimal(amount, "ARS", { locale: "es" });
};

export const formatPercentage = (value: number): string => {
  return formatPct(value);
};

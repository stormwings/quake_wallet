import Dinero from "dinero.js";
import moment, { MomentInput } from "moment";
import "moment/locale/es";

import type { Locale } from "./t";

export type Currency = "ARS" | "USD";
export type DateFormat = "short" | "long" | "dateTime" | "time";

const MOMENT_LOCALE: Record<Locale, string> = { es: "es", en: "en" };
const MONEY_LOCALE: Record<Locale, string> = { es: "es-AR", en: "en-US" };

const DATE_FORMATS: Record<Locale, Record<DateFormat, string>> = {
  es: {
    short: "DD/MM/YYYY",
    long: "D [de] MMMM [de] YYYY",
    dateTime: "DD/MM/YYYY HH:mm",
    time: "HH:mm",
  },
  en: {
    short: "MM/DD/YYYY",
    long: "MMMM D, YYYY",
    dateTime: "MM/DD/YYYY HH:mm",
    time: "HH:mm",
  },
};

export function formatDate(
  value: MomentInput,
  opts: { locale?: Locale; format?: DateFormat } = {}
) {
  const locale = opts.locale ?? "es";
  const fmt = DATE_FORMATS[locale][opts.format ?? "short"];
  return moment(value).locale(MOMENT_LOCALE[locale]).format(fmt);
}

export function moneyFromDecimal(
  amountDecimal: number,
  currency: Currency,
  precision: number = 2,
  locale: Locale = "es"
) {
  const factor = Math.pow(10, precision);
  const amount = Math.round(amountDecimal * factor);
  return Dinero({ amount, currency, precision }).setLocale(MONEY_LOCALE[locale]);
}

export function formatMoneyDecimal(
  amountDecimal: number,
  currency: Currency,
  opts: { precision?: number; locale?: Locale } = {}
) {
  const precision = opts.precision ?? 2;
  const locale = opts.locale ?? "es";
  const d = moneyFromDecimal(amountDecimal, currency, precision, locale);
  return d.toFormat("$0,0.00");
}

export function formatPercentage(value: number) {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function plural(count: number, forms: { one: string; other: string }) {
  return count === 1 ? forms.one : forms.other;
}

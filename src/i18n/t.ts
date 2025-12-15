import { es } from "./copy/es";
import { en } from "./copy/en";

export type Locale = "es" | "en";

const dictionaries = { es, en } as const;

let currentLocale: Locale = "es";

export const setLocale = (l: Locale) => {
  currentLocale = l;
};

function getByPath(obj: any, path: string): string | undefined {
  return path.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), obj);
}

function interpolate(template: string, params?: Record<string, unknown>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => String(params[key] ?? ""));
}

export function t(
  key: string,
  params?: Record<string, unknown>,
  locale?: Locale
): string {
  const dict = dictionaries[locale ?? currentLocale];
  const raw = getByPath(dict, key);
  if (!raw) return key;
  return interpolate(raw, params);
}

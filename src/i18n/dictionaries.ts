import en from "./en.json";
import hi from "./hi.json";

export type Locale = "en" | "hi";
export type TranslationKey = keyof typeof en;

const dictionaries: Record<Locale, Partial<Record<TranslationKey, string>>> = { en, hi };

export function translate(locale: Locale, key: TranslationKey): string {
  return dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
}

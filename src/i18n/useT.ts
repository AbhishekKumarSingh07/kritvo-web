import { useContext } from "react";
import { LocaleContext } from "./LocaleContext";
import { translate, type TranslationKey } from "./dictionaries";

export function useT() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useT must be used within a LocaleProvider");
  }
  const { locale, setLocale } = ctx;
  return {
    locale,
    setLocale,
    t: (key: TranslationKey) => translate(locale, key),
  };
}

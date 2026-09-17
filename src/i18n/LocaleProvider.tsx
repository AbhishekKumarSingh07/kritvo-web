import { useMemo, useState, type ReactNode } from "react";
import { LocaleContext } from "./LocaleContext";
import type { Locale } from "./dictionaries";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

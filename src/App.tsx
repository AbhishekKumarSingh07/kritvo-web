import { useT } from "./i18n/useT";

export function App() {
  const { t } = useT();
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-semibold">{t("app.title")}</h1>
    </main>
  );
}

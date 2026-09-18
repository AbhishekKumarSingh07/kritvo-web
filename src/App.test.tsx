import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { App } from "./App";
import { LocaleProvider } from "./i18n/LocaleProvider";

describe("App", () => {
  it("renders the app title", () => {
    render(
      <LocaleProvider>
        <App />
      </LocaleProvider>,
    );
    expect(screen.getByRole("heading", { name: "Kritvo" })).toBeInTheDocument();
  });
});

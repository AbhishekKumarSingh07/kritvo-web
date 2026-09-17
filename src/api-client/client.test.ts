import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { apiFetch, ApiError, setAccessToken } from "./client";

describe("apiFetch", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    setAccessToken(null);
    vi.unstubAllGlobals();
  });

  it("sends a bearer token and an Idempotency-Key on POST", async () => {
    setAccessToken("token-123");
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );

    await apiFetch("/jobs", { method: "POST", body: { title: "test" } });

    const [, init] = vi.mocked(fetch).mock.calls[0]!;
    const headers = init!.headers as Headers;
    expect(headers.get("Authorization")).toBe("Bearer token-123");
    expect(headers.get("Idempotency-Key")).toBeTruthy();
  });

  it("throws an ApiError with the parsed problem details on failure", async () => {
    const problem = {
      type: "https://docs.kritvo.app/errors/guard-failed",
      title: "Job cannot be completed yet",
      status: 422,
      code: "GUARD_FAILED",
    };
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(problem), {
        status: 422,
        headers: { "Content-Type": "application/problem+json" },
      }),
    );

    await expect(apiFetch("/jobs/1/actions/complete_work", { method: "POST" })).rejects.toThrow(
      ApiError,
    );
  });
});

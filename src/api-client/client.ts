// Thin fetch wrapper for API conventions in LLD 5.1: bearer auth (from the
// session token only, never a tenant_id param), Idempotency-Key on every
// POST, If-Match for optimistic concurrency, and RFC 9457 problem details.

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  code: string;
  detail?: string;
  errors?: { field: string; code: string }[];
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly problem: ProblemDetails;

  constructor(problem: ProblemDetails) {
    super(problem.title);
    this.status = problem.status;
    this.code = problem.code;
    this.problem = problem;
  }
}

let accessToken: string | null = null;

export function setAccessToken(token: string | null): void {
  accessToken = token;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  idempotencyKey?: string;
  ifMatch?: string;
  signal?: AbortSignal;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, idempotencyKey, ifMatch, signal } = options;
  const headers = new Headers({ Accept: "application/json" });

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  if (body !== undefined) {
    headers.set("Content-Type", "application/json");
  }
  if (method === "POST") {
    headers.set("Idempotency-Key", idempotencyKey ?? crypto.randomUUID());
  }
  if (ifMatch) {
    headers.set("If-Match", ifMatch);
  }

  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const payload = await response.json().catch(() => undefined);

  if (!response.ok) {
    throw new ApiError(
      (payload as ProblemDetails | undefined) ?? {
        type: "about:blank",
        title: response.statusText,
        status: response.status,
        code: "UNKNOWN",
      },
    );
  }

  return payload as T;
}

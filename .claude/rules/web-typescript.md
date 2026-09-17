---
paths:
  - "src/**"
  - "tests/**"
  - "e2e/**"
---

# Web rules (TypeScript)

- TypeScript strict; no `any` without a comment explaining why.
- Use types generated from `../kritvo-api/openapi/openapi.json` (`pnpm gen:api`); never hand-write API response types.
- If the UI needs an API change, stop: it must land in `kritvo-api` first (backward-compatible).
- Field actions go through the IndexedDB outbox (LLD 7), even when online.
- Every user-facing string exists in Hindi and English.
- Tap targets at least 48 × 48 px; test on a narrow (360 px) viewport.
- Run `pnpm lint && pnpm typecheck && pnpm test` before finishing.

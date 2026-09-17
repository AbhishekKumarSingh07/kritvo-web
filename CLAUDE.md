# kritvo-web — instructions for Claude Code

Kritvo is a multi-tenant, WhatsApp-first field operations SaaS for Indian service contractors.
This repository is the UI: office web app, technician PWA and client portal
(Vite, React, TypeScript strict, Tailwind, TanStack Query, IndexedDB outbox).
The backend and ALL design documents are in the sibling repository `../kritvo-api`.

Current project state: `../kritvo-api/docs/status/STATUS.md` (read it at the start of a task)

## Where things are (read on demand)

`.claude/settings.json` grants read access to `../kritvo-api/docs` and `../kritvo-api/openapi`.
If those paths are missing, stop and ask me to clone `kritvo-api` next to this repository.

- Architecture summary: `../kritvo-api/docs/architecture/ARCHITECTURE.md`
- Product, personas, WhatsApp vs PWA split: `../kritvo-api/docs/architecture/HLD.md` (sections 3, 6, 7, 10)
- API conventions and endpoints: `../kritvo-api/docs/architecture/LLD.md` section 5
- Offline sync protocol: LLD section 7; security and tokens: LLD section 12
- Tasks (see the Repo column): `../kritvo-api/docs/planning/TASKS.md`
- Standards: `../kritvo-api/docs/engineering/CODING_STANDARDS.md`, `GIT_WORKFLOW.md`, `DEFINITION_OF_DONE.md`
- API contract: `../kritvo-api/openapi/openapi.json`

## Commands

<!-- Fill these in during TASK-023 and keep them accurate. -->
- Setup: `pnpm install`
- Checks: `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm build`
- API types: `pnpm gen:api` (reads `$API_CONTRACT_PATH`, defaulting to `../kritvo-api/openapi/openapi.json`)
- Sibling check: `scripts/check-api-sibling.sh`

## How we work

- One task per branch: `<type>/TASK-###-short-name`. Never commit to `main` directly.
- Start with `/task-start TASK-###`; finish with `/task-finish`.
- Commit and PR titles: Conventional Commits ending with the task ID,
  e.g. `feat(office): add dispatch board (TASK-016)`. Scopes: office, pwa, portal, ui, api-client, repo.
- Every PR updates `CHANGELOG.md` (Unreleased).
- Docs, task status and worklog are updated from a `kritvo-api` session (`/status-update` there).

## Non-negotiable UI rules

- Never hand-write API types; regenerate with `pnpm gen:api`.
- If the UI needs a new or changed endpoint, stop and describe the API change for `kritvo-api`;
  it must be merged there first and stay backward-compatible.
- The tenant comes from the session token only; never send `tenant_id` in request bodies.
- Field actions always go through the IndexedDB outbox with a `client_op_id` (LLD 7).
- Every user-facing string exists in Hindi and English; tap targets at least 48 × 48 px.
- No secrets in code; only `VITE_*` variables reach the browser, so never put secrets in them.
- Never edit files in `../kritvo-api` from this repository.

## Session rules

- "start TASK-###": run `/task-start`. Read the task in `../kritvo-api/docs/planning/TASKS.md`
  and its detail in `../kritvo-api/docs/architecture/LLD.md`, check dependencies, create the
  branch, then show a short plan and wait for approval before writing code.
- "finish the task": run `/task-finish`. Only these two skills exist in this repo.
- Explain actions in plain language, a couple of sentences at a time; assume a non-developer
  audience and give a one-line explanation for any jargon.
- Ask one question at a time. Never ask the user to paste specs already readable from the docs.
- PR/commit titles: `type(scope): summary (TASK-###)`. PR body: `Closes #<issue>` if the task
  is fully done, `Refs #<issue>` if partial — web task issues live in this repo. Use the full
  `AbhishekKumarSingh07/kritvo-api#<issue>` form only when the issue itself lives in kritvo-api
  (e.g. TASK-000).
- Never edit files in `../kritvo-api` from this repository, and never push or merge without asking.
- On failure, show the error in plain language with the likely cause and options, before
  changing anything.

## Git safety

- Never force-push, rewrite published history, or delete tags.
- Ask before `git push`, `gh pr merge`, or any command that changes GitHub settings.

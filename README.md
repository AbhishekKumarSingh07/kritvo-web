# kritvo-web

UI for Kritvo: the office web app, the technician PWA and the client portal, in one Vite + React + TypeScript app.

> **Status:** Phase 0 (foundations). Tooling scaffolded (TASK-023); office, PWA and portal screens land in later tasks.
> **Licence:** Proprietary. All rights reserved.

## Local setup

1. Clone `kritvo-api` next to this repository (see below) and `kritvo-web`.
2. Use Node from `.nvmrc` (`nvm use`), then `corepack enable`.
3. `pnpm install`
4. `cp .env.example .env.local` and adjust `VITE_API_BASE_URL` if needed.
5. `pnpm gen:api` — generates TypeScript types from `../kritvo-api/openapi/openapi.json`.
6. `pnpm dev` — starts the app at `http://localhost:5173`.
7. `pnpm lint && pnpm typecheck && pnpm test && pnpm build` — the same checks CI runs.

## Where the docs are

All design, planning and status documents live in the `kritvo-api` repository under `docs/`. This repository does not keep copies. Clone both repositories side by side:

```bash
mkdir -p ~/code/kritvo && cd ~/code/kritvo
git clone git@github.com:<you>/kritvo-api.git
git clone git@github.com:<you>/kritvo-web.git
```

| Need | Path from this repository |
| --- | --- |
| Product and architecture | `../kritvo-api/docs/architecture/HLD.md` |
| API, offline sync, UI rules | `../kritvo-api/docs/architecture/LLD.md` (sections 5, 7, 12) |
| Task plan (Repo column) | `../kritvo-api/docs/planning/TASKS.md` |
| Standards and Git workflow | `../kritvo-api/docs/engineering/` |
| API contract | `../kritvo-api/openapi/openapi.json` |

## Repository map

| Path | What lives there |
| --- | --- |
| `src/` | App entry, generated API client, i18n, offline outbox skeleton (TASK-023); office, PWA and portal route trees arrive with TASK-016/017/018 |
| `docs/` | Pointer to the shared docs |
| `.claude/`, `CLAUDE.md` | Instructions, rules and skills for Claude Code |
| `.github/` | CI workflows, PR and issue templates |
| `scripts/check-api-sibling.sh` | Checks that `../kritvo-api` is present and up to date |

## How work is tracked

1. Web tasks are GitHub issues in this repository; all tasks share one project board.
2. Branch: `<type>/TASK-###-short-name`. PR title: `feat(office): add dispatch board (TASK-016)`.
3. If the UI needs an API change, that change is merged in `kritvo-api` first.
4. `CHANGELOG.md` is updated in every PR.

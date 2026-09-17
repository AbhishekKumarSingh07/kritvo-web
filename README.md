# kritvo-web

UI for Kritvo: the office web app, the technician PWA and the client portal, in one Vite + React + TypeScript app.

> **Status:** Phase 0 (foundations). No application code yet; TASK-023 scaffolds the app.
> **Licence:** Proprietary. All rights reserved.

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
| `src/` | App code: office, PWA and portal route trees (TASK-023) |
| `docs/` | Pointer to the shared docs |
| `.claude/`, `CLAUDE.md` | Instructions, rules and skills for Claude Code |
| `.github/` | CI workflows, PR and issue templates |
| `scripts/check-api-sibling.sh` | Checks that `../kritvo-api` is present and up to date |

## How work is tracked

1. Web tasks are GitHub issues in this repository; all tasks share one project board.
2. Branch: `<type>/TASK-###-short-name`. PR title: `feat(office): add dispatch board (TASK-016)`.
3. If the UI needs an API change, that change is merged in `kritvo-api` first.
4. `CHANGELOG.md` is updated in every PR.

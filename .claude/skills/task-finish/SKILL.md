---
name: task-finish
description: Finish the current Kritvo web task: run checks, update the changelog, commit, and open a pull request.
disable-model-invocation: true
---

Finish the task on the current branch. The task ID is in the branch name.

1. Run `pnpm gen:api` and confirm no unexpected changes, then `pnpm lint`, `pnpm typecheck`, `pnpm test` and `pnpm build`. Fix failures before continuing.
2. Walk through `../kritvo-api/docs/engineering/DEFINITION_OF_DONE.md` and report each item as done or not.
3. If the UI now differs from HLD/LLD, stop and list the doc change needed; it must be made in `kritvo-api` with `/doc-change`.
4. Add a line to `CHANGELOG.md` under **Unreleased** ending with the task ID; note the minimum `kritvo-api` version if the UI needs a new endpoint.
5. Commit with a Conventional Commit message ending with the task ID (scopes: office, pwa, portal, ui, api-client, repo). Show me the message first.
6. Ask before pushing. After I agree, push and open a PR with `gh pr create`, using `.github/pull_request_template.md` and the commit title. Use `Closes #<issue>` if the issue is in this repository, or `Closes <owner>/kritvo-api#<issue>` if it lives in kritvo-api.
7. Remind me to run `/status-update` in a `kritvo-api` session so TASKS.md and STATUS.md reflect this work.

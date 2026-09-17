# Contributing

1. Pick a web task from the project board (its issue lives in this repository).
2. Make sure `../kritvo-api` is cloned and current: `scripts/check-api-sibling.sh`.
3. Create a branch: `git switch -c feat/TASK-016-dispatch-board`.
4. If you need an API change, stop and get it merged in `kritvo-api` first; then run `pnpm gen:api`.
5. Commit with Conventional Commits ending with the task ID; open a PR with `Closes #<issue>`.
6. Wait for CI; add the `claude-review` label if you want an AI review; squash-merge.

Full rules: `../kritvo-api/docs/engineering/GIT_WORKFLOW.md`.

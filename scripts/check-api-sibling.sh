#!/usr/bin/env bash
# Checks that ../kritvo-api exists and is up to date with its remote main branch.
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"
api="../kritvo-api"

if [[ ! -d "$api/.git" ]]; then
  echo "Missing $api. Clone it next to this repository:" >&2
  echo "  git clone git@github.com:<owner>/kritvo-api.git $api" >&2
  exit 1
fi

git -C "$api" fetch --quiet origin main
behind="$(git -C "$api" rev-list --count HEAD..origin/main)"
branch="$(git -C "$api" branch --show-current)"
echo "kritvo-api: branch '$branch', $behind commit(s) behind origin/main"
[[ -f "$api/openapi/openapi.json" ]] || echo "Note: $api/openapi/openapi.json does not exist yet (created in TASK-001)."
if [[ "$behind" != "0" ]]; then
  echo "Update it with: git -C $api switch main && git -C $api pull --ff-only" >&2
  exit 2
fi

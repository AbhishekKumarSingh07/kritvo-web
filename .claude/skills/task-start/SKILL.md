---
name: task-start
description: Start work on a Kritvo web task (TASK-###) with the right branch, context and plan.
disable-model-invocation: true
argument-hint: "[TASK-###]"
arguments: [task]
---

Start web task $task.

1. Run `scripts/check-api-sibling.sh`. If it fails, stop and show me the fix.
2. Read the task's row in `../kritvo-api/docs/planning/TASKS.md`. If its Repo column does not include `web`, stop and tell me to run this in `kritvo-api`.
3. Read the task in `../kritvo-api/docs/architecture/LLD.md` section 14 and only the design sections it needs (usually LLD 5, 7, 12 and HLD 7).
4. Find the issue: `gh issue list --search "$task in:title" --state all`. If the Repo column is `api + web`, the issue is in kritvo-api: `gh issue list --repo <owner>/kritvo-api --search "$task in:title" --state all`.
5. Check dependencies in TASKS.md. If one is not Done (especially the API side), stop and report it.
6. Make sure the working tree is clean and `main` is current: `git switch main && git pull --ff-only`.
7. Create the branch `<type>/$task-<short-name>`.
8. Check that the endpoints the task needs exist in `../kritvo-api/openapi/openapi.json`. List any that are missing as API work needed first.
9. Write a short plan: screens, components, API calls, offline behaviour, Hindi/English strings, tests. Wait for my go-ahead before writing code.

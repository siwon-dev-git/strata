---
name: commit
description: Commit with convention. Use when committing changes — enforces type/scope/subject format and PR workflow.
user-invokable: true
---

# Commit — Strata Commit Convention

Stage, commit, and optionally PR with enforced convention format.

## Argument Parsing

- (no args) → Analyze staged + unstaged changes, commit by domain
- `pr` → Commit + create PR
- `pr merge` → Commit + create PR + merge when CI green

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
```

## Types

| Type       | When                                          |
| ---------- | --------------------------------------------- |
| `feat`     | New feature or component                      |
| `fix`      | Bug fix                                       |
| `refactor` | Code change that neither fixes nor adds       |
| `docs`     | Documentation only (.md, comments, stories)   |
| `style`    | Formatting (Prettier, whitespace, semicolons) |
| `test`     | Adding or updating tests                      |
| `chore`    | Build, CI, tooling, dependencies              |
| `perf`     | Performance improvement                       |

## Scope

Optional. Component or area name in lowercase:

- Component: `button`, `dialog`, `tokens`
- Area: `ci`, `storybook`, `deps`

## Rules

1. **Subject**: imperative mood, lowercase, no period, max 72 chars
2. **Body**: explain _why_ not _what_. Wrap at 80 chars. Optional for trivial changes
3. **Co-Authored-By**: required trailer when AI-assisted
4. **One logical change per commit**. Split by domain when batching multiple changes
5. **Branch format**: `<type>/<short-description>` (e.g. `feat/rich-stories`, `fix/dialog-a11y`)
6. **Never commit**: `.env`, credentials, large binaries

## Execution Procedure

### Default (`/commit`)

1. Run `git status` + `git diff` to understand all changes
2. Group changes by domain (components, ci, docs, etc.)
3. For each domain group:
   - Stage relevant files
   - Auto-determine type from change nature
   - Generate commit message following format
   - Commit
4. Run `pnpm format:check && pnpm lint && pnpm typecheck` before committing
5. If pre-commit hook fails → fix → re-stage → new commit (never amend)

### With PR (`/commit pr`)

1. Execute default commit flow
2. Create branch if on main: `<type>/<short-description>`
3. Push with `-u`
4. Create PR via `gh pr create`:
   - Title = primary commit subject
   - Body = Summary bullets + Test plan + AI badge
5. Report PR URL

### With merge (`/commit pr merge`)

1. Execute PR flow
2. Wait for CI with `gh run watch --exit-status`
3. If CI fails → diagnose → fix → push → re-watch
4. On green → `gh pr merge --squash --delete-branch`
5. Switch to main + pull

## Output Format

```
═══ Commit ═══
Branch: <branch-name>
Commits: <count>
  - <type>(<scope>): <subject>
  - ...
PR: <url> (if applicable)
CI: PASS | PENDING | FAIL
Status: COMPLETE
═══════════════
```

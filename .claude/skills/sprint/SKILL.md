---
name: sprint
description: Build+maintain cycle. Use when building features (quest text) or maintaining system health (no args or number).
allowed-tools: ['Read', 'Write', 'Edit', 'Glob', 'Grep', 'Bash', 'Task']
---

# Sprint

$ARGUMENTS — unified loop. Single command runs the full cycle.

## Argument Parsing

- empty → MAINTAIN 1 cycle
- number N → MAINTAIN N cycles (max 10)
- text → BUILD 1 cycle (quest)
- N + text → BUILD N cycles

## Gate Chain

6 gates govern every cycle. Each gate is binary (PASS/FAIL). Failure blocks downstream.

| Gate | Name     | Check                                         | Fix                            | Retry |
| ---- | -------- | --------------------------------------------- | ------------------------------ | ----- |
| G0   | Scope    | scope declared + FMEA checked                 | narrow scope                   | 1     |
| G1   | Surface  | `pnpm format:check && pnpm lint --fix`        | auto (`format:write`, `--fix`) | 1     |
| G2   | Static   | `pnpm lint && pnpm typecheck`                 | manual code fix                | 3     |
| G3   | Runtime  | `pnpm test:ci && pnpm build` + bundle ≤ 512KB | manual code fix                | 3     |
| G4   | Heritage | retro done if 3+ commits since last           | update ADR + FMEA              | 1     |
| G5   | CI       | `gh run watch --exit-status`                  | local fix → G1 re-entry        | 3     |

**Universal rules:**

- Gates are sequential: G(N) FAIL → do not run G(N+1)
- Retry exhausted → Status: BLOCKED, stop cycle
- Never skip a gate. Never use `--no-verify`
- G5 FAIL → fix locally → re-enter at G1 (full re-validation)

## BUILD Mode

Quest-based build cycle. 11 steps, 6 gates.

```
Quest ──→ ❶ FMEA ──→ ❷ Plan ──→ ❸ Execute ──→ ❹ Collect
                                                    │
G0 ─────────┘                                       │
                                                    ▼
❺ Review ──→ ❻ Hygiene ──→ ❼ Commit ──→ ❽ Heritage ──→ ❾ Rebase ──→ ❿ PR+CI ──→ ⓫ Cleanup
│            │                           │              │             │
G1,G2,G3 ───┘ (git status, falsify) ────┘  G4 ─────────┘ (conflict)─┘  G5 ──────┘
```

### ❶ FMEA Cross-reference — G0: Scope

0. Scope declaration: goal · in_scope · out_scope · done (3 bullets max)
1. Cross-reference `heritage/fmea.md` → identify related risk patterns
2. If matching pattern found → apply known fix preemptively
3. **G0 check**: scope bounded within 10min/100k? FMEA reviewed? → PASS/FAIL

### ❷ Plan + Decompose

1. Quest decomposition: independent → parallel agents, dependent → sequential
2. Identify file targets, dependencies, execution order

### ❸ Execute

1. Agent dispatch → parallel build execution
2. Each agent works within decomposed scope

### ❹ Collect

1. All dispatched agents completed? Verify each subtask has output
2. Any agent failed or timed out → re-dispatch or descope
3. All outputs gathered → proceed to review

### ❺ Review — G1, G2, G3

Sequential gate chain. Each gate must PASS before the next runs.

**G1 Surface** (auto-fix):

1. `pnpm format:check` — FAIL → `pnpm format:write` → re-verify
2. `pnpm lint --fix` (auto-fixable items)
3. Re-run `pnpm format:check` → must PASS

**G2 Static** (manual fix):

1. `pnpm lint` (remaining errors after auto-fix) — FAIL → fix → re-verify
2. `pnpm typecheck` — FAIL → fix → re-verify
3. Max 3 fix attempts per check. Exhausted → BLOCKED

**G3 Runtime** (manual fix):

1. `pnpm test:ci` — FAIL → fix → re-verify
2. `pnpm build` — FAIL → fix → re-verify
3. Bundle budget: `du -sk dist | cut -f1`
   - ≤ 400KB → ✅ PASS
   - 401–512KB → 🟡 WARN (proceed with caution)
   - \> 512KB → 🔴 FAIL (must reduce bundle size)
4. Max 3 fix attempts per check. Exhausted → BLOCKED

### ❻ Hygiene

1. `git status` — no untracked debris, no unexpected files
2. No `.env`, credentials, or large binaries staged
3. Falsification 1 round: re-run G2+G3 checks once to confirm stability

### ❼ Commit

1. Invoke `/commit` convention (type/scope/subject format)
2. One logical change per commit, split by domain if needed
3. Commit must succeed without `--no-verify`

### ❽ Heritage — G4

1. Count commits since last retro
2. If ≥3 → **G4 required**: git log → ACT-R analysis → update `heritage/adr.md` + `heritage/fmea.md`
3. If <3 → G4 auto-PASS (skip)
4. Record 1-line cycle insight

### ❾ Rebase

1. `git fetch origin main`
2. Check divergence: `git merge-base --is-ancestor origin/main HEAD`
3. If behind → `git rebase origin/main` → resolve conflicts → re-enter G1
4. If up-to-date → proceed

### ❿ PR + CI — G5

**Pre-PR size check** (before push):

1. `git diff --stat origin/main...HEAD` → calculate total changed lines
   - ≤ 500 lines → proceed
   - 501–1000 lines → ⚠️ WARN: "Large PR. Consider splitting." Ask user to confirm or split
   - \> 1000 lines → 🔴 BLOCK: "PR too large. Split required." User can explicitly override

**PR + CI flow**:

1. Push with `-u`
2. Create PR via `gh pr create` (or push to existing)
3. `gh run watch --exit-status`
4. **G5 check**: CI green? → PASS/FAIL
5. FAIL → diagnose → fix locally → re-enter at G1 → push → re-watch
6. Max 3 CI fix rounds. Exhausted → BLOCKED
7. CI green → report PR URL. **Merge is user's decision. Never auto-merge.**

### ⓫ Cleanup (post-merge)

Runs after user merges PR, or on explicit request.

1. Delete remote branch: `git push origin --delete <branch>` (if not auto-deleted by merge)
2. Delete failed/stale GitHub Actions runs: `gh run list --branch <branch> --status failure --json databaseId -q '.[].databaseId'` → `gh api -X DELETE repos/{owner}/{repo}/actions/runs/{id}`
3. `git switch main && git pull`
4. Clean local branch: `git branch -d <branch>`
5. If component added/removed → `pnpm generate:llms`
6. Report final status

## MAINTAIN Mode

Health scan → gate-based heal loop. Max: min(N, 10). Early exit on convergence.

### SENSE — Health Scan

Two-tier check:

**Hard checks** (gate violations — must fix):

- G1 Surface: `pnpm format:check && pnpm lint --fix` then verify
- G2 Static: `pnpm lint && pnpm typecheck`
- G3 Runtime: `pnpm test:ci && pnpm build`

**Soft checks** (health indicators — should improve):

- Unreviewed commits: <3
- Heritage freshness: <7 days
- Dead references: 0
- Bundle size: ≤ 512KB (`pnpm build && du -sk dist | cut -f1`)

### DECIDE — Priority

```
Hard check FAIL → fix in gate order (G1→G2→G3), same retry rules as BUILD
Hard check ALL PASS → evaluate soft checks:
  Soft ALL ✅ → CONVERGED → EXIT
  Soft ⚠️ → process in order:
    unreviewed ≥3 (retro) → stale ≥7d (update heritage) → dead refs (clean) → bundle >512KB (tree-shake/split)
```

### EXECUTE

Autonomous scope: `format:write`, `lint --fix`, retro (heritage update), dead-ref cleanup
User approval required: typecheck fix, test fix, any semantic code change

### LEARN

1. Update heritage pattern counts
2. Record 1-line cycle insight

### RECURSE — Convergence

Re-run SENSE →

- Hard ALL PASS + Soft ALL ✅: **CONVERGED**
- No improvement from previous cycle: **DIMINISHING**
- Max cycles reached: **MAX_CYCLE**
- Otherwise: return to DECIDE

## Output Format

```
═══ Sprint {Build N|Cycle N|Complete} ═══
[BUILD] Quest: / Gates: G0✅ G1✅ G2✅ G3✅ G4✅ G5✅ / Commit: [hash]
[MAINTAIN] Health: Hard ✅|❌ Soft X/4 / Actions: / Insight:
Heritage: ADR N₁ + FMEA N₂
Status: COMPLETE | INCOMPLETE | BLOCKED | CONVERGED | DIMINISHING | MAX_CYCLE
═══════════════════════
```

## Constraints

Scope: 10min/100k per cycle. Self-scoring prohibited (Babel paradox). Ship-loop-harness: evolve within shipping loop. Evaluation must be actionable.

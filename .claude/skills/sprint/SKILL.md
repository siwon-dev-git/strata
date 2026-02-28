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

## BUILD Mode

Quest-based build cycle. Each cycle has 3 phases:

### Phase 1: SPRINT

0. Scope declaration: goal · in_scope · out_scope · done (3 bullets)
1. Cross-reference heritage/fmea.md → identify related risk patterns
2. Quest decomposition: independent → parallel agents, dependent → sequential
3. Agent dispatch → build execution

### Phase 2: REVIEW — Hard Gate

**Gate rule: ALL checks PASS before commit or phase transition. Failure = HALT. No exceptions.**

1. Format: `pnpm format:check` — FAIL → `pnpm format:write` → re-verify
2. Lint: `pnpm lint` — FAIL → fix → re-verify
3. Type verification: `pnpm typecheck` — FAIL → fix → re-verify
4. Tests: `pnpm test:ci` — FAIL → fix → re-verify
5. ALL 4 PASS → falsification 1 round → commit
6. `git status` clean check

**HALT conditions — never proceed to Phase 3 or `/commit`:**

- Any step 1-4 still fails after 3 fix attempts → Status: BLOCKED, stop cycle
- Never commit with known check failures
- Never merge PR with CI red — `gh run watch --exit-status` must succeed
- Never use `--no-verify` or skip checks to force progress

### Phase 3: RETRO

Run if 3+ commits since last retro, otherwise skip.

1. git log → ACT-R analysis (Analyze/Critique/Tool-check/Reform)
2. Update heritage/adr.md + fmea.md with new patterns
3. Record 1-line cycle insight

## MAINTAIN Mode

Health scan → auto-heal loop. Max: min(N, 10). Early exit on convergence.

### SENSE — Health Scan

Parallel collection (✅=healthy, ⚠️=action needed):

- Format + Lint + Typecheck: `pnpm format:check && pnpm lint && pnpm typecheck` ALL PASS
- Tests: `pnpm test:ci` ALL PASS
- Unreviewed commits: <3
- Heritage freshness: <7 days
- Dead references: 0

Health score = ✅ count / total × 10

### DECIDE — Priority

Health ≥ 8 → "Healthy. No action needed." → EXIT

Health < 8 → Process ⚠️ items in order:
test FAIL (fix) → unreviewed ≥3 (retro) → stale ≥7d (update heritage) → dead refs (clean)

### EXECUTE

Autonomous scope: retro (heritage update), dead-ref cleanup
User approval required: code changes, risk High+

### LEARN

1. Update heritage pattern counts
2. Record 1-line cycle insight
3. Re-check dead references

### RECURSE — Convergence

Re-run SENSE → Health ≥ 8: CONVERGED | No improvement: DIMINISHING | Max reached: MAX_CYCLE | Otherwise: return to DECIDE

## Output Format

```
═══ Sprint {Build N|Cycle N|Complete} ═══
[BUILD] Quest: / Commit: [hash]
[MAINTAIN] Health: X→Y/10 / Actions: / Insight:
Heritage: ADR N₁ + FMEA N₂
Status: COMPLETE | INCOMPLETE | BLOCKED | CONVERGED | DIMINISHING | MAX_CYCLE
═══════════════════════
```

## Constraints

Scope: 10min/100k per cycle. Self-scoring prohibited (Babel paradox). Ship-loop-harness: evolve within shipping loop. Evaluation must be actionable.

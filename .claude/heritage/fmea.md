# Failure Patterns

> Mistake pattern catalog. For prevention of recurrence.

## Visual

- **poc-quality-ceiling**: POC accuracy = final quality ceiling. Builder only performs mechanical transformation
- **poc-feelgood-pass**: "Feels OK" approval → inaccuracy persists. Difference checklist required
- **shallow-extraction**: Insufficient first-pass analysis. Always re-analyze

## Build

- **ci-blind-merge**: PR merged despite CI red. Causes: format:check absent from local pre-flight; commit SKILL ran checks post-commit; sprint REVIEW lacked hard gate. Fix: 6-gate chain (G0–G5) with sequential enforcement; HALT on failure; never merge CI red. Occurred: PR #14–#17. Hardened: 6-gate restructure
- **maintain-sense-decide-gap**: MAINTAIN SENSE had 5 checks but DECIDE only mapped 4 actions (format+lint+typecheck missing). Health ≥8 threshold let 1 failing check exit as "healthy" (4/5×10=8). Fix: hard/soft 2-tier separation; hard gate = binary pass/fail, soft = health score. No threshold escape
- **script-name-phantom**: SKILL.md referenced `format:write` but actual script is `format`. Phantom script names cause gate auto-fix to fail silently. Fix: verify script names against package.json when writing SKILL
- **type-regression**: Barrel destruction, missing initial values. Verify with tsc --noEmit
- **ci-comment-gate-blind**: CI reports bundle size (🔴 700KB/512KB) and PR size (⚠️ 3886 lines) as PR comments, but `gh run watch --exit-status` returns 0 because they don't fail the workflow. Harness G5 sees PASS while quality signals are ignored. Occurred: PR #18 (11 bundle warnings, 7 PR size warnings). Fix: bundle budget check in G3 after build (entry bundle from index.html); pre-PR size check before push (`git diff --stat -- ':!*lock*'`). CI comments remain informational; harness enforces locally before CI
- **commit-delay-after-build**: Delaying commit after review pass. Immediate commit mandatory
- **type-impl-drift**: Field exists in type but not rendered. tsc doesn't warn on unused props. Cross-check type vs implementation during component audit
- **config-without-seed**: Build config has pattern registered but 0 actual files. When adding config, create at least 1 seed file simultaneously
- **mock-data-scatter**: Inline mocks scattered across N stories → N modifications on data change. Extract to **fixtures** when 3+ share data
- **composition-undocumented**: Container slot structure exists only in code → trial and error for new developers. DesignGuide recipe required

## Component

- **ghost-dependency**: Dependency declared in package.json with 0 imports. Verify at least 1 import on install
- **build-render-mismatch**: tsc pass ≠ runtime correct. Only storybook build verifies rendering

## AI

- **llms-txt-stale**: llms.md not regenerated after component add/remove → AI tools see outdated index. Run `pnpm generate:llms` after component changes
- **mcp-addon-breaking**: @storybook/addon-mcp API may change (experimental). Pin version, test on upgrade. llms.md = stable fallback

## Harness

- **protection-check-name-drift**: Branch protection required checks ["Format · Lint · Typecheck", "Unit tests", "Build"] but CI workflow consolidated into single "Quality Gate" job. Name mismatch → permanent pending → merge blocked. Fix: when consolidating CI jobs, update branch protection via `gh api repos/.../branches/main/protection/required_status_checks -X PATCH`. Occurred: PR #20. Hardened: protection updated to ["Quality Gate"]
- **template-dollar-expansion**: SKILL.md `$1`, `$2` etc. in code blocks (e.g., awk `{sum+=$1}`) are expanded as positional arguments during skill invocation. `$ARGUMENTS` and `$N` (numeric) are expanded; `$f`, `$s` (letter-named) are NOT. Fix: avoid awk `$N` in SKILLs — use pure bash arithmetic with letter-named variables instead. Occurred: sprint SKILL.md + commit SKILL.md bundle budget commands. Hardened: replaced awk with `{ s=0; while read -r f; ... }`
- **heritage-count-drift**: self-model.md claimed "ADR 42 + FMEA 31 = 73" but actual count was ADR 29 + FMEA 21 = 50. Heritage counts drift when entries are consolidated or removed without updating self-model. Fix: count entries via grep when updating self-model. Occurred: self-model.md Current State section
- **lockfile-specifier-drift**: package.json dependency range changed (react `^19.2.0` → `^19.0.0` when moved to peerDependencies) but lockfile not regenerated. CI `--frozen-lockfile` fails because specifiers mismatch. Local `pnpm install` succeeds silently (already installed). Fix: add `pnpm install --frozen-lockfile` to G1 gate pre-flight; on FAIL run `pnpm install` + re-verify + commit lockfile. Occurred: PR #23. Hardened: G1 gate extension

## Consumer DX

- **token-mapping-boilerplate**: Consumers must copy 60+ lines of `@theme inline` CSS to use Strata tokens with Tailwind. No preset/plugin export exists. Fix: provide `@siwon-dev-npm/strata/preset` CSS import. Identified: character-chat consumer feedback
- **convenience-wrapper-missing**: Compound components (Dialog 5-part, Avatar+StatusDot) require verbose assembly for common patterns. Fix: add convenience wrappers (SimpleDialog) alongside compound API. Keep both — composition for power users, convenience for common cases
- **discoverability-gap**: Heading component, Badge 5 variants, Icon tree-shaking — all exist but consumers missed them. Symptom: feedback asks for things already implemented. Fix: improve llms.md surface area and component .md examples

## Testing

- **happy-path-only-tests**: 52 test files (157 assertions) cover only rendering and basic interaction. Zero tests for: disabled state enforcement, callback error resilience, keyboard accessibility (Escape/Enter/Arrow), focus management (trap/restore), loading state interaction prevention. Root cause: convention template has no test scope guidance; G3 gate checks exit code not coverage scope; FMEA had no entry for this pattern. Fix: add test scope section to convention template; add behavioral tests for disabled/keyboard/focus/loading; consider coverage-ratchet for failure scenarios

## Tooling

- **skill-frontmatter-invalid**: SKILL.md contained unsupported frontmatter attribute `allowed-tools`. Claude Code only supports: `argument-hint`, `compatibility`, `description`, `disable-model-invocation`, `license`, `metadata`, `name`, `user-invokable`. Invalid keys are silently ignored or warn at runtime. Fix: verify frontmatter keys against supported list when editing SKILL files. Occurred: sprint/SKILL.md, convention/SKILL.md
- **npx-pnpm-passthrough**: `pnpm script -- --flag` passes `--` directly to vitest, flag misinterpreted as file filter. Use dedicated scripts
- **npm-remnants**: After package manager switch, error messages/comments reference old manager. grep full check on switch
- **artifact-gitignore-gap**: Build artifacts not registered in .gitignore → large commit accident. Register output directories on creation

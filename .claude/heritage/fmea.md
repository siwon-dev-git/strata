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

## Tooling

- **npx-pnpm-passthrough**: `pnpm script -- --flag` passes `--` directly to vitest, flag misinterpreted as file filter. Use dedicated scripts
- **npm-remnants**: After package manager switch, error messages/comments reference old manager. grep full check on switch
- **artifact-gitignore-gap**: Build artifacts not registered in .gitignore → large commit accident. Register output directories on creation

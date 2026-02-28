# Failure Patterns

> Active mistake patterns. Archived (hardened) patterns in `heritage/archive.md`.

## Visual

- **analysis-quality-bias**: POC accuracy = final quality ceiling. "Feels OK" ≠ PASS. Always re-analyze with difference checklist. (Merged: poc-quality-ceiling + poc-feelgood-pass + shallow-extraction)

## Build

- **ci-gate-bypass**: CI signals (bundle 🔴, PR size ⚠️) ignored when `gh run watch` returns 0. Fix: enforce bundle budget in G3 locally; pre-PR size check before push. (Merged: ci-blind-merge + ci-comment-gate-blind)
- **type-drift**: Type field exists but not rendered, or barrel destroyed. tsc doesn't warn on unused props. Cross-check type vs impl during audit; verify with `tsc --noEmit`. (Merged: type-regression + type-impl-drift)
- **creation-pair-missing**: Config/artifact without corresponding file. When adding build config, create seed file; when creating output dir, register in .gitignore. (Merged: config-without-seed + artifact-gitignore-gap)
- **mock-data-scatter**: Inline mocks scattered across N stories → N modifications on data change. Extract to fixtures when 3+ share data
- **composition-undocumented**: Container slot structure exists only in code. DesignGuide recipe required

## Component

- **build-render-mismatch**: tsc pass ≠ runtime correct. Only storybook build verifies rendering

## AI

- **llms-txt-stale**: llms.md not regenerated after component add/remove. Run `pnpm generate:llms` after changes

## Harness

- **heritage-count-drift**: self-model.md heritage counts drift when entries consolidated without update. Count via grep when updating
- **sprint-step-skip-late**: Steps ❿ PR+CI skipped under context pressure. 4-point positional redundancy in SKILL.md prevents

## Consumer DX

- **token-mapping-boilerplate**: Consumers must copy 60+ lines of `@theme inline` CSS. Fix: provide preset CSS import
- **convenience-wrapper-missing**: Compound components require verbose assembly. Fix: add convenience wrappers alongside compound API
- **discoverability-gap**: Existing features missed by consumers. Fix: improve llms.md surface area and component .md examples

## Testing

- **happy-path-only-tests**: Tests cover only rendering + basic interaction. Must cover 6 categories: rendering, props, happy-path, action failure, keyboard nav, ARIA

## Tooling

- **package-manager-gotchas**: `pnpm script -- --flag` passes `--` to vitest (misinterpreted). After manager switch, grep for old manager refs. (Merged: npx-pnpm-passthrough + npm-remnants)

# Decisions Registry

> Design decisions. Referenced by /sprint RETRO phase.

## Verification

- **commit-immediate-on-build**: tsc pass → commit immediately. No delay
- **semantic-token-only**: No hardcoded CSS colors. Use var(--xxx)
- **component-pipeline-chain**: type→component→barrel→fixture→story→dashboard. 6-step sequential chain. Skipping steps causes tsc failure or story miss
- **poc-correction-loop**: POC accuracy = final quality ceiling. "Feels OK" ≠ PASS. Enumerate specific differences
- **type-render-parity**: All props type fields must be rendered or explicitly marked internal. No ghost fields
- **empty-state-story**: List/table components require empty array story. Structural guarantee = story existence
- **config-seed-file**: When registering file patterns in build config, create at least 1 seed file simultaneously. Config without files = debt
- **fixture-single-source**: When 3+ stories share the same data, centralize in **fixtures**/. Inline mocks = O(N) maintenance
- **composition-recipe-doc**: Container component slot architecture + state patterns must be documented in DesignGuide. More valuable than code

## AI Integration

- **llms-txt-auto-gen**: llms.md and llms-full.md auto-generated from component .md files via `pnpm generate:llms`. Manual authoring = sync drift
- **three-tier-ai-consumption**: llms.md (index, ~2K tokens) + Storybook MCP (real-time query) + component .md (deep context). Each tier serves different AI consumers
- **skills-mcp-complement**: Skills = internal workflow orchestration (few hundred tokens). MCP = external data access standard (thousands of tokens). Not interchangeable
- **storybook-mcp-experimental**: @storybook/addon-mcp is experimental. llms.md provides stable fallback. Both channels maintained

## Strategy

- **ship-loop-harness**: Don't perfect the harness first. Evolve it within the shipping loop. Perfect preparation = time delay risk
- **6-gate-chain**: G0 Scope → G1 Surface (auto) → G2 Static (manual) → G3 Runtime (manual) → G4 Heritage (conditional) → G5 CI (remote). Gates are sequential, binary, and shared between BUILD and COMMIT. Single source of truth in sprint SKILL.md
- **hard-soft-separation**: Gate violations (format/lint/typecheck/test/build) are binary hard gates. Health indicators (unreviewed commits, heritage freshness, dead refs) are soft checks with score. Never use a score to govern an invariant
- **merge-user-authority**: System prepares (CI green, PR ready) but never auto-merges. Merge = user decision. Post-merge cleanup (branch delete, failed run delete) is autonomous

## Process

- **sprint-clear-commit-align**: Commit boundary = session boundary. Build→commit→retro. Next session fully restores from git log + file reads

## Harness

- **coverage-ratchet**: Coverage threshold auto-rises to current - 1%. Only blocks regression, enables natural growth
- **bundle-budget-g3**: Bundle size (512KB budget) enforced as G3 hard gate extension after `pnpm build`. Measures initial entry bundle (files referenced by index.html), not total dist. Code-split lazy chunks excluded because users load them on demand. >512KB = FAIL. 400-512KB = WARN. Rationale: bundle is a build output metric, not a separate gate. Avoids renumbering G4/G5 and breaking heritage refs
- **pr-size-precheck**: PR size checked as pre-PR soft gate before push. >500 lines = WARN + user confirm. >1000 lines = BLOCK (user override possible). Not a numbered gate because diff size is contextual, not binary quality. Applies to both `/commit pr` and sprint ❿ PR+CI step
- **ci-needs-chain**: lint → test/visual dependency required. Static analysis failure blocks downstream job resources
- **three-loop-selfheal**: Detect (health-check) → Correct (ratchet, auto-baseline) → Defend (dependency-review, actionlint). 3-loop triangle maintains quality floor

## File Convention

- **barrel-tier-boundary**: index.ts barrel required for Tier 2+ composites (3+ sub-components), forbidden for Tier 0-1 (single export). Barrel = public API boundary per FSD "public API per slice" principle. Category-level barrels always exist regardless of tier
- **fsd-segment-naming**: File suffixes map to FSD segments (.tsx=ui, .type.ts=model, .variant.ts=config, .hook.ts=model, .policy.ts=lib, .const.ts=config, index.ts=api). Does not change file names — clarifies architectural role
- **template-safe-commands**: SKILL.md code blocks must avoid `$N` (numeric positional) patterns. Use letter-named bash variables ($s, $n, $f) which are not expanded by the skill template engine

## Library Publishing

- **dual-build-target**: Dev build (vite.config.ts for storybook/demo) and lib build (vite.lib.config.ts + tsconfig.build.json for npm) are separate pipelines. Changes must pass both. `pnpm build` ≠ `pnpm build:lib`
- **declaration-emit-explicit**: Barrel files re-exporting Radix primitives need explicit type annotations for declaration emit. `export const X = RadixX` fails without `satisfies typeof RadixX` or explicit typing. Caught in menubar barrel
- **consumer-feedback-loop**: Build external consumer → collect friction points → strengthen library. Feedback splits into: real gaps (implement), already-addressed (document better), out-of-scope (provide recipes). Never accept feedback uncritically

## Component Design

- **svg-first-viz**: No external chart libraries. React+SVG+Tailwind for visualization. stroke-dasharray for donut/gauge, polygon for radar, polyline for sparkline. Zero bundle dependency
- **accessibility-role-first**: All visualizations get role(meter/img/region)+aria-label+aria-valuenow. play() tests query by role for simultaneous accessibility verification
- **sprint-pair-pattern**: 2 component pairs per sprint = complementary visualization. Pairs over singles make dashboard composition natural
- **interaction-play-behavioral**: play functions go beyond structure verification (role exists) to behavioral verification (click→sort, hover→dim). userEvent.click/hover + state change assert
- **global-css-motion-gate**: prefers-reduced-motion applied globally via single CSS media query (covers transition/animation). But rAF-based JS animations bypass CSS queries, so rAF hooks must call usePrefersReducedMotion
- **evaluation-actionable**: Design system evaluation reports must include specific fix code + file paths + difficulty. Non-actionable reports = debt

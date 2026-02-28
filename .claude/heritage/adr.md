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
- **bundle-budget-g3**: Bundle size (512KB budget) enforced as G3 hard gate extension after `pnpm build`. `du -sk dist | cut -f1` → >512KB = FAIL. 400-512KB = WARN. Rationale: bundle is a build output metric, not a separate gate. Avoids renumbering G4/G5 and breaking heritage refs
- **pr-size-precheck**: PR size checked as pre-PR soft gate before push. >500 lines = WARN + user confirm. >1000 lines = BLOCK (user override possible). Not a numbered gate because diff size is contextual, not binary quality. Applies to both `/commit pr` and sprint ❿ PR+CI step
- **ci-needs-chain**: lint → test/visual dependency required. Static analysis failure blocks downstream job resources
- **three-loop-selfheal**: Detect (health-check) → Correct (ratchet, auto-baseline) → Defend (dependency-review, actionlint). 3-loop triangle maintains quality floor

## Component Design

- **svg-first-viz**: No external chart libraries. React+SVG+Tailwind for visualization. stroke-dasharray for donut/gauge, polygon for radar, polyline for sparkline. Zero bundle dependency
- **accessibility-role-first**: All visualizations get role(meter/img/region)+aria-label+aria-valuenow. play() tests query by role for simultaneous accessibility verification
- **sprint-pair-pattern**: 2 component pairs per sprint = complementary visualization. Pairs over singles make dashboard composition natural
- **interaction-play-behavioral**: play functions go beyond structure verification (role exists) to behavioral verification (click→sort, hover→dim). userEvent.click/hover + state change assert
- **global-css-motion-gate**: prefers-reduced-motion applied globally via single CSS media query (covers transition/animation). But rAF-based JS animations bypass CSS queries, so rAF hooks must call usePrefersReducedMotion
- **evaluation-actionable**: Design system evaluation reports must include specific fix code + file paths + difficulty. Non-actionable reports = debt

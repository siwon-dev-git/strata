# Decisions Registry

> Design decisions. Referenced by /sprint RETRO phase. One-line format: name → decision.

## Verification

- **semantic-token-only**: No hardcoded CSS colors. Use `var(--xxx)` only
- **component-pipeline-chain**: type→component→barrel→fixture→story→dashboard. 6-step sequential chain
- **type-render-parity**: All props type fields must be rendered or explicitly marked internal
- **empty-state-story**: List/table components require empty array story
- **fixture-single-source**: 3+ stories sharing data → centralize in fixtures/
- **composition-recipe-doc**: Container slot architecture must be documented in DesignGuide

## AI Integration

- **llms-txt-auto-gen**: llms.md/llms-full.md auto-generated via `pnpm generate:llms`. Never manually author
- **three-tier-ai-consumption**: llms.md (index) + Storybook MCP (real-time) + component .md (deep). Each tier for different consumers
- **ai-channel-strategy**: Skills = internal orchestration. MCP = external data access. llms.md = stable fallback for experimental MCP. (Merged: skills-mcp-complement + storybook-mcp-experimental)

## Strategy

- **ship-loop-harness**: Evolve harness within shipping loop. Perfect preparation = delay risk
- **6-gate-chain**: G0→G1(auto)→G2(manual)→G3(manual)→G4(conditional)→G5(remote). Sequential, binary. Single source in sprint SKILL.md
- **hard-soft-separation**: Gate violations = binary hard gates. Health indicators = soft checks with score. Never score an invariant
- **merge-user-authority**: System prepares, never auto-merges. Post-merge cleanup is autonomous
- **sprint-clear-commit-align**: Commit boundary = session boundary. Build→commit→retro→clear. (Merged Process section)

## Harness

- **coverage-ratchet**: Threshold auto-rises to current - 1%. Blocks regression only
- **bundle-budget-g3**: 512KB budget in G3 after build. Entry bundle from index.html, excludes lazy chunks
- **pr-size-precheck**: Pre-PR soft gate. >500 WARN, >1000 BLOCK (overridable). Contextual, not binary
- **ci-needs-chain**: lint → test dependency. Static failure blocks downstream jobs
- **three-loop-selfheal**: Detect → Correct → Defend. 3-loop triangle maintains quality floor

## File Convention

- **barrel-tier-boundary**: index.ts barrel required for Tier 2+ (3+ sub-components), forbidden for Tier 0-1
- **fsd-segment-naming**: Suffixes → FSD segments: .tsx=ui, .type.ts=model, .variant.ts=config, .hook.ts=model, .policy.ts=lib, .const.ts=config

## Library Publishing

- **dual-build-target**: Dev build (vite.config.ts) and lib build (vite.lib.config.ts) are separate pipelines
- **declaration-emit-explicit**: Barrel re-exports of Radix need explicit type annotations for declaration emit
- **consumer-feedback-loop**: Feedback → real gaps (implement) / already-addressed (document) / out-of-scope (recipes)

## Component Design

- **svg-first-viz**: React+SVG+Tailwind for visualization. No external chart libraries
- **accessibility-role-first**: Visualizations get role+aria-label+aria-valuenow. play() tests query by role
- **sprint-pair-pattern**: 2 component pairs per sprint = complementary visualization
- **interaction-play-behavioral**: play() goes beyond structure to behavioral verification (click→sort, hover→dim)
- **global-css-motion-gate**: prefers-reduced-motion via CSS media query; rAF hooks must call usePrefersReducedMotion
- **test-scope-sixfold**: 6 test categories: rendering, props, happy-path, action failure, keyboard, ARIA
- **jsdom-polyfill-register**: Radix browser APIs (ResizeObserver, scrollIntoView, pointerCapture) → centralize in setup.ts
- **btn-touch-target-pseudo**: Touch target expansion uses invisible before pseudo-element. min-height conflicts with compact density
- **btn-type-button-default**: Button defaults to type="button" instead of native "submit". Alpha-stage breaking change accepted
- **btn-icon-dev-warning**: Icon-only buttons warn in dev when missing aria-label. Runtime warning over TS discriminated union
- **focus-ring-component-tokens**: Button focus ring uses L3 tokens (--btn-focus-ring-*) aligned with Input/Select/Textarea pattern

# Decisions Registry

> Design decisions. Referenced by /sprint RETRO phase. One-line format: name → decision.

## Verification

- **semantic-token-only**: No hardcoded CSS colors. Use `var(--xxx)` only
- **component-pipeline-chain**: type→component→barrel→fixture→story→dashboard. 6-step sequential chain
- **type-render-parity**: All props type fields must be rendered or explicitly marked internal
- **empty-state-story**: List/table components require empty array story
- **fixture-single-source**: 3+ stories sharing data → centralize in fixtures/
- **composition-recipe-doc**: Container slot architecture must be documented in DesignGuide
- **l3-never-references-l1**: Layer 3 component tokens must reference Layer 2 semantic tokens exclusively. Layer 2 references Layer 1. No skip connections. CI enforces via grep for `--sp-gray-` and `oklch(` in `layer3-component.css`
- **use-client-boundary**: All component `.tsx` files get `"use client"` directive. Type files (`.type.ts`), variant files (`.variant.ts`), and barrel `index.ts` files remain server-safe for RSC compatibility

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
- **token-layer-ci-lint**: CI step greps `layer3-component.css` for L1 references (`--sp-gray-`) and hardcoded `oklch(` values. Any match = hard fail. Prevents layer violation regression
- **bundle-budget-hard-gate**: Bundle size gate enforces 512KB hard limit (not just PR comment). Runs after build step, fails CI if exceeded

## File Convention

- **barrel-tier-boundary**: index.ts barrel required for Tier 2+ (3+ sub-components), forbidden for Tier 0-1
- **fsd-segment-naming**: Suffixes → FSD segments: .tsx=ui, .type.ts=model, .variant.ts=config, .hook.ts=model, .policy.ts=lib, .const.ts=config

## Library Publishing

- **dual-build-target**: Dev build (vite.config.ts) and lib build (vite.lib.config.ts) are separate pipelines
- **external-from-manifest**: Rollup external을 package.json deps + peerDeps에서 빌드 시 derive. 수동 리스트 금지
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
- **focus-ring-component-tokens**: Button focus ring uses L3 tokens (--btn-focus-ring-\*) aligned with Input/Select/Textarea pattern

## Phase 1-4 Strategic Decisions (2026-03-01)

- **create-theme-css-only**: createTheme() generates CSS custom property blocks. No runtime JS theme switching — CSS cascade handles it
- **server-provider-no-hooks**: StrataServerProvider uses zero hooks/useState. Props-only div wrapper for RSC environments
- **icon-tree-shaking**: Individual icon files in icons/ directory. createIcon factory shared. barrel re-export preserves backward compat
- **intent-vocabulary-extensible**: 5 built-in intents (professional, playful, minimal, bold, calm). registerIntent() for custom profiles
- **screen-analysis-contract**: ScreenAnalysis interface is the standard AI vision model output schema. analysisToJSX() for code generation
- **recipe-per-pattern**: 3 page recipes (SettingsPage, DataDashboard, AuthFlow). Each demonstrates a distinct layout pattern
- **spring-easing-disclosure**: Spring easing (--sp-ease-spring) applied to Dialog/Sheet/Accordion/Tooltip via L3 tokens
- **dtcg-description-fields**: tokens.json includes $description per group. Script auto-generates from GROUP_DESCRIPTIONS map
- **four-tier-consumption**: L1(llms.md) → L2(Storybook MCP) → L3(Assembly MCP) → L4(tokens.json). Progressive detail
- **quality-score-composite**: Component quality = testing(30) + stories(20) + tokens(20) + docs(15) + types(15) = 100
- **self-improve-threshold**: Gap detected when same event appears 3+ times. Priority = (impact × frequency) / effort
- **vrt-playwright-free**: Visual regression via Playwright toHaveScreenshot(). Dark+light mode per component. Free, no Chromatic

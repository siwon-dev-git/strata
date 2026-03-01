# Decisions Registry

> Design decisions. Referenced by /sprint RETRO phase. One-line format: name [tags] → decision.
> Tags: `tokens`, `ci`, `styling`, `testing`, `architecture`, `radix`, `a11y`, `build`, `dx`, `ai`, `publishing`, `motion`

## Verification

- **semantic-token-only** [tokens, ci, styling]: No hardcoded CSS colors. Use `var(--xxx)` only
- **component-pipeline-chain** [architecture, build]: type→component→barrel→fixture→story→dashboard. 6-step sequential chain
- **type-render-parity** [architecture, dx]: All props type fields must be rendered or explicitly marked internal
- **empty-state-story** [testing, dx]: List/table components require empty array story
- **fixture-single-source** [testing, dx]: 3+ stories sharing data → centralize in fixtures/
- **composition-recipe-doc** [dx, architecture]: Container slot architecture must be documented in DesignGuide
- **l3-never-references-l1** [tokens, ci, architecture]: Layer 3 component tokens must reference Layer 2 semantic tokens exclusively. Layer 2 references Layer 1. No skip connections. CI enforces via grep for `--sp-` and `oklch(` in `layer3-component.css`
- **use-client-boundary** [architecture, build, radix]: All component `.tsx` files get `"use client"` directive. Type files (`.type.ts`), variant files (`.variant.ts`), and barrel `index.ts` files remain server-safe for RSC compatibility

## AI Integration

- **llms-txt-auto-gen** [ai, build]: llms.md/llms-full.md auto-generated via `pnpm generate:llms`. Never manually author
- **three-tier-ai-consumption** [ai, dx]: llms.md (index) + Storybook MCP (real-time) + component .md (deep). Each tier for different consumers
- **ai-channel-strategy** [ai, architecture]: Skills = internal orchestration. MCP = external data access. llms.md = stable fallback for experimental MCP. (Merged: skills-mcp-complement + storybook-mcp-experimental)

## Strategy

- **ship-loop-harness** [architecture]: Evolve harness within shipping loop. Perfect preparation = delay risk
- **6-gate-chain** [ci, architecture]: G0→G1(auto)→G2(manual)→G3(manual)→G4(conditional)→G5(remote). Sequential, binary. Single source in sprint SKILL.md
- **hard-soft-separation** [ci, architecture]: Gate violations = binary hard gates. Health indicators = soft checks with score. Never score an invariant
- **merge-user-authority** [ci, dx]: System prepares, never auto-merges. Post-merge cleanup is autonomous
- **sprint-clear-commit-align** [architecture, dx]: Commit boundary = session boundary. Build→commit→retro→clear. (Merged Process section)

## Harness

- **coverage-ratchet** [testing, ci]: Threshold auto-rises to current - 1%. Blocks regression only
- **bundle-budget-g3** [build, ci]: 512KB budget in G3 after build. Entry bundle from index.html, excludes lazy chunks
- **pr-size-precheck** [ci, dx]: Pre-PR soft gate. >500 WARN, >1000 BLOCK (overridable). Contextual, not binary
- **ci-needs-chain** [ci, build]: lint → test dependency. Static failure blocks downstream jobs
- **three-loop-selfheal** [architecture, ci]: Detect → Correct → Defend. 3-loop triangle maintains quality floor
- **token-layer-ci-lint** [tokens, ci]: CI step greps `layer3-component.css` for L1 references (`--sp-*`) and hardcoded `oklch(` values. Any match = hard fail. Prevents layer violation regression
- **bundle-budget-hard-gate** [build, ci]: Bundle size gate enforces 512KB hard limit (not just PR comment). Runs after build step, fails CI if exceeded

## File Convention

- **barrel-tier-boundary** [architecture, dx]: index.ts barrel required for Tier 2+ (3+ sub-components), forbidden for Tier 0-1
- **fsd-segment-naming** [architecture, dx]: Suffixes → FSD segments: .tsx=ui, .type.ts=model, .variant.ts=config, .hook.ts=model, .policy.ts=lib, .const.ts=config

## Publishing & Distribution

- **package-name-siwon-dev** [publishing]: @siwon-dev-npm/strata is the published name. Retain for v1.0; re-evaluate scope if org changes
- **dist-tag-auto-detect** [publishing, ci]: publish.yml parses version string — alpha/beta/rc → `next` tag, stable → `latest`. No manual dist-tag management
- **roadmap-standalone** [dx]: ROADMAP.md is the canonical roadmap. README links to it. Includes version policy and v1.0 milestone criteria
- **token-lint-all-l1** [tokens, ci]: CI token lint greps `--sp-` (all L1 refs), not just `--sp-gray-`. Catches radius/spacing/motion L1 leaks into L3

## Library Publishing

- **dual-build-target** [build, publishing]: Dev build (vite.config.ts) and lib build (vite.lib.config.ts) are separate pipelines
- **external-from-manifest** [build, publishing]: Rollup external을 package.json deps + peerDeps에서 빌드 시 derive. 수동 리스트 금지
- **declaration-emit-explicit** [build, publishing, radix]: Barrel re-exports of Radix need explicit type annotations for declaration emit
- **consumer-feedback-loop** [dx, publishing]: Feedback → real gaps (implement) / already-addressed (document) / out-of-scope (recipes)

## Component Design

- **svg-first-viz** [architecture, styling]: React+SVG+Tailwind for visualization. No external chart libraries
- **accessibility-role-first** [a11y, testing]: Visualizations get role+aria-label+aria-valuenow. play() tests query by role
- **sprint-pair-pattern** [architecture]: 2 component pairs per sprint = complementary visualization
- **interaction-play-behavioral** [testing]: play() goes beyond structure to behavioral verification (click→sort, hover→dim)
- **global-css-motion-gate** [motion, a11y]: prefers-reduced-motion via CSS media query; rAF hooks must call usePrefersReducedMotion
- **test-scope-sixfold** [testing]: 6 test categories: rendering, props, happy-path, action failure, keyboard, ARIA
- **jsdom-polyfill-register** [testing, radix]: Radix browser APIs (ResizeObserver, scrollIntoView, pointerCapture) → centralize in setup.ts
- **btn-touch-target-pseudo** [a11y, styling]: Touch target expansion uses invisible before pseudo-element. min-height conflicts with compact density
- **btn-type-button-default** [a11y, dx]: Button defaults to type="button" instead of native "submit". Alpha-stage breaking change accepted
- **btn-icon-dev-warning** [a11y, dx]: Icon-only buttons warn in dev when missing aria-label. Runtime warning over TS discriminated union
- **focus-ring-component-tokens** [tokens, a11y, styling]: Button focus ring uses L3 tokens (--btn-focus-ring-\*) aligned with Input/Select/Textarea pattern

## Phase 1-4 Strategic Decisions (2026-03-01)

- **create-theme-css-only** [tokens, architecture]: createTheme() generates CSS custom property blocks. No runtime JS theme switching — CSS cascade handles it
- **server-provider-no-hooks** [architecture, radix]: StrataServerProvider uses zero hooks/useState. Props-only div wrapper for RSC environments
- **icon-tree-shaking** [build, dx]: Individual icon files in icons/ directory. createIcon factory shared. barrel re-export preserves backward compat
- **intent-vocabulary-extensible** [ai, dx]: 5 built-in intents (professional, playful, minimal, bold, calm). registerIntent() for custom profiles
- **screen-analysis-contract** [ai, architecture]: ScreenAnalysis interface is the standard AI vision model output schema. analysisToJSX() for code generation
- **recipe-per-pattern** [architecture, dx]: 3 page recipes (SettingsPage, DataDashboard, AuthFlow). Each demonstrates a distinct layout pattern
- **spring-easing-disclosure** [motion, tokens]: Spring easing (--sp-ease-spring) applied to Dialog/Sheet/Accordion/Tooltip via L3 tokens
- **dtcg-description-fields** [tokens, ai]: tokens.json includes $description per group. Script auto-generates from GROUP_DESCRIPTIONS map
- **four-tier-consumption** [ai, architecture]: L1(llms.md) → L2(Storybook MCP) → L3(Assembly MCP) → L4(tokens.json). Progressive detail
- **quality-score-composite** [testing, ai]: Component quality = testing(30) + stories(20) + tokens(20) + docs(15) + types(15) = 100
- **self-improve-threshold** [ai, architecture]: Gap detected when same event appears 3+ times. Priority = (impact × frequency) / effort
- **vrt-playwright-free** [testing, build]: Visual regression via Playwright toHaveScreenshot(). Dark+light mode per component. Free, no Chromatic

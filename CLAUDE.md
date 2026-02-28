# Strata Design System

React 19 + TypeScript 5.9 + Tailwind CSS v4.2 + Radix UI design system.
Code comments and commits in English.

## Stack

- React 19, TypeScript 5.9, Tailwind CSS v4.2, Vite 7, Storybook 10
- Radix UI (27 headless primitives), Vitest 4
- 3-layer design tokens: OKLch primitives → semantic → component
- Theme: `data-theme` attr + `dark` class

## Commands

`/convention [target]` — Strata File Convention. Tier-based component file structure.

- `audit` → Full tier status report
- `{ComponentName}` → Apply convention to single component
- `all` → Apply to all components
- `md` → Generate .md files only (safest entry point)

`/sprint [quest]` — Sprint build cycle.

- text → BUILD 1 cycle (quest)
- number N → MAINTAIN N cycles

`/commit [pr] [merge]` — Commit with convention.

- (no args) → Analyze + commit by domain
- `pr` → Commit + create PR
- `pr merge` → Commit + PR + merge when CI green

`/research [topic]` — Evidence-based research with falsification loops.

## Structure

```
src/components/{primitives|layout|disclosure|feedback}/
src/tokens/     — 3-layer CSS custom properties
src/demos/      — 12 reference implementations
src/icons/      — 61 SVG icon components
scripts/        — Build utilities (llms.md generation)
```

## Conventions

- CSS: semantic tokens only — `var(--xxx)`, never hardcoded colors
- Components: Radix UI headless + Tailwind styling, `cn()` for class merging
- Testing: Vitest + Testing Library, `play()` functions for behavioral tests
- Token reuse: shared token groups across related components (e.g. `--menu-*`, `--checkbox-*`)

## AI Integration

- `llms.md` / `llms-full.md` — AI-readable component index (auto-generated via `pnpm generate:llms`)
- Storybook MCP — `@storybook/addon-mcp` exposes component manifest at `http://localhost:6007/mcp`
- Before UI development, query Storybook MCP for existing component APIs

## Verification

```bash
pnpm typecheck    # tsc -b
pnpm test:ci      # vitest run
pnpm build        # tsc -b && vite build
```

## References

- `.claude/heritage/adr.md` — Design decisions
- `.claude/heritage/fmea.md` — Failure pattern catalog

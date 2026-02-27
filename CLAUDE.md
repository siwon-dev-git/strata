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

## Structure

```
src/components/{primitives|layout|disclosure|feedback}/
src/tokens/     — 3-layer CSS custom properties
src/demos/      — 10 reference implementations
```

## Conventions

- CSS: semantic tokens only — `var(--xxx)`, never hardcoded colors
- Components: Radix UI headless + Tailwind styling, `cn()` for class merging
- Testing: Vitest + Testing Library, `play()` functions for behavioral tests
- Token reuse: shared token groups across related components (e.g. `--menu-*`, `--checkbox-*`)

## Verification

```bash
pnpm typecheck    # tsc -b
pnpm test:ci      # vitest run
pnpm build        # tsc -b && vite build
```

## References

- `.claude/heritage/adr.md` — Design decisions
- `.claude/heritage/fmea.md` — Failure pattern catalog

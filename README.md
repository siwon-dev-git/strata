# Strata Design System

A modern design system built with React 19, Radix UI, and Tailwind CSS v4.

## Features

- **3-Layer Token Architecture** — OKLch primitives → semantic → component tokens
- **Radix UI Headless** — 27 accessible, composable primitives
- **Dark Mode** — First-class dark mode via `data-theme` + `dark` class
- **57 Components** — Primitives, layout, disclosure, and feedback
- **10 Demo Apps** — Linear, Slack, Twitter, Notion, Spotify, GitHub, Discord, Figma, VS Code, Trello

## Quick Start

```bash
pnpm install
pnpm storybook     # Storybook on http://localhost:6007
pnpm dev           # Dev server
```

## Stack

| Layer         | Technology                                        |
| ------------- | ------------------------------------------------- |
| UI Primitives | [Radix UI](https://www.radix-ui.com/)             |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com/)       |
| Framework     | [React 19](https://react.dev/)                    |
| Language      | [TypeScript 5.9](https://www.typescriptlang.org/) |
| Build         | [Vite 7](https://vite.dev/)                       |
| Docs          | [Storybook 10](https://storybook.js.org/)         |
| Tests         | [Vitest 4](https://vitest.dev/) + Testing Library |

## Token System

Strata uses a 3-layer design token architecture:

```
Layer 1 (Primitive)  →  Raw values in OKLch color space
Layer 2 (Semantic)   →  Meaningful aliases (--surface-*, --fg-*, --border-*)
Layer 3 (Component)  →  Component-specific overrides (--btn-*, --dialog-*)
```

Token files: `src/tokens/layer1-primitive.css` → `layer2-semantic.css` → `layer3-component.css`

## Components

| Category   | Count | Examples                                                              |
| ---------- | ----- | --------------------------------------------------------------------- |
| Primitives | 34    | Button, Input, Avatar, Badge, Card, Checkbox, Select, Slider, Switch  |
| Layout     | 5     | AppShell, Sidebar, TopBar, Stack, Container                           |
| Disclosure | 13    | Dialog, Tabs, Tooltip, DropdownMenu, Accordion, Sheet, NavigationMenu |
| Feedback   | 5     | Toast, Alert, Skeleton, Callout, EmptyState                           |

## Scripts

```bash
pnpm dev            # Start dev server
pnpm build          # TypeScript check + Vite build
pnpm storybook      # Start Storybook (port 6007)
pnpm test           # Run tests in watch mode
pnpm test:ci        # Run tests once
pnpm typecheck      # TypeScript check (tsc -b)
pnpm format         # Format with Prettier
pnpm lint           # ESLint check
```

## Claude Code Integration

This project includes `.claude/` configuration for AI-assisted development:

- `/convention [target]` — Strata File Convention. Tier-based component structure analysis and scaffolding
- `/sprint [quest]` — Sprint build cycle with automated review, testing, and heritage tracking

See [CLAUDE.md](CLAUDE.md) for details.

## License

[MIT](LICENSE)

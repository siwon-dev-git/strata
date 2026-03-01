<div align="center">

# Strata Design System

**The first design system built for AI-assisted development.**

React 19 + Radix UI + Tailwind CSS v4 + OKLch Tokens

[![npm](https://img.shields.io/npm/v/@siwon-dev-npm/strata?color=blue)](https://www.npmjs.com/package/@siwon-dev-npm/strata)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8)](https://tailwindcss.com/)

[Quick Start](#quick-start) ·
[Components](#components) ·
[Token System](#3-layer-oklch-token-system) ·
[AI Integration](#ai-native-architecture) ·
[Roadmap](#roadmap)

</div>

---

> [!WARNING]
> **Alpha** — Strata is in active development (`0.x`). APIs may change between minor versions.
> See [ROADMAP.md](ROADMAP.md) for the path to v1.0.

## Why Strata?

Design systems have been built for **humans**. Strata is built for **humans _and_ AI**.

While other libraries focus on component count or CSS-in-JS convenience, Strata introduces a systems-level approach — combining perceptually uniform color science, structured machine-readable documentation, and institutional governance that scales with your team.

|                                       |      Strata       | shadcn/ui | Chakra UI  | Mantine |
| ------------------------------------- | :---------------: | :-------: | :--------: | :-----: |
| **AI-readable docs** (llms.txt + MCP) |      **Yes**      |    No     |     No     |   No    |
| **Perceptual color system** (OKLch)   |      **Yes**      |    No     |     No     |   No    |
| **3-layer token architecture**        |      **Yes**      |  Partial  |  JS only   | JS only |
| **Headless + styled** (Radix UI)      | **27 primitives** |   Radix   |   Custom   | Custom  |
| **Runtime theme switching**           | **CSS vars only** | CSS vars  | JS context |  Hooks  |
| **Decision registry** (ADR + FMEA)    |      **Yes**      |    No     |     No     |   No    |
| **Convention system**                 |   **Tier 0–3**    |    No     |     No     |   No    |
| **Real-world demos**                  |    **12 apps**    | Starters  |     No     |   No    |

## Quick Start

```bash
pnpm install
pnpm storybook     # Component explorer → http://localhost:6007
pnpm dev           # Dev server
```

## Stack

| Layer         | Technology                                        | Why                                             |
| ------------- | ------------------------------------------------- | ----------------------------------------------- |
| UI Primitives | [Radix UI](https://www.radix-ui.com/)             | Battle-tested a11y, headless composition        |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com/)       | Native `@theme`, zero-runtime CSS               |
| Framework     | [React 19](https://react.dev/)                    | Compiler optimizations, Server Components ready |
| Language      | [TypeScript 5.9](https://www.typescriptlang.org/) | Strict type safety across all components        |
| Build         | [Vite 7](https://vite.dev/)                       | Sub-100ms HMR, ESM-first                        |
| Docs          | [Storybook 10](https://storybook.js.org/)         | Interactive playground + MCP endpoint           |
| Tests         | [Vitest 4](https://vitest.dev/) + Testing Library | Behavioral testing with `play()` functions      |

## Components

**57 components** across 4 categories, all built on Radix UI headless primitives.

| Category       | Count | Highlights                                                                   |
| -------------- | ----- | ---------------------------------------------------------------------------- |
| **Primitives** | 34    | Button, Input, Avatar, Badge, Card, Checkbox, Select, Slider, Switch, Toggle |
| **Layout**     | 5     | AppShell, Sidebar, TopBar, Stack, Container                                  |
| **Disclosure** | 13    | Dialog, Tabs, Tooltip, DropdownMenu, Accordion, Sheet, NavigationMenu        |
| **Feedback**   | 5     | Toast, Alert, Skeleton, Callout, EmptyState                                  |

Every component includes:

- `.tsx` — Implementation with Radix UI + Tailwind
- `.test.tsx` — Behavioral tests (role queries, a11y, state verification)
- `.stories.tsx` — Interactive Storybook stories with `play()` functions
- `.md` — Structured documentation (Role, Tier, Tokens, Constraints)

## 3-Layer OKLch Token System

Strata uses **OKLch** — a perceptually uniform color space that produces consistent, vibrant palettes without the hue-shift artifacts of HSL/RGB.

```
Layer 1 (Primitive)   Raw OKLch scales, spacing, typography, radius
    ↓                 Prefix: --sp-*  |  11 color palettes
Layer 2 (Semantic)    Business-intent aliases with dark/light pairs
    ↓                 --surface-*, --fg-*, --border-*, --color-*
Layer 3 (Component)   Scoped overrides per component
                      --btn-*, --dialog-*, --menu-*, --input-*
```

**Key principles:**

- **Unidirectional flow** — Layer 3 → Layer 2 → Layer 1. No circular dependencies
- **CSS variables only** — No runtime JS serialization. Instant theme switching
- **Token reuse** — Related components share token groups (e.g., `--menu-*` powers DropdownMenu, ContextMenu, NavigationMenu, Menubar)
- **Auditable chain** — Every color traces back to a primitive OKLch value

Token files: [`layer1-primitive.css`](src/tokens/layer1-primitive.css) → [`layer2-semantic.css`](src/tokens/layer2-semantic.css) → [`layer3-component.css`](src/tokens/layer3-component.css)

## AI-Native Architecture

Strata is the first design system with a **three-tier AI consumption strategy**:

```
┌─────────────────────────────────────────────────────┐
│  Tier 1: llms.md           ~2K tokens   Index       │
│  Tier 2: llms-full.md     ~15K tokens   Deep docs   │
│  Tier 3: Storybook MCP    Real-time     Live API    │
└─────────────────────────────────────────────────────┘
```

| Channel           | File                           | Use Case                                                                                       |
| ----------------- | ------------------------------ | ---------------------------------------------------------------------------------------------- |
| **llms.md**       | [`llms.md`](llms.md)           | Quick component discovery for any AI tool                                                      |
| **llms-full.md**  | [`llms-full.md`](llms-full.md) | Full implementation guidance for large-context models                                          |
| **Storybook MCP** | `http://localhost:6007/mcp`    | Real-time component API queries via [Model Context Protocol](https://modelcontextprotocol.io/) |
| **Component .md** | `src/components/*/*.md`        | Structured docs (Role, Tier, Tokens, Constraints)                                              |

### For AI tool users (Cursor, Windsurf, Claude, ChatGPT)

Point your AI tool at `llms.md` for component discovery, or `llms-full.md` for detailed implementation guidance. The structured `.md` format eliminates hallucination by providing exact token dependencies and API constraints.

### For Claude Code

Strata includes built-in orchestration skills:

| Command                | Purpose                                                                  |
| ---------------------- | ------------------------------------------------------------------------ |
| `/convention [target]` | Tier-based component structure analysis and scaffolding                  |
| `/sprint [quest]`      | Sprint build cycle with automated review, testing, and heritage tracking |
| `/commit [pr] [merge]` | Conventional commit with optional PR workflow                            |
| `/research [topic]`    | Evidence-based research with falsification loops                         |

## 12 Real-World Demos

Strata includes production-grade demo applications that prove component composition in real scenarios:

| Demo         | Pattern                                             |
| ------------ | --------------------------------------------------- |
| **Linear**   | Issue tracker — Select + Dialog + Badge composition |
| **Slack**    | Message threads — AppShell + Sidebar + ScrollArea   |
| **Twitter**  | Social feed — Card + Avatar + DropdownMenu          |
| **Notion**   | Note-taking — Toolbar + Toggle + NavigationMenu     |
| **Spotify**  | Music player — Slider + Tabs + ScrollArea           |
| **GitHub**   | Issue browser — Table patterns + Label + Badge      |
| **Discord**  | Server navigation — Sidebar + Tooltip + Avatar      |
| **Figma**    | Document browser — Card grid + AspectRatio          |
| **VS Code**  | Editor layout — AppShell + Tabs + Menubar           |
| **Trello**   | Kanban board — Card + drag patterns + Stack         |
| **WhatsApp** | Mobile chat — Avatar + Badge + Tabs + Input         |
| **Reddit**   | Social forum — Card + recursive comments + Tabs     |

## Governance & Heritage

Strata doesn't just ship components — it captures **institutional knowledge** that compounds over time.

- **ADR (Architecture Decision Records)** — Every design decision is logged with rationale ([`adr.md`](.claude/heritage/adr.md))
- **FMEA (Failure Mode & Effects Analysis)** — Known failure patterns are cataloged to prevent recurrence ([`fmea.md`](.claude/heritage/fmea.md))
- **Convention System** — 4-tier classification (Leaf → Styled → Composite → Domain) with automated audit and scaffolding

```
Tier 0 (Leaf)       <100 lines, no variants       → .tsx .test .stories .md
Tier 1 (Styled)     2+ variant maps or >100 lines  → + .variant.ts
Tier 2 (Composite)  3+ sub-components or >150 lines → + .type.ts
Tier 3 (Domain)     3+ hooks, policy logic          → + .hook.ts .policy.ts .const.ts
```

## Scripts

```bash
pnpm dev            # Start dev server
pnpm storybook      # Start Storybook (port 6007)
pnpm build          # TypeScript check + Vite build
pnpm test           # Run tests in watch mode
pnpm test:ci        # Run tests once (CI)
pnpm typecheck      # TypeScript check (tsc -b)
pnpm lint           # ESLint check
pnpm format         # Format with Prettier
pnpm generate:llms  # Regenerate llms.md + llms-full.md
```

---

## Roadmap

See **[ROADMAP.md](ROADMAP.md)** for the full roadmap, version policy, and v1.0 milestone criteria.

## Contributing

Contributions are welcome. Please read the component convention system before submitting:

```bash
# Check component structure compliance
# via Claude Code:
/convention audit

# Apply convention to a specific component
/convention Button
```

## License

[MIT](LICENSE)

---

<div align="center">

**Strata** — Design systems for the AI era.

[GitHub](https://github.com/siwon-dev-git/strata) · [Storybook](http://localhost:6007) · [llms.md](llms.md)

</div>

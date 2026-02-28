# Contributing to Strata

Thank you for your interest in contributing to Strata! This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js >= 22
- pnpm 10.6+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/siwon-dev-git/strata.git
cd strata

# Install dependencies
pnpm install

# Start Storybook (development server)
pnpm dev

# Run all checks
pnpm typecheck && pnpm test:ci && pnpm build
```

### Available Commands

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| `pnpm dev`          | Start Storybook dev server          |
| `pnpm build`        | Build production bundle             |
| `pnpm typecheck`    | TypeScript type checking (`tsc -b`) |
| `pnpm test:ci`      | Run all tests once                  |
| `pnpm lint`         | ESLint check                        |
| `pnpm format:check` | Prettier format check               |

## Project Structure

```
src/
├── components/
│   ├── primitives/    # Base components (Button, Input, Select, ...)
│   ├── layout/        # Layout components (Stack, Container, AppShell)
│   ├── disclosure/    # Interactive disclosure (Dialog, Tabs, Accordion, ...)
│   └── feedback/      # Feedback components (Alert, Toast, Skeleton, ...)
├── tokens/            # 3-layer design tokens (primitive → semantic → component)
├── demos/             # Reference implementations
├── icons/             # SVG icon components
└── __tests__/         # Test setup and utilities
```

## Component Architecture

### Component Tiers

Strata uses a tier-based file convention:

- **Tier 0**: Single-file component (e.g., `Badge.tsx`)
- **Tier 1**: Component + variants (e.g., `Button.tsx` + `Button.variant.ts`)
- **Tier 2**: Compound component with barrel (e.g., `Dialog/index.ts` re-exports parts)
- **Tier 3**: Compound + policy hooks (e.g., `FormField` with validation logic)

### Design Principles

1. **Radix UI headless + Tailwind styling** — All interactive components wrap Radix primitives
2. **Semantic tokens only** — Use `var(--xxx)`, never hardcoded colors
3. **`cn()` for class merging** — Import from `@/lib/utils`
4. **Accessible by default** — Every component must include proper ARIA attributes

## How to Contribute

### Reporting Bugs

Use the [Bug Report](https://github.com/siwon-dev-git/strata/issues/new?template=bug_report.yml) template. Include:

1. Steps to reproduce
2. Expected vs actual behavior
3. Browser/environment info

### Suggesting Features

Use the [Feature Request](https://github.com/siwon-dev-git/strata/issues/new?template=feature_request.yml) template. Describe:

1. The problem you're trying to solve
2. Your proposed solution
3. Alternatives you've considered

### Submitting Pull Requests

1. **Fork and branch** — Create a feature branch from `main`
2. **Follow conventions** — Match existing code patterns
3. **Add tests** — Both happy path AND failure scenarios (see [Testing Guide](#testing-guide))
4. **Run all checks** — `pnpm typecheck && pnpm test:ci && pnpm build`
5. **Keep PRs small** — Under 500 lines preferred, 1000 lines max

### Commit Convention

We use conventional commits:

```
type(scope): subject

# Examples:
feat(button): add loading spinner animation
fix(dialog): prevent focus trap escape on mobile
test(select): add disabled state interaction tests
docs(readme): update installation instructions
```

**Types**: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `style`, `perf`

## Testing Guide

### Test Structure

Every component test should cover:

```typescript
describe('Component', () => {
  // 1. Rendering — Does it render correctly?
  it('renders with expected role/content', () => { ... });

  // 2. Props — Do props work as expected?
  it('applies variant/size/className', () => { ... });

  // 3. Interaction — Happy path
  it('fires callback on user action', () => { ... });

  // 4. Action failure — Edge cases
  it('does not fire callback when disabled', () => { ... });
  it('prevents interaction when loading', () => { ... });

  // 5. Keyboard — Accessibility
  it('responds to keyboard navigation', () => { ... });

  // 6. ARIA — Screen reader support
  it('sets correct aria attributes in error state', () => { ... });
});
```

### Running Tests

```bash
pnpm test:ci          # Run all tests once
pnpm test             # Watch mode
```

### jsdom Limitations

Radix UI uses browser APIs that jsdom doesn't implement. Polyfills are in `src/__tests__/setup.ts`:

- `ResizeObserver` — Required by Slider, ScrollArea
- `scrollIntoView` — Required by Select
- `hasPointerCapture` / `setPointerCapture` — Required by Select

If you encounter similar issues, add polyfills to the setup file.

## Token System

### 3-Layer Architecture

```
Layer 1 (Primitive)  → Raw OKLch colors: --color-blue-500
Layer 2 (Semantic)   → Contextual meaning: --fg-default, --bg-surface
Layer 3 (Component)  → Component-specific: --btn-solid-bg, --dialog-border
```

When adding tokens:

- Never skip layers (don't reference Layer 1 from components)
- Reuse existing semantic tokens before creating new ones
- Document new tokens in the component's `.md` file

## AI Integration

Strata is built for AI-assisted development. Key resources:

- `llms.md` — AI-readable component index (~2K tokens)
- `llms-full.md` — Comprehensive component documentation
- Storybook MCP — Real-time component manifest at `http://localhost:6007/mcp`

After adding or removing components, regenerate the AI index:

```bash
pnpm generate:llms
```

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## Questions?

- Open a [Discussion](https://github.com/siwon-dev-git/strata/discussions)
- Check the [Heritage docs](.claude/heritage/) for design decisions (ADR) and failure patterns (FMEA)

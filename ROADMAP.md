# Strata Roadmap

## Version Policy

Strata follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) with pre-release conventions:

| Version Pattern | dist-tag | Meaning |
|-----------------|----------|---------|
| `0.x.y-alpha.z` | `next` | Active development. Breaking changes expected between minors |
| `0.x.y-beta.z` | `next` | Feature-complete for milestone. Breaking changes possible |
| `0.x.y-rc.z` | `next` | Release candidate. Only critical fixes |
| `1.0.0+` | `latest` | Stable. Semver strictly enforced |

**Current:** `0.1.0-alpha.0` — APIs may change between minor versions.

```bash
# Install latest stable (when available)
pnpm add @siwon-dev-npm/strata

# Install pre-release
pnpm add @siwon-dev-npm/strata@next
```

---

## v1.0 Milestone Criteria

All must be true before releasing `1.0.0`:

- [ ] L3 token violations: **0** (CI-enforced, currently passing)
- [ ] Test coverage gate: **>80%** statement coverage via `@vitest/coverage-v8`
- [ ] Visual regression CI: Playwright `toHaveScreenshot()` for dark + light mode
- [ ] A11y audit: automated axe-core scan in CI
- [ ] Documentation site: deployed beyond Storybook
- [ ] Component expansion: Table, DatePicker, Combobox, Command Palette
- [ ] Public API stability: no breaking changes for 2 consecutive minor releases
- [ ] Consumer validation: at least 1 external project using Strata in production

---

## Phase 1 — Foundation Hardening `(current)`

Establishing production-grade reliability and adoption readiness.

- [x] 57 components with full test coverage (52 test files)
- [x] 3-layer OKLch token system
- [x] 12 real-world demo applications
- [x] AI three-tier consumption (llms.md + llms-full.md + Storybook MCP)
- [x] Convention system with tier-based audit
- [x] Heritage registry (ADR + FMEA)
- [x] npm publish pipeline (`@siwon-dev-npm/strata` on npm)
- [ ] Documentation site (beyond Storybook)
- [ ] Component expansion: Table, DatePicker, Combobox, Command Palette
- [ ] CI/CD: coverage ratchet, visual regression, a11y audit automation

## Phase 2 — AI Ecosystem Play

Becoming the design system AI tools reach for first.

- [ ] **`@siwon-dev-npm/strata-mcp`** — Standalone MCP server package for IDE integration (Cursor, VS Code, Claude Code)
- [ ] **AI codegen presets** — Pre-built templates for v0, Bolt, Claude Artifacts
- [ ] **llms.txt standard contribution** — Driving adoption of the [llmstxt.org](https://llmstxt.org) specification
- [ ] **AI accuracy benchmark** — Measuring AI-generated UI correctness against Strata components
- [ ] **Framework adapters** — Vue, Svelte, and Solid adapters via headless core extraction

## Phase 3 — Commercial Layer

Open-source core with premium tooling.

- [ ] **Theme Studio** — Visual token editor with OKLch palette generation (SaaS)
- [ ] **Enterprise MCP** — Connect internal design systems to AI tools via MCP protocol
- [ ] **Pro Components** — DataGrid, Chart, Calendar, Rich Text Editor (paid package)
- [ ] **Audit Dashboard** — Team-level Convention + ADR + FMEA management (SaaS)
- [ ] **Design-to-Code** — Figma plugin that maps designs to Strata tokens and components

---

```
Roadmap Timeline

Phase 1 ████████████░░░░░░░░░░░░░░░░░░  Foundation
Phase 2 ░░░░░░░░░░░░████████████░░░░░░  AI Ecosystem
Phase 3 ░░░░░░░░░░░░░░░░░░░░░░████████  Commercial
         ──────────────────────────────→
         Now                       Future
```

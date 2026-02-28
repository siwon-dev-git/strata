# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `createTheme()` utility for programmatic theme generation
- `injectTheme()` for runtime theme injection
- `StrataServerProvider` for RSC/SSR environments
- Spring easing tokens for disclosure animations
- Color palette completion: Yellow, Purple, Orange expanded to 10 steps
- Test equalization: Sidebar, AspectRatio tests, 8 test suites deepened
- CHANGELOG.md following Keep a Changelog format
- SECURITY.md vulnerability disclosure policy

### Changed

- Disclosure animations (Sheet, Dialog, Accordion, Tooltip) now use spring easing

## [0.1.0-alpha.0] - 2026-02-27

### Added

- Initial alpha release
- 57 components across 4 categories (primitives, layout, disclosure, feedback)
- 3-layer OKLch design token system (primitive → semantic → component)
- Dark/light mode with `data-theme` attribute
- 3 theme presets (default, blue, green)
- 3 density modes (compact, comfortable, spacious)
- 13 reference demo applications
- AI integration: llms.md, llms-full.md, Storybook MCP
- "use client" RSC boundary directives
- CI: token layer lint, coverage ratchet, bundle gate (512KB)
- 61 SVG icon components

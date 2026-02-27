# Callout

## Role

Contextual highlight block with optional icon, title, and body content.

## Tier

0

## Tokens

- none (uses Tailwind color utilities directly: `blue-500`, `green-500`, `yellow-500`, `red-500` with opacity modifiers)

## Constraints

- Variants: `info` (default), `success`, `warning`, `danger`
- Icon slot is optional; renders with variant-colored text when present
- Uses full-border style (distinct from Alert's left-border accent)
- No ARIA role — presentational emphasis only, not a live region
- Colors are hardcoded Tailwind utilities; migrate to semantic tokens when available

## History

- Sprint 1: Initial implementation

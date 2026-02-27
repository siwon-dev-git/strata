# Heading

## Role

Semantic heading element (h1-h6) with level-based typography presets.

## Tier

1

## Tokens

- none (uses semantic utility classes: `text-fg-default`)

## Constraints

- `level` prop (1-6) controls both the rendered element and typography style
- `as` prop overrides the rendered element independently of `level`
- Default level is `2` (renders as `<h2>`)
- All headings use `tracking-tight` letter spacing

## Variants

| variant | purpose                                              |
| ------- | ---------------------------------------------------- |
| level 1 | `text-3xl font-bold` — page title                    |
| level 2 | `text-2xl font-semibold` — section heading (default) |
| level 3 | `text-xl font-semibold` — subsection heading         |
| level 4 | `text-lg font-medium` — group heading                |
| level 5 | `text-base font-medium` — minor heading              |
| level 6 | `text-sm font-medium` — smallest heading             |

## History

- Sprint 1: Initial implementation

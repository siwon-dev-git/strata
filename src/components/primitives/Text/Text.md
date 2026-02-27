# Text

## Role

Polymorphic typography component for rendering text with consistent size, weight, and color.

## Tier

1

## Tokens

- none (uses semantic Tailwind classes: `text-fg-default`, `text-fg-muted`, `text-fg-subtle`, `text-interactive`, `text-danger`, `text-success`, `bg-surface-inset`)

## Constraints

- Polymorphic `as` prop supports: `h1`, `h2`, `h3`, `h4`, `p`, `span`, `label`, `code`
- Default element is `<p>`
- Size auto-resolves from element type when not explicitly set (e.g. `h1` = `3xl`, `p` = `base`)
- `code` element adds monospace font and inset background automatically
- Color defaults to `default` (fg-default)

## Variants

| variant                                                              | purpose             |
| -------------------------------------------------------------------- | ------------------- |
| **size**: xs / sm / base / lg / xl / 2xl / 3xl                       | Font size scale     |
| **weight**: normal / medium / semibold / bold                        | Font weight         |
| **color**: default / muted / subtle / interactive / danger / success | Semantic text color |

## History

- Sprint 1: Initial implementation

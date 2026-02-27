# EmptyState

## Role

Centered placeholder for empty data views with icon, message, and call-to-action slot.

## Tier

0

## Tokens

- none (uses semantic Tailwind classes: `text-fg-muted`, `text-fg-default`)

## Constraints

- `title` is required; all other props are optional
- Icon container constrains child SVGs to 48x48 via `[&>svg]` selector
- Description max-width capped at `max-w-sm` for readability
- Action slot accepts arbitrary ReactNode (typically a Button)
- Always vertically/horizontally centered with `py-12`

## History

- Sprint 1: Initial implementation

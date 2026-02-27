# TopBar

## Role

Fixed-height horizontal header bar for application-level navigation and actions.

## Tier

0

## Tokens

- `--topbar-height` — fixed height of the bar
- `--topbar-border` — bottom border color
- `--topbar-bg` — background color

## Constraints

- Renders as `<header>` for semantic HTML
- Height is token-driven via `h-[--topbar-height]`; `shrink-0` prevents flex compression
- Children are flex-aligned horizontally with `gap-3` and `px-4` padding

## History

- Sprint 1: Initial implementation

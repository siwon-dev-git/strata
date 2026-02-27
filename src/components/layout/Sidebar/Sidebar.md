# Sidebar

## Role

Collapsible vertical navigation panel with grouped sections and interactive items.

## Tier

2

## Tokens

- `--sidebar-width` — default expanded width
- `--sidebar-width-collapsed` — collapsed width (fallback `0px`)
- `--sidebar-bg` — background color
- `--sidebar-border` — right border color
- `--sidebar-item-active-bg` — active item background
- `--sidebar-item-active-fg` — active item foreground
- `--sidebar-item-hover` — item hover background
- `--fg-muted` — muted foreground for inactive items and section titles
- `--fg-default` — default foreground on hover

## Constraints

- Width transitions via CSS `transition-[width]`; collapsed state hides overflow
- `width` prop accepts any CSS value; defaults to `var(--sidebar-width)`
- SidebarItem renders as `<button>` for accessibility; always keyboard-reachable
- Labels truncate via `truncate` class; badges auto-align to the right

## Composition

- `SidebarSection` — groups items under an uppercase label
- `SidebarItem` — individual navigation entry with icon, label, active state, and optional badge

## History

- Sprint 1: Initial implementation

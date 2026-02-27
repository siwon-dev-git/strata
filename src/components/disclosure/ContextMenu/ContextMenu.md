# ContextMenu

## Role

Right-click context menu with items, labels, and separators, using shared menu token system.

## Tier

2

## Tokens

- `--menu-radius` — content border radius
- `--menu-bg` — content background
- `--menu-border` — content border color
- `--menu-shadow` — content box shadow
- `--menu-item-fg` — item text color
- `--menu-item-hover` — item hover/focus background
- `--border-subtle` — separator color

## Constraints

- Renders via Portal; positioned at `z-50` with min-width `180px`
- Slide-in direction is context-aware based on `data-[side=*]`
- Items support optional `icon` (16px) and `shortcut` (right-aligned)
- Separator is a 1px horizontal rule using `--border-subtle`

## Composition

- `ContextMenuRoot` — Radix Root pass-through
- `ContextMenuTrigger` — Radix Trigger pass-through; wraps the right-click target
- `ContextMenuContent` — portal + animated menu panel
- `ContextMenuItem` — interactive row with icon and shortcut support

## History

- Sprint 1: Initial implementation

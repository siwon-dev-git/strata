# DropdownMenu

## Role

Click-triggered dropdown menu with items, labels, and separators, using shared menu token system.

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

- Renders via Portal with `sideOffset={4}`; positioned at `z-50` with min-width `180px`
- Slide-in direction is context-aware based on `data-[side=*]`
- Items support optional `icon` (16px) and `shortcut` (right-aligned)
- Shares identical token contract with ContextMenu and Menubar

## Composition

- `DropdownMenuRoot` — Radix Root pass-through
- `DropdownMenuTrigger` — Radix Trigger pass-through
- `DropdownMenuContent` — portal + animated menu panel
- `DropdownMenuItem` — interactive row with icon and shortcut support

## History

- Sprint 1: Initial implementation

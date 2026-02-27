# Menubar

## Role

Horizontal menu bar with multiple dropdown menus, suitable for application-level menus.

## Tier

2

## Tokens

- `--menu-radius` — content and root border radius
- `--menu-bg` — root and dropdown background
- `--menu-border` — root and dropdown border color
- `--menu-shadow` — dropdown box shadow
- `--menu-item-fg` — trigger and item text color
- `--menu-item-hover` — trigger and item hover/focus background
- `--border-subtle` — separator color

## Constraints

- Root renders as a bordered horizontal bar with `gap-1` and `p-1`
- Content renders via Portal with `sideOffset={4}` and `align="start"`
- Items support optional `icon` (16px) and `shortcut` (right-aligned)
- Shares identical item/separator/label token contract with DropdownMenu and ContextMenu

## Composition

- `MenubarRoot` — styled horizontal container wrapping all menus
- `MenubarMenu` — Radix Menu pass-through; groups trigger + content
- `MenubarTrigger` — clickable top-level menu label
- `MenubarContent` — portal + animated dropdown panel
- `MenubarItem` — interactive row with icon and shortcut support
- `MenubarSeparator` — horizontal divider within a dropdown

## History

- Sprint 1: Initial implementation

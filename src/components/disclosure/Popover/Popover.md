# Popover

## Role

Click-triggered floating panel for forms, filters, or supplementary content.

## Tier

0

## Tokens

- `--menu-radius` — content border radius
- `--menu-bg` — content background
- `--menu-border` — content border color
- `--menu-shadow` — content box shadow
- `--border-interactive` — close button focus ring color

## Constraints

- Renders via Portal with `sideOffset={4}`; fixed width `w-72`, padding `p-4`
- Uses shared `--menu-*` tokens for visual consistency with other floating surfaces
- Slide-in direction is context-aware based on `data-[side=*]`
- PopoverClose positions at `absolute right-2 top-2`; includes a default X icon SVG
- Root and Trigger are direct Radix pass-throughs

## History

- Sprint 1: Initial implementation

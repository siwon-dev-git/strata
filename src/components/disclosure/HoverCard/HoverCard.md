# HoverCard

## Role

Hover-triggered floating card for previewing content without clicking.

## Tier

0

## Tokens

- `--menu-radius` — content border radius
- `--menu-bg` — content background
- `--menu-border` — content border color
- `--menu-shadow` — content box shadow

## Constraints

- Renders via Portal with `sideOffset={4}`; min-width `220px`, padding `p-4`
- Uses shared `--menu-*` tokens for visual consistency with other floating surfaces
- Slide-in direction is context-aware based on `data-[side=*]`
- Root and Trigger are direct Radix pass-throughs; no custom styling

## History

- Sprint 1: Initial implementation

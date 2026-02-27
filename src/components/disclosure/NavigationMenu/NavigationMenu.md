# NavigationMenu

## Role

Site-level navigation with trigger-activated content panels and link items.

## Tier

2

## Tokens

- `--menu-radius` — content and viewport border radius
- `--menu-bg` — content and viewport background
- `--menu-border` — content and viewport border color
- `--menu-shadow` — content and viewport box shadow
- `--menu-item-fg` — link text color
- `--menu-item-hover` — trigger and link hover background

## Constraints

- Root positions as `relative z-10` flex container
- Content is absolutely positioned (`top-full left-0 w-max`); animates with fade + slide-from-top
- Trigger includes an inline chevron SVG that rotates on `data-[state=open]`
- Viewport is an optional floating container for aggregated content display
- List renders as `list-none` flex row with `gap-1`

## Composition

- `NavigationMenuRoot` — styled flex container
- `NavigationMenuList` — horizontal list of navigation items
- `NavigationMenuItem` — Radix Item pass-through
- `NavigationMenuTrigger` — clickable label with chevron indicator
- `NavigationMenuContent` — absolutely positioned dropdown panel
- `NavigationMenuLink` — styled anchor for direct navigation

## History

- Sprint 1: Initial implementation

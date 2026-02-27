# Toolbar

## Role

Compound horizontal toolbar for grouping actions and toggles.

## Tier

2

## Tokens

- `--menu-border`
- `--menu-bg`
- `--menu-item-fg`
- `--menu-item-hover`
- `--toggle-active-bg`
- `--toggle-active-fg`
- `--border-subtle`
- `--border-interactive`

## Constraints

- Built on `@radix-ui/react-toolbar`
- Root has border, background, and padding (`p-1`)
- Shares `--menu-*` tokens with menu components for visual consistency
- Toggle items reuse `--toggle-*` tokens for on-state styling
- All interactive items support `disabled` state with `opacity-40`

## Composition

- `ToolbarRoot` → Container with border and background
- `ToolbarButton` → Standard action button
- `ToolbarSeparator` → 1px vertical divider between groups
- `ToolbarToggleGroup` → Group of mutually exclusive toggle items
- `ToolbarToggleItem` → Individual toggle option with on/off state
- `ToolbarLink` → Navigation link styled as toolbar item

## History

- Sprint 1: Initial implementation

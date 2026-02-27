# ToggleGroup

## Role

Compound toggle button group for selecting one or multiple options.

## Tier

2

## Tokens

- `--toggle-bg`
- `--toggle-active-bg`
- `--toggle-active-fg`
- `--toggle-border`
- `--toggle-radius`
- `--border-interactive`

## Constraints

- Built on `@radix-ui/react-toggle` (single) and `@radix-ui/react-toggle-group` (group)
- `Toggle` is the standalone single-toggle component
- `ToggleGroupRoot` supports both `single` and `multiple` selection modes
- All items share the same `variant` and `size` API
- Supports `disabled` state with `opacity-40`

## Variants

| variant | purpose                               |
| ------- | ------------------------------------- |
| default | Background-only toggle without border |
| outline | Toggle with visible border            |

## Composition

- `Toggle` → Standalone single toggle button
- `ToggleGroupRoot` → Radix group root with flex row layout
- `ToggleGroupItem` → Individual toggle item within the group

## History

- Sprint 1: Initial implementation

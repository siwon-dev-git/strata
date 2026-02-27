# Select

## Role

Compound dropdown select for choosing a single value from a list.

## Tier

2

## Tokens

- `--select-radius`
- `--select-border`
- `--select-bg`
- `--select-fg`
- `--select-placeholder`
- `--select-border-focus`
- `--select-content-bg`
- `--select-item-hover`

## Constraints

- Built on `@radix-ui/react-select`
- Content renders through a Portal
- Default position is `popper`
- Content has enter/exit fade animations
- Trigger height is h-9 with chevron icon
- Item indicator uses inline SVG checkmark
- Supports `disabled` state with `opacity-40`

## Composition

- `SelectRoot` → Radix root (re-export)
- `SelectValue` → Selected value display (re-export)
- `SelectGroup` → Option grouping (re-export)
- `SelectTrigger` → Button that opens the dropdown
- `SelectContent` → Portal-based dropdown panel
- `SelectItem` → Individual option with checkmark indicator
- `SelectLabel` → Group label inside dropdown
- `SelectSeparator` → Horizontal divider between groups

## History

- Sprint 1: Initial implementation

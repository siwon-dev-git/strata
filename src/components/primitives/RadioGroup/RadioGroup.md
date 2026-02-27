# RadioGroup

## Role

Compound radio button group for single-option selection.

## Tier

0

## Tokens

- `--checkbox-border`
- `--checkbox-border-checked`
- `--checkbox-bg-checked`
- `--border-interactive`

## Constraints

- Built on `@radix-ui/react-radio-group`
- Shares `--checkbox-*` token group with Checkbox for visual consistency
- Root lays out items in a vertical flex column with `gap-2`
- Items are 16x16px circles; checked indicator is 8x8px filled dot
- Supports `disabled` state with `opacity-40` and `pointer-events-none`

## History

- Sprint 1: Initial implementation

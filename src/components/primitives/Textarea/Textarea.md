# Textarea

## Role

Multi-line text input field with size and error variants.

## Tier

0

## Tokens

- `--input-radius`
- `--input-bg`
- `--input-fg`
- `--input-border`
- `--input-placeholder`
- `--input-ring`
- `--input-border-focus`
- `--input-border-error`

## Constraints

- Shares `--input-*` token group with Input for visual consistency
- Size prop: `sm` (xs text), `md` (sm text), `lg` (base text)
- `error` prop adds error border and sets `aria-invalid`
- Minimum height is 80px
- Vertically resizable (`resize-y`)
- Supports `disabled` state with `opacity-40`

## History

- Sprint 1: Initial implementation

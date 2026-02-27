# Input

## Role

Text input field with size variants, error state, and optional prefix/suffix adornments via InputGroup.

## Tier

0

## Tokens

- `--input-radius` — border radius
- `--input-bg` — background color
- `--input-fg` — text color
- `--input-border` — default border color
- `--input-placeholder` — placeholder text color
- `--input-ring` — focus ring color
- `--input-border-focus` — focus border color
- `--input-border-error` — error state border color

## Constraints

- `error` prop sets `aria-invalid` and applies error border styling
- Size controlled via `SIZE_MAP` (sm | md | lg), default `md`
- Disabled state reduces opacity to 40% and blocks pointer events
- `InputGroup` is a sibling component for prefix/suffix adornments, not a variant
- Prefix/suffix elements are `pointer-events-none` and positioned absolutely

## History

- Sprint 1: Initial implementation

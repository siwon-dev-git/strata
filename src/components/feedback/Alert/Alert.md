# Alert

## Role

Inline status message with variant-driven severity and optional dismiss action.

## Tier

0

## Tokens

- `--alert-radius` — border radius of the alert container
- `--border-interactive` — border color for `info` variant
- `--color-success` / `--color-success-subtle` — border/bg for `success` variant
- `--color-warning` / `--color-warning-subtle` — border/bg for `warning` variant
- `--color-danger` / `--color-danger-subtle` — border/bg for `danger` variant
- `--color-interactive-subtle` — bg for `info` variant

## Constraints

- Must render `role="alert"` on the root element
- Variants: `info` (default), `success`, `warning`, `danger`
- Dismiss button only renders when `onDismiss` is provided
- Uses `border-l-4` accent pattern — do not change to full border
- Forward ref via React 19 prop destructuring

## History

- Sprint 1: Initial implementation

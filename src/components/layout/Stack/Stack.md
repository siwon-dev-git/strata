# Stack

## Role

Flexbox layout primitive for arranging children in a row or column with controlled spacing and alignment.

## Tier

0

## Tokens

- none

## Constraints

- `direction`: `row` | `col` (default `col`)
- `gap`: `0` | `1` | `2` | `3` | `4` (default) | `5` | `6` | `8` — maps to Tailwind gap utilities
- `align`: `start` | `center` | `end` | `stretch` (default) | `baseline`
- `justify`: `start` (default) | `center` | `end` | `between`
- Extends `ComponentPropsWithoutRef<'div'>` — all native div props forwarded
- `wrap` prop enables `flex-wrap`

## History

- Sprint 1: Initial implementation

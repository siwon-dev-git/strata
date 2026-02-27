# ProgressBar

## Role

Displays a horizontal bar indicating progress toward completion.

## Tier

0

## Tokens

- `--progress-track`
- `--progress-bar`

## Constraints

- Built on `@radix-ui/react-progress`
- Value is clamped to 0-100% internally
- Indicator uses `translateX` transform for smooth animation (300ms)
- `size` prop controls track height (`sm` = h-1.5, `md` = h-2)

## History

- Sprint 1: Initial implementation

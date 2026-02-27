# Skeleton

## Role

Animated loading placeholder with shape variants for content shimmer effects.

## Tier

0

## Tokens

- `--skeleton-bg` — background color of the skeleton element

## Constraints

- Variants: `text` (default, full-width h-4), `circle` (round), `rect` (rounded-md)
- Uses `animate-pulse` for shimmer animation
- Renders `aria-hidden="true"` — must never contain accessible content
- `width` and `height` applied via inline `style` for dynamic sizing

## History

- Sprint 1: Initial implementation

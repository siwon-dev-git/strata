# Divider

## Role

Visual separator line between content sections, horizontal or vertical.

## Tier

0

## Tokens

- none (uses `bg-border-subtle` utility class)

## Constraints

- Sets `role="separator"` and `aria-orientation` for accessibility
- Horizontal: `h-px w-full`; Vertical: `w-px self-stretch`
- Default orientation is `horizontal`
- No Radix dependency; pure HTML `<div>`

## History

- Sprint 1: Initial implementation

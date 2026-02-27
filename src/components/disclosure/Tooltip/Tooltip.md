# Tooltip

## Role

Hover-triggered informational label that appears near the target element.

## Tier

2

## Tokens

- `--tooltip-radius` — content border radius
- `--tooltip-bg` — content background
- `--tooltip-fg` — content text color

## Constraints

- TooltipProvider wraps all tooltips with `delayDuration={200}`; must be placed at app root
- Content renders with `sideOffset={6}` and `z-50`
- Transitions: fade + zoom (95% scale) on delayed-open/closed
- SimpleTooltip is a convenience wrapper combining Root + Trigger + Content for string-only tooltips
- `side` prop on SimpleTooltip controls placement: `top` | `bottom` | `left` | `right`

## Composition

- `TooltipProvider` — global provider with delay configuration
- `TooltipRoot` — Radix Root pass-through
- `TooltipTrigger` — Radix Trigger pass-through

## History

- Sprint 1: Initial implementation

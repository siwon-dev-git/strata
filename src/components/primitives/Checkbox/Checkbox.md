# Checkbox

## Role

Binary toggle input built on Radix Checkbox with custom styling and check indicator.

## Tier

0

## Tokens

- `--checkbox-radius` — border radius
- `--checkbox-border` — unchecked border color
- `--checkbox-bg` — unchecked background color
- `--checkbox-bg-checked` — checked background color
- `--checkbox-border-checked` — checked border color
- `--checkbox-fg` — checkmark icon color
- `--border-interactive` — focus ring color

## Constraints

- Wraps `@radix-ui/react-checkbox`; `asChild` prop is omitted from the interface
- Disabled state reduces opacity to 40% and blocks pointer events
- Check indicator is an inline SVG polyline, not an icon component
- Focus ring uses `focus-visible` for keyboard-only indication

## History

- Sprint 1: Initial implementation

# Sheet

## Role

Slide-out panel (drawer) anchored to any viewport edge, built on Radix Dialog.

## Tier

2

## Tokens

- `--overlay-bg` — overlay backdrop color
- `--dialog-bg` — panel background
- `--dialog-border` — panel border color
- `--dialog-shadow` — panel box shadow
- `--input-ring` — close button focus ring color
- `--border-subtle` — header/footer separator borders

## Constraints

- `side` prop controls anchor edge: `left` | `right` (default) | `top` | `bottom`
- Horizontal sides constrain to `max-w-sm`; vertical sides to `max-h-[50vh]`
- Built-in close button (IconX) at `absolute right-4 top-4`; always present
- Open/close transitions: fade + directional slide matching the chosen side
- Header and Footer have border separators; Body is unstyled flex-1

## Composition

- `SheetRoot` — Radix Dialog Root pass-through
- `SheetTrigger` — Radix Dialog Trigger pass-through
- `SheetClose` — Radix Dialog Close pass-through
- `SheetContent` — portal + overlay + side-anchored panel with close button
- `SheetHeader` — top section with bottom border
- `SheetBody` — flexible middle section

## History

- Sprint 1: Initial implementation

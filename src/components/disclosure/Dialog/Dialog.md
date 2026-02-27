# Dialog

## Role

General-purpose modal dialog with structured header, body, and footer sections.

## Tier

2

## Tokens

- `--overlay-bg` — overlay backdrop color
- `--dialog-radius` — content border radius
- `--dialog-bg` — content background
- `--dialog-border` — content border color
- `--dialog-shadow` — content box shadow
- `--border-subtle` — header/footer separator borders

## Constraints

- Always renders via Portal; overlay covers entire viewport at `z-50`
- Content is centered with `max-w-lg` and `p-0`; sections handle their own padding
- Open/close transitions: fade + zoom (95% scale)
- Close is a Radix pass-through; consumer places close buttons manually
- Header and Footer have border separators; Body has no borders

## Composition

- `DialogRoot` — Radix Root pass-through; controls open state
- `DialogTrigger` — Radix Trigger pass-through
- `DialogClose` — Radix Close pass-through
- `DialogContent` — portal + overlay + centered content panel
- `DialogHeader` — top section with bottom border
- `DialogBody` — scrollable middle section

## History

- Sprint 1: Initial implementation

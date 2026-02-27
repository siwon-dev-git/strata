# Toast

## Role

Transient notification system built on Radix Toast primitive with timed auto-dismiss.

## Tier

2

## Tokens

- `--toast-bg` — background color of the toast surface
- `--toast-border` — border color
- `--toast-radius` — border radius
- `--toast-shadow` — box shadow elevation

## Constraints

- Must wrap in `ToastProvider` at app root for context
- `ToastViewport` fixed to bottom-right (`bottom-4 right-4 z-50`)
- Uses Radix `data-[state=open|closed]` for opacity transitions
- Close button positioned absolute (`right-2 top-2`)
- Namespace export pattern: `Toast.Provider`, `Toast.Root`, etc. via barrel `index.ts`
- All 7 sub-components also available as named exports

## Composition

- `ToastProvider` → Radix context provider pass-through
- `ToastViewport` → Fixed-position container for toast stack
- `ToastRoot` → Individual toast surface with token-driven styling
- `ToastTitle` → Semibold heading text
- `ToastDescription` → Muted body text
- `ToastAction` → Inline action button with border style
- `ToastClose` → Absolute-positioned dismiss button with X icon

## History

- Sprint 1: Initial implementation

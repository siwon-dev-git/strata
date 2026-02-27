# AlertDialog

## Role

Modal confirmation dialog for destructive or irreversible actions, with required user acknowledgment.

## Tier

2

## Tokens

- `--overlay-bg` — overlay backdrop color
- `--dialog-radius` — content border radius
- `--dialog-bg` — content background
- `--dialog-border` — content border color
- `--dialog-shadow` — content box shadow
- `--btn-radius` — action/cancel button border radius
- `--btn-danger-bg` — destructive action background
- `--btn-danger-fg` — destructive action foreground
- `--btn-danger-bg-hover` — destructive action hover background
- `--btn-outline-border` — cancel button border
- `--btn-ghost-bg-hover` — cancel button hover background
- `--border-interactive` — focus ring color

## Constraints

- Always renders via Portal; overlay covers entire viewport at `z-50`
- Content is centered (`left-1/2 top-1/2 -translate`) with `max-w-md`
- Action button uses danger styling by default; Cancel uses ghost/outline styling
- Open/close transitions: fade + zoom (95% scale)

## Composition

- `AlertDialogRoot` — Radix Root pass-through; controls open state
- `AlertDialogTrigger` — Radix Trigger pass-through
- `AlertDialogContent` — portal + overlay + centered content panel
- `AlertDialogTitle` — semibold heading
- `AlertDialogDescription` — muted description text

## History

- Sprint 1: Initial implementation

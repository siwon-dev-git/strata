# StatusDot

## Role

Small colored circle indicating presence or availability status.

## Tier

1

## Tokens

- none (uses hardcoded Tailwind color utilities per status)

## Constraints

- Has `role="status"` and `aria-label` set to the status name
- Status colors are hardcoded: green-500, yellow-500, red-500, gray-500
- Size prop: `sm` (8px), `md` (10px), `lg` (12px)
- `status` prop is required

## Variants

| variant | purpose                    |
| ------- | -------------------------- |
| online  | Green dot — user is active |
| idle    | Yellow dot — user is away  |
| dnd     | Red dot — do not disturb   |
| offline | Gray dot — user is offline |

## History

- Sprint 1: Initial implementation

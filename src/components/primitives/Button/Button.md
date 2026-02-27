# Button

## Role

Primary interactive element for triggering actions, with variant styling and loading state.

## Tier

1

## Tokens

- `--btn-radius` — border radius
- `--btn-solid-bg` — solid variant background
- `--btn-solid-fg` — solid variant foreground
- `--btn-solid-bg-hover` — solid variant hover background
- `--btn-ghost-fg` — ghost variant foreground
- `--btn-ghost-bg-hover` — ghost variant hover background
- `--btn-outline-border` — outline variant border color
- `--btn-outline-hover` — outline variant hover background
- `--btn-danger-bg` — danger variant background
- `--btn-danger-fg` — danger variant foreground
- `--btn-danger-bg-hover` — danger variant hover background
- `--border-interactive` — focus ring color

## Constraints

- `loading` prop disables the button and shows a `Spinner` before children
- `asChild` delegates rendering to `@radix-ui/react-slot` for polymorphism
- `disabled || loading` disables pointer events and reduces opacity to 40%
- `aria-busy` set when loading
- Focus ring uses `focus-visible` for keyboard-only indication

## Variants

| variant | purpose                                     |
| ------- | ------------------------------------------- |
| solid   | Primary filled button (default)             |
| ghost   | Transparent background, text-only style     |
| outline | Bordered transparent button                 |
| danger  | Destructive action with danger color scheme |

## History

- Sprint 1: Initial implementation

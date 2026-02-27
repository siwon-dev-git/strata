# Card

## Role

Container component for grouping related content with optional header and footer sections.

## Tier

2

## Tokens

- `--card-bg` — card background color
- `--card-border` — card border color
- `--card-radius` — card border radius
- `--card-bg-hover` — interactive variant hover background
- `--card-border-hover` — interactive variant hover border

## Constraints

- Root `Card` accepts a `variant` prop (default | interactive)
- Interactive variant adds hover states and `cursor-pointer`
- Sub-components handle internal spacing; do not add padding to root `Card`
- All sub-components accept `ref` via `ComponentPropsWithRef`

## Variants

| variant     | purpose                                     |
| ----------- | ------------------------------------------- |
| default     | Static content container with border        |
| interactive | Clickable card with hover state transitions |

## Composition

- `Card` -> root container with border and background
- `CardHeader` -> top section with `px-4 pt-4 pb-0` padding
- `CardBody` -> main content area with `p-4` padding
- `CardFooter` -> bottom section with `px-4 pb-4 pt-0` padding

## History

- Sprint 1: Initial implementation

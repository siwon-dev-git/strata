# Button

## Role

Primary interactive element for triggering actions, with variant styling, loading state, and icon-only support.

## Tier

1

## Tokens

- `--btn-radius` — border radius
- `--btn-solid-bg` — solid variant background
- `--btn-solid-fg` — solid variant foreground
- `--btn-solid-bg-hover` — solid variant hover background
- `--btn-solid-bg-active` — solid variant active/pressed background
- `--btn-ghost-fg` — ghost variant foreground
- `--btn-ghost-bg-hover` — ghost variant hover background
- `--btn-ghost-bg-active` — ghost variant active/pressed background
- `--btn-outline-border` — outline variant border color
- `--btn-outline-hover` — outline variant hover background
- `--btn-outline-bg-active` — outline variant active/pressed background
- `--btn-danger-bg` — danger variant background
- `--btn-danger-fg` — danger variant foreground
- `--btn-danger-bg-hover` — danger variant hover background
- `--btn-danger-bg-active` — danger variant active/pressed background
- `--btn-focus-ring-width` — focus ring width (aligned with Input/Select)
- `--btn-focus-ring-color` — focus ring color
- `--btn-focus-ring-offset` — focus ring offset from edge
- `--btn-disabled-opacity` — opacity for disabled state
- `--btn-touch-target` — minimum touch target size (WCAG 2.5.8)
- `--border-interactive` — (L2) focus ring color source

## Constraints

- `loading` prop disables the button and shows a `Spinner` before children
- `asChild` delegates rendering to `@radix-ui/react-slot` for polymorphism
- `disabled || loading` disables pointer events and reduces opacity via `--btn-disabled-opacity`
- `aria-busy` set when loading
- Focus ring uses `focus-visible` with ring-offset, aligned with Input/Select/Textarea pattern
- Icon-only (`size="icon"`) requires `aria-label` or `aria-labelledby` (dev warning)
- All sizes meet 44px minimum touch target via invisible pseudo-element expansion
- `type="button"` default prevents accidental form submission
- Active/pressed state uses `--motion-duration-fast` for immediate feedback

## Variants

| variant | purpose                                     |
| ------- | ------------------------------------------- |
| solid   | Primary filled button (default)             |
| ghost   | Transparent background, text-only style     |
| outline | Bordered transparent button                 |
| danger  | Destructive action with danger color scheme |

## Sizes

| size | height               | use case                          |
| ---- | -------------------- | --------------------------------- |
| sm   | 28px                 | Compact contexts, inline actions  |
| md   | density-aware        | Default, adapts to density mode   |
| lg   | 44px                 | Primary CTAs, mobile-friendly     |
| icon | density-aware square | Icon-only buttons, toolbars       |

## History

- Sprint 1: Initial implementation
- MAINTAIN 10-cycle: Token foundation (active/focus/disabled), focus ring alignment, active states, keyboard tests, variant override tests, touch targets, icon-only support, ARIA tests, type="button" default, density stories, documentation

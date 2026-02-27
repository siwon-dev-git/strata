# Badge

## Role

Renders a small inline label for status, category, or count.

## Tier

1

## Tokens

- `--badge-radius` — border radius of the badge
- `--color-success-subtle` — background for success variant
- `--color-warning-subtle` — background for warning variant
- `--color-danger-subtle` — background for danger variant
- `--color-interactive-subtle` — background for interactive variant

## Constraints

- No interactive states; purely visual indicator
- Size controlled via `SIZE_MAP` (sm | md), default `md`
- Variant controlled via `VARIANT_MAP`, default `default`

## Variants

| variant     | purpose                                                   |
| ----------- | --------------------------------------------------------- |
| default     | Neutral badge on `surface-overlay` background             |
| success     | Positive status on success-subtle background              |
| warning     | Cautionary status on warning-subtle background            |
| danger      | Error/destructive status on danger-subtle background      |
| interactive | Actionable/informational on interactive-subtle background |

## History

- Sprint 1: Initial implementation

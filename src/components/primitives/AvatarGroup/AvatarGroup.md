# AvatarGroup

## Role

Stacks multiple Avatar components with overlap and an optional overflow counter.

## Tier

0

## Tokens

- `--avatar-bg` — background of the overflow counter bubble
- `--avatar-fg` — text color of the overflow counter
- `--surface-default` — ring color around each avatar

## Constraints

- `max` prop controls visible count; excess renders as `+N` overflow bubble
- Children rendered with `Children.toArray`; each wrapped in a ring for separation
- Overflow bubble matches `SIZE_MAP` (sm | md | lg) of the group
- Negative spacing via `-space-x-2` for avatar stacking

## History

- Sprint 1: Initial implementation

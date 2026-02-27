# Avatar

## Role

Displays a user image or initials fallback in a circular badge.

## Tier

0

## Tokens

- `--avatar-radius` — border radius of the avatar container
- `--avatar-bg` — background color of the initials fallback
- `--avatar-fg` — text color of the initials fallback

## Constraints

- Falls back to initials derived from `name` when `src` is absent or fails
- `alt` is required for accessibility regardless of display mode
- Size controlled via `SIZE_MAP` (sm | md | lg), default `md`
- Initials logic: first letter of first word + first letter of last word, uppercased

## History

- Sprint 1: Initial implementation

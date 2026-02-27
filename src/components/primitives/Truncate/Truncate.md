# Truncate

## Role

Clamps text overflow to a specified number of lines with ellipsis.

## Tier

0

## Tokens

- none

## Constraints

- Single line uses CSS `truncate` (text-overflow: ellipsis)
- Multi-line uses `-webkit-line-clamp` with `-webkit-box` display
- `maxLines` defaults to 1
- Renders as `<span>` with `display: block`

## History

- Sprint 1: Initial implementation

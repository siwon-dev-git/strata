# AppShell

## Role

Full-viewport flex container that frames the entire application layout.

## Tier

0

## Tokens

- none

## Constraints

- Must be the outermost layout wrapper; fills entire screen (`h-screen w-screen`)
- Overflow is hidden at this level; children manage their own scrolling
- Accepts `className` for extension but core dimensions must not be overridden

## History

- Sprint 1: Initial implementation

# DataList

## Role

Displays key-value pairs in a structured two-column definition list layout.

## Tier

2

## Tokens

- none (uses semantic utility classes: `text-fg-muted`, `text-fg-default`)

## Constraints

- Root renders as `<dl>` with grid layout and `gap-3`
- Items use a fixed `140px` label column via `grid-cols-[140px_1fr]`
- All sub-components accept `ref` via `ComponentPropsWithRef`
- Label uses `<dt>`, value uses `<dd>` for proper HTML semantics

## Composition

- `DataListRoot` -> `<dl>` grid container
- `DataListItem` -> row wrapper with two-column grid
- `DataListLabel` -> `<dt>` term in muted text with font-medium
- `DataListValue` -> `<dd>` definition in default text color

## History

- Sprint 1: Initial implementation

# Table

## Role

Compound HTML table with consistent styling for data display.

## Tier

2

## Tokens

- none (uses semantic Tailwind classes: `border-border-subtle`, `bg-surface-raised`, `text-fg-muted`)

## Constraints

- Pure HTML table elements — no Radix dependency
- Rows have hover state (`hover:bg-surface-raised`)
- Last row in `TableBody` has no bottom border
- `TableFooter` has top border and raised background
- `TableHead` cells are left-aligned with muted text
- `caption-bottom` on root table element

## Composition

- `Table` → `<table>` root with full width
- `TableHeader` → `<thead>` with bottom border
- `TableBody` → `<tbody>` with last-row border removal
- `TableFooter` → `<tfoot>` with raised background
- `TableRow` → `<tr>` with hover and bottom border
- `TableHead` → `<th>` header cell with muted styling
- `TableCell` → `<td>` data cell
- `TableCaption` → `<caption>` with muted text

## History

- Sprint 1: Initial implementation

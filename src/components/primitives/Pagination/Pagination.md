# Pagination

## Role

Compound navigation component for paging through content.

## Tier

2

## Tokens

- `--btn-radius`
- `--btn-solid-bg`
- `--btn-solid-fg`
- `--btn-ghost-bg-hover`
- `--border-interactive`

## Constraints

- `PaginationRoot` renders a `<nav>` with `aria-label="pagination"`
- `PaginationLink` sets `aria-current="page"` when `isActive` is true
- `PaginationPrevious` / `PaginationNext` include `aria-label` for screen readers
- `PaginationEllipsis` is `aria-hidden`
- All interactive elements support `disabled` state with `opacity-40`

## Composition

- `PaginationRoot` → `<nav>` wrapper with flex centering
- `PaginationContent` → `<ul>` list container for page items
- `PaginationItem` → `<li>` wrapper for individual controls
- `PaginationLink` → Page number button with active/inactive states
- `PaginationPrevious` → Previous page button with arrow
- `PaginationNext` → Next page button with arrow
- `PaginationEllipsis` → Decorative overflow indicator

## History

- Sprint 1: Initial implementation

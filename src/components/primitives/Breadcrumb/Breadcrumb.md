# Breadcrumb

## Role

Renders a navigational breadcrumb trail with links, separators, and a current page indicator.

## Tier

2

## Tokens

- none (uses semantic utility classes: `text-fg-muted`, `text-fg-default`, `text-fg-subtle`)

## Constraints

- Root `<nav>` sets `aria-label="breadcrumb"` automatically
- `BreadcrumbSeparator` is `aria-hidden` and `role="presentation"`
- `BreadcrumbPage` sets `aria-current="page"` and `aria-disabled="true"`
- All sub-components accept `ref` via `ComponentPropsWithRef`
- Default separator is a forward-slash SVG; overridable via `children`

## Composition

- `Breadcrumb` -> nav wrapper with `aria-label="breadcrumb"`
- `BreadcrumbList` -> ordered list container (`<ol>`)
- `BreadcrumbItem` -> list item wrapper (`<li>`)
- `BreadcrumbLink` -> anchor element for navigable crumbs
- `BreadcrumbSeparator` -> decorative divider between items
- `BreadcrumbPage` -> current page indicator (non-interactive)

## History

- Sprint 1: Initial implementation

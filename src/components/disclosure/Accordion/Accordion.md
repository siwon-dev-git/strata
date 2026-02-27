# Accordion

## Role

Vertically stacked collapsible sections powered by Radix Accordion primitive.

## Tier

2

## Tokens

- none (uses semantic classes: `border-border-subtle`, `text-fg-default`)

## Constraints

- Root is a direct pass-through of `AccordionPrimitive.Root`; supports `single` and `multiple` modes
- Chevron icon rotates 180deg on open via `data-[state=open]:rotate-180`
- Content animates with `accordion-down` / `accordion-up` keyframes (200ms)
- Each item separated by `border-b border-border-subtle`

## Composition

- `AccordionRoot` — Radix Root pass-through; controls single/multiple expand behavior
- `AccordionItem` — bordered container for one collapsible section
- `AccordionTrigger` — clickable header with chevron indicator

## History

- Sprint 1: Initial implementation

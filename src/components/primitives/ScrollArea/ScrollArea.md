# ScrollArea

## Role

Compound scrollable container with custom-styled scrollbars.

## Tier

2

## Tokens

- `--scrollarea-track`
- `--scrollarea-thumb`
- `--scrollarea-thumb-hover`

## Constraints

- Built on `@radix-ui/react-scroll-area`
- Supports `vertical`, `horizontal`, and `both` orientation modes
- Convenience `ScrollArea` component composes all sub-components automatically
- Scrollbar width/height is 8px (w-2 / h-2)
- Thumb has rounded-full shape and hover state

## Composition

- `ScrollAreaRoot` → Radix root with overflow hidden
- `ScrollAreaViewport` → Full-size scrollable content area
- `ScrollAreaScrollbar` → Track container (vertical or horizontal)
- `ScrollAreaThumb` → Draggable scroll indicator
- `ScrollArea` → Convenience wrapper composing all sub-components

## History

- Sprint 1: Initial implementation

# Tabs

## Role

Tabbed interface for switching between content panels within the same context.

## Tier

2

## Tokens

- `--tabs-border` — tab list bottom border color
- `--tabs-trigger-fg` — inactive trigger text color
- `--tabs-active-fg` — active trigger text color
- `--tabs-hover-bg` — trigger hover background
- `--tabs-active-border` — active indicator underline color
- `--border-interactive` — focus ring color

## Constraints

- Root is a direct Radix pass-through; controls value/defaultValue
- Active indicator is a 2px bottom pseudo-element (`after:`) on the trigger
- Tab list has `gap-0` with a full-width bottom border
- Content area has `p-4` padding by default
- Focus ring uses `--border-interactive` for keyboard accessibility

## Composition

- `TabsRoot` — Radix Root pass-through; manages active tab state
- `TabsList` — horizontal container with bottom border for triggers
- `TabsTrigger` — individual tab button with active underline indicator

## History

- Sprint 1: Initial implementation

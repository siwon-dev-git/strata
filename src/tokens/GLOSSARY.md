# Token Naming Glossary

3-layer OKLch token architecture: Layer 1 (primitive) → Layer 2 (semantic) → Layer 3 (component).
Components reference **Layer 3 only**. Layer 3 aliases Layer 2. Layer 2 aliases Layer 1. Never skip layers.

## Prefix Hierarchy

| Layer | Pattern                               | Example                            |
| ----- | ------------------------------------- | ---------------------------------- |
| L1    | `--sp-{category}-{scale}`             | `--sp-gray-200`, `--sp-space-4`    |
| L2    | `--{semantic-family}-{role}`          | `--fg-default`, `--border-subtle`  |
| L3    | `--{component}-{variant?}-{property}` | `--btn-solid-bg`, `--input-border` |

## L1 Primitive Prefixes (`--sp-`)

| Category    | Pattern                    | Range                                                  |
| ----------- | -------------------------- | ------------------------------------------------------ |
| Color       | `--sp-{hue}-{step}`        | `0`–`950` (lightness scale)                            |
| Spacing     | `--sp-space-{n}`           | `0`–`16` (rem × 0.25). `_` for fractions: `0_5`, `1_5` |
| Typography  | `--sp-text-{size}`         | `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`, `4xl`    |
| Line-height | `--sp-leading-{tightness}` | `none`, `tight`, `snug`, `normal`, `relaxed`, `loose`  |
| Duration    | `--sp-duration-{ms}`       | `0`, `75`, `100`, `150`, `200`, `300`, `500`           |
| Easing      | `--sp-ease-{curve}`        | `default`, `in`, `out`, `in-out`, `spring`             |
| Z-index     | `--sp-z-{n}`               | `0`, `10`, `20`, `30`, `40`, `50`, `60`                |
| Radius      | `--sp-radius-{size}`       | `none`, `sm`, `md`, `lg`, `xl`, `full`                 |

## L2 Semantic Families

| Family                  | Pattern                                                                     | Purpose                        |
| ----------------------- | --------------------------------------------------------------------------- | ------------------------------ |
| `--color-interactive`   | `{,-hover,-active,-fg,-subtle}`                                             | Primary action colors          |
| `--color-danger`        | `{,-hover,-active,-fg,-subtle}`                                             | Destructive/error              |
| `--color-success`       | `{,-fg,-subtle}`                                                            | Positive confirmation          |
| `--color-warning`       | `{,-fg,-subtle}`                                                            | Caution/alert                  |
| `--surface-`            | `base, raised, overlay, inset, disabled, control, inverted, loading, scrim` | Background elevation           |
| `--surface-control`     | `{,-hover}`                                                                 | Switch/slider/scrollbar tracks |
| `--surface-inverted`    | (standalone)                                                                | Tooltip background             |
| `--surface-loading`     | `{,-shine}`                                                                 | Skeleton shimmer               |
| `--surface-scrim`       | (standalone)                                                                | Modal overlay backdrop         |
| `--fg-`                 | `default, muted, subtle, disabled, on-accent, on-inverted`                  | Text hierarchy                 |
| `--fg-on-inverted`      | (standalone)                                                                | Text on inverted surface       |
| `--border-`             | `subtle, default, strong, interactive, danger`                              | Border prominence              |
| `--shadow-`             | `sm, md, lg`                                                                | Drop shadow elevation          |
| `--elevation-`          | `base, raised, dropdown, sticky, overlay, modal, toast`                     | Z-index by role                |
| `--density-`            | `gap, padding-x, padding-y, item-height`                                    | Compact/comfortable spacing    |
| `--type-{role}-leading` | `display`, `title`, `heading`, `body`, `label`, `caption`                   | Typography line-height         |
| `--focus-ring-`         | `color, width, offset`                                                      | Keyboard focus indicator       |
| `--motion-`             | `duration-{speed}, ease{,-entrance,-exit,-spring}`                          | Animation timing               |

## L3 Common Component Prefixes

| Prefix           | Component                                          | Token Count |
| ---------------- | -------------------------------------------------- | ----------- |
| `--btn-`         | Button                                             | 14          |
| `--input-`       | Input, Textarea                                    | 8           |
| `--select-`      | Select                                             | 8           |
| `--dialog-`      | Dialog                                             | 6           |
| `--menu-`        | DropdownMenu, ContextMenu, Menubar, NavigationMenu | 6           |
| `--checkbox-`    | Checkbox, RadioGroup                               | 6           |
| `--card-`        | Card                                               | 5           |
| `--tabs-`        | Tabs                                               | 5           |
| `--sidebar-`     | Sidebar                                            | 7           |
| `--toggle-`      | Toggle, ToggleGroup                                | 5           |
| `--toast-`       | Toast                                              | 4           |
| `--switch-`      | Switch                                             | 3           |
| `--slider-`      | Slider                                             | 3           |
| `--tooltip-`     | Tooltip                                            | 5           |
| `--avatar-`      | Avatar                                             | 3           |
| `--scrollarea-`  | ScrollArea                                         | 3           |
| `--skeleton-`    | Skeleton                                           | 2           |
| `--progress-`    | Progress                                           | 2           |
| `--topbar-`      | TopBar                                             | 3           |
| `--collapsible-` | Collapsible                                        | 2           |
| `--accordion-`   | Accordion                                          | 2           |
| `--sheet-`       | Sheet                                              | 2           |

## Suffix Conventions (All Layers)

| Suffix      | Meaning                |
| ----------- | ---------------------- |
| `-bg`       | Background color       |
| `-fg`       | Foreground/text color  |
| `-border`   | Border color           |
| `-hover`    | Pointer enter state    |
| `-active`   | Pressed/selected state |
| `-focus`    | Keyboard focus state   |
| `-disabled` | Inactive state         |
| `-checked`  | Toggle-on state        |
| `-subtle`   | Low contrast variant   |
| `-default`  | Medium contrast (base) |
| `-strong`   | High contrast variant  |
| `-raised`   | Elevated surface       |
| `-overlay`  | Modal/overlay surface  |
| `-inset`    | Recessed surface       |
| `-error`    | Validation error state |
| `-duration` | Animation duration     |
| `-ease`     | Animation easing curve |

## Token Reuse (Shared Groups)

Certain component families share a single token group:

- `--menu-*` → DropdownMenu, ContextMenu, Menubar, NavigationMenu
- `--checkbox-*` → Checkbox, RadioGroup
- `--input-*` → Input, Textarea
- `--overlay-bg` → Dialog, Sheet, AlertDialog

## Theme Selectors

| Selector                          | Purpose               |
| --------------------------------- | --------------------- |
| `:root`                           | Dark mode defaults    |
| `:root:not(.dark)`                | Light mode overrides  |
| `[data-theme='blue']`             | Blue accent theme     |
| `[data-theme='green']`            | Green accent theme    |
| `[data-density='compact']`        | Compact spacing       |
| `[data-density='spacious']`       | Spacious spacing      |
| `@media (prefers-reduced-motion)` | All durations → `0ms` |

## Color Palette Coverage (L1)

All color scales use OKLch with consistent lightness/chroma curves per step. Each hue maintains its own chroma ceiling appropriate to the gamut.

| Hue    | Steps                                                   | Count | Hue Angle |
| ------ | ------------------------------------------------------- | ----- | --------- |
| Gray   | 0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950 | 12    | 250       |
| Blue   | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900         | 10    | 260       |
| Red    | 50, 100, 200, 300, 400, 500, 600, 700                   | 8     | 25        |
| Green  | 50, 100, 200, 300, 400, 500, 600, 700                   | 8     | 155       |
| Yellow | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900         | 10    | 85        |
| Purple | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900         | 10    | 305       |
| Orange | 50, 100, 200, 300, 400, 500, 600, 700, 800, 900         | 10    | 55        |

### Lightness/Chroma Curve Pattern

Steps follow a consistent envelope across all hues (using Blue as the reference):

| Step | Lightness  | Chroma (approx)       | Usage                   |
| ---- | ---------- | --------------------- | ----------------------- |
| 50   | ~0.97      | low (~0.02)           | Tinted background wash  |
| 100  | ~0.93      | low (~0.04-0.05)      | Subtle background       |
| 200  | ~0.87      | rising (~0.08-0.09)   | Light accent background |
| 300  | ~0.79-0.83 | mid (~0.12-0.14)      | Hover/active states     |
| 400  | ~0.70-0.80 | mid-high (~0.16-0.20) | Light-mode interactive  |
| 500  | ~0.62-0.72 | peak (~0.16-0.24)     | Dark-mode primary       |
| 600  | ~0.52-0.60 | peak (~0.16-0.24)     | Light-mode primary      |
| 700  | ~0.43-0.50 | falling (~0.14-0.20)  | Dark accents            |
| 800  | ~0.34-0.40 | low (~0.11-0.16)      | Dark-mode backgrounds   |
| 900  | ~0.25-0.30 | low (~0.07-0.10)      | Darkest tone            |

## Spring Easing (L3)

The `--sp-ease-spring` primitive (`cubic-bezier(0.34, 1.56, 0.64, 1)`) provides an overshoot curve for lively entrance animations. It flows through the token layers as:

```
L1: --sp-ease-spring
L2: --motion-ease-spring  →  var(--sp-ease-spring)
L3: --{component}-ease    →  var(--motion-ease-spring)
```

Components using spring easing:

| Component   | Duration Token           | Ease Token           | Semantic Duration |
| ----------- | ------------------------ | -------------------- | ----------------- |
| Dialog      | `--dialog-duration`      | `--dialog-ease`      | entrance (200ms)  |
| Sheet       | `--sheet-duration`       | `--sheet-ease`       | slow (300ms)      |
| Accordion   | `--accordion-duration`   | `--accordion-ease`   | normal (150ms)    |
| Tooltip     | `--tooltip-duration`     | `--tooltip-ease`     | fast (100ms)      |
| Collapsible | `--collapsible-duration` | `--collapsible-ease` | normal (150ms)    |

Note: Collapsible uses `--motion-ease` (non-spring) for a gentler expand/collapse feel.

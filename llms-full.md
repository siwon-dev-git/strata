# Strata Design System — Full Documentation

> Complete component documentation for AI tools with large context windows.

## Design Tokens

### layer1-primitive.css

```css
/* ═══════════════════════════════════════════════════════════════
   Layer 1: Primitive Tokens
   Raw OKLch color scales + spacing + typography + radius.
   NEVER reference in components — only Layer 2 may reference these.
   Prefix: --sp-
   ═══════════════════════════════════════════════════════════════ */
:root {
  /* ── Gray (cool-tinted) ────────────────────────────────────── */
  --sp-gray-0: oklch(1 0 250);
  --sp-gray-50: oklch(0.97 0.004 250);
  --sp-gray-100: oklch(0.94 0.006 250);
  --sp-gray-200: oklch(0.88 0.008 250);
  --sp-gray-300: oklch(0.8 0.01 250);
  --sp-gray-400: oklch(0.65 0.012 250);
  --sp-gray-500: oklch(0.5 0.013 250);
  --sp-gray-600: oklch(0.38 0.012 250);
  --sp-gray-700: oklch(0.28 0.01 250);
  --sp-gray-800: oklch(0.2 0.008 250);
  --sp-gray-900: oklch(0.13 0.006 250);
  --sp-gray-950: oklch(0.06 0.004 250);

  /* ── Blue ──────────────────────────────────────────────────── */
  --sp-blue-50: oklch(0.97 0.02 260);
  --sp-blue-100: oklch(0.93 0.04 260);
  --sp-blue-200: oklch(0.87 0.08 260);
  --sp-blue-300: oklch(0.79 0.12 260);
  --sp-blue-400: oklch(0.7 0.16 260);
  --sp-blue-500: oklch(0.62 0.21 260);
  --sp-blue-600: oklch(0.54 0.2 260);
  --sp-blue-700: oklch(0.45 0.18 260);
  --sp-blue-800: oklch(0.35 0.14 260);
  --sp-blue-900: oklch(0.25 0.09 260);

  /* ── Red ───────────────────────────────────────────────────── */
  --sp-red-50: oklch(0.97 0.02 25);
  --sp-red-100: oklch(0.93 0.05 25);
  --sp-red-200: oklch(0.87 0.1 25);
  --sp-red-300: oklch(0.79 0.16 25);
  --sp-red-400: oklch(0.7 0.2 25);
  --sp-red-500: oklch(0.63 0.24 25);
  --sp-red-600: oklch(0.5 0.24 25);
  --sp-red-700: oklch(0.4 0.2 25);

  /* ── Green ─────────────────────────────────────────────────── */
  --sp-green-50: oklch(0.97 0.02 155);
  --sp-green-100: oklch(0.93 0.05 155);
  --sp-green-200: oklch(0.87 0.1 155);
  --sp-green-300: oklch(0.79 0.14 155);
  --sp-green-400: oklch(0.72 0.19 155);
  --sp-green-500: oklch(0.65 0.19 155);
  --sp-green-600: oklch(0.55 0.19 155);
  --sp-green-700: oklch(0.45 0.16 155);

  /* ── Yellow ────────────────────────────────────────────────── */
  --sp-yellow-50: oklch(0.97 0.02 85);
  --sp-yellow-100: oklch(0.93 0.05 85);
  --sp-yellow-200: oklch(0.87 0.09 85);
  --sp-yellow-300: oklch(0.83 0.13 85);
  --sp-yellow-400: oklch(0.8 0.16 85);
  --sp-yellow-500: oklch(0.72 0.16 85);
  --sp-yellow-600: oklch(0.6 0.16 85);
  --sp-yellow-700: oklch(0.5 0.14 85);
  --sp-yellow-800: oklch(0.4 0.11 85);
  --sp-yellow-900: oklch(0.3 0.07 85);

  /* ── Purple ────────────────────────────────────────────────── */
  --sp-purple-50: oklch(0.97 0.02 305);
  --sp-purple-100: oklch(0.93 0.05 305);
  --sp-purple-200: oklch(0.87 0.09 305);
  --sp-purple-300: oklch(0.79 0.14 305);
  --sp-purple-400: oklch(0.7 0.2 305);
  --sp-purple-500: oklch(0.62 0.24 305);
  --sp-purple-600: oklch(0.52 0.24 305);
  --sp-purple-700: oklch(0.43 0.2 305);
  --sp-purple-800: oklch(0.34 0.16 305);
  --sp-purple-900: oklch(0.25 0.1 305);

  /* ── Orange ────────────────────────────────────────────────── */
  --sp-orange-50: oklch(0.97 0.02 55);
  --sp-orange-100: oklch(0.93 0.05 55);
  --sp-orange-200: oklch(0.87 0.09 55);
  --sp-orange-300: oklch(0.81 0.13 55);
  --sp-orange-400: oklch(0.76 0.16 55);
  --sp-orange-500: oklch(0.72 0.19 55);
  --sp-orange-600: oklch(0.58 0.19 55);
  --sp-orange-700: oklch(0.48 0.16 55);
  --sp-orange-800: oklch(0.38 0.12 55);
  --sp-orange-900: oklch(0.28 0.08 55);

  /* ── Spacing scale ─────────────────────────────────────────── */
  --sp-space-0: 0;
  --sp-space-0_5: 0.125rem;
  --sp-space-1: 0.25rem;
  --sp-space-1_5: 0.375rem;
  --sp-space-2: 0.5rem;
  --sp-space-3: 0.75rem;
  --sp-space-4: 1rem;
  --sp-space-5: 1.25rem;
  --sp-space-6: 1.5rem;
  --sp-space-8: 2rem;
  --sp-space-10: 2.5rem;
  --sp-space-12: 3rem;
  --sp-space-16: 4rem;

  /* ── Typography scale ──────────────────────────────────────── */
  --sp-text-xs: 0.75rem;
  --sp-text-sm: 0.875rem;
  --sp-text-base: 1rem;
  --sp-text-lg: 1.125rem;
  --sp-text-xl: 1.25rem;
  --sp-text-2xl: 1.5rem;
  --sp-text-3xl: 1.875rem;
  --sp-text-4xl: 2.25rem;

  /* ── Line-height scale ──────────────────────────────────────── */
  --sp-leading-none: 1;
  --sp-leading-tight: 1.25;
  --sp-leading-snug: 1.375;
  --sp-leading-normal: 1.5;
  --sp-leading-relaxed: 1.625;
  --sp-leading-loose: 2;

  /* ── Motion scale ──────────────────────────────────────────── */
  --sp-duration-0: 0ms;
  --sp-duration-75: 75ms;
  --sp-duration-100: 100ms;
  --sp-duration-150: 150ms;
  --sp-duration-200: 200ms;
  --sp-duration-300: 300ms;
  --sp-duration-500: 500ms;

  --sp-ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --sp-ease-in: cubic-bezier(0.4, 0, 1, 1);
  --sp-ease-out: cubic-bezier(0, 0, 0.2, 1);
  --sp-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --sp-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* ── Z-index scale ─────────────────────────────────────────── */
  --sp-z-0: 0;
  --sp-z-10: 10;
  --sp-z-20: 20;
  --sp-z-30: 30;
  --sp-z-40: 40;
  --sp-z-50: 50;
  --sp-z-60: 60;

  /* ── Radius scale ──────────────────────────────────────────── */
  --sp-radius-none: 0;
  --sp-radius-sm: 0.25rem;
  --sp-radius-md: 0.5rem;
  --sp-radius-lg: 0.75rem;
  --sp-radius-xl: 1rem;
  --sp-radius-full: 9999px;
}
```

### layer2-semantic.css

```css
/* ═══════════════════════════════════════════════════════════════
   Layer 2: Semantic Tokens
   Assign MEANING to Layer 1 primitives.
   Components reference these — never Layer 1 directly.
   ═══════════════════════════════════════════════════════════════ */

/* ── Dark mode (default) ─────────────────────────────────────── */
:root {
  /* Interactive */
  --color-interactive: var(--sp-blue-500);
  --color-interactive-hover: var(--sp-blue-400);
  --color-interactive-fg: oklch(0.98 0 0);
  --color-interactive-subtle: oklch(0.62 0.21 260 / 12%);
  --color-interactive-active: var(--sp-blue-600);

  /* Status: danger / success / warning */
  --color-danger: var(--sp-red-500);
  --color-danger-hover: var(--sp-red-400);
  --color-danger-fg: oklch(0.98 0 0);
  --color-danger-subtle: oklch(0.63 0.24 25 / 12%);
  --color-danger-active: var(--sp-red-600);

  --color-success: var(--sp-green-400);
  --color-success-fg: oklch(0.08 0.01 250);
  --color-success-subtle: oklch(0.72 0.19 155 / 12%);

  --color-warning: var(--sp-yellow-400);
  --color-warning-fg: oklch(0.08 0.01 250);
  --color-warning-subtle: oklch(0.8 0.16 85 / 12%);

  /* Surface hierarchy */
  --surface-base: var(--sp-gray-950);
  --surface-raised: var(--sp-gray-900);
  --surface-overlay: var(--sp-gray-800);
  --surface-inset: oklch(0.06 0.004 250);
  --surface-disabled: var(--sp-gray-800);

  /* Foreground hierarchy */
  --fg-default: var(--sp-gray-50);
  --fg-muted: var(--sp-gray-400);
  --fg-subtle: var(--sp-gray-500);
  --fg-disabled: var(--sp-gray-600);
  --fg-on-accent: oklch(0.98 0 0);

  /* Control surfaces (switches, sliders, scrollbars) */
  --surface-control: var(--sp-gray-600);
  --surface-control-hover: var(--sp-gray-400);

  /* Inverted surfaces (tooltips) */
  --surface-inverted: var(--sp-gray-800);
  --fg-on-inverted: var(--sp-gray-50);

  /* Loading states (skeleton) */
  --surface-loading: var(--sp-gray-700);
  --surface-loading-shine: var(--sp-gray-600);

  /* Scrim overlay */
  --surface-scrim: oklch(0 0 0 / 50%);

  /* Radius */
  --radius-none: var(--sp-radius-none);
  --radius-sm: var(--sp-radius-sm);
  --radius-md: var(--sp-radius-md);
  --radius-lg: var(--sp-radius-lg);
  --radius-xl: var(--sp-radius-xl);
  --radius-full: var(--sp-radius-full);

  /* Border */
  --border-subtle: var(--sp-gray-800);
  --border-default: var(--sp-gray-700);
  --border-strong: var(--sp-gray-600);
  --border-interactive: var(--sp-blue-500);
  --border-danger: var(--sp-red-500);

  /* Shadow */
  --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px oklch(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px oklch(0 0 0 / 0.5);

  /* Elevation — z-index stacking order */
  --elevation-base: var(--sp-z-0);
  --elevation-raised: var(--sp-z-10);
  --elevation-dropdown: var(--sp-z-20);
  --elevation-sticky: var(--sp-z-30);
  --elevation-overlay: var(--sp-z-40);
  --elevation-modal: var(--sp-z-50);
  --elevation-toast: var(--sp-z-60);

  /* Density — comfortable (default) */
  --density-gap: var(--sp-space-3);
  --density-padding-x: var(--sp-space-4);
  --density-padding-y: var(--sp-space-2);
  --density-item-height: 2.25rem;

  /* Typography — semantic scale */
  --type-display: var(--sp-text-4xl);
  --type-title: var(--sp-text-2xl);
  --type-heading: var(--sp-text-xl);
  --type-body: var(--sp-text-base);
  --type-label: var(--sp-text-sm);
  --type-caption: var(--sp-text-xs);

  /* Typography — line-height */
  --type-display-leading: var(--sp-leading-tight);
  --type-title-leading: var(--sp-leading-tight);
  --type-heading-leading: var(--sp-leading-snug);
  --type-body-leading: var(--sp-leading-normal);
  --type-label-leading: var(--sp-leading-normal);
  --type-caption-leading: var(--sp-leading-normal);

  /* Focus — accessible ring (WCAG 2.2 AA: 3:1 against adjacents) */
  --focus-ring-color: var(--sp-blue-500);
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;

  /* Motion — semantic intent */
  --motion-duration-fast: var(--sp-duration-100);
  --motion-duration-normal: var(--sp-duration-150);
  --motion-duration-slow: var(--sp-duration-300);
  --motion-duration-entrance: var(--sp-duration-200);
  --motion-duration-exit: var(--sp-duration-150);
  --motion-ease: var(--sp-ease-default);
  --motion-ease-entrance: var(--sp-ease-out);
  --motion-ease-exit: var(--sp-ease-in);
  --motion-ease-spring: var(--sp-ease-spring);
}

/* ── Reduced motion ────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  :root {
    --sp-duration-75: 0ms;
    --sp-duration-100: 0ms;
    --sp-duration-150: 0ms;
    --sp-duration-200: 0ms;
    --sp-duration-300: 0ms;
    --sp-duration-500: 0ms;
  }
}

/* ── Light mode ──────────────────────────────────────────────── */
:root:not(.dark),
:root:not(.dark) [data-theme] {
  --color-interactive: var(--sp-blue-600);
  --color-interactive-hover: var(--sp-blue-500);
  --color-interactive-subtle: oklch(0.54 0.2 260 / 10%);
  --color-interactive-active: var(--sp-blue-700);

  --color-danger: var(--sp-red-600);
  --color-danger-hover: var(--sp-red-500);
  --color-danger-subtle: oklch(0.5 0.24 25 / 10%);
  --color-danger-active: var(--sp-red-700);

  --color-success: var(--sp-green-600);
  --color-success-subtle: oklch(0.55 0.19 155 / 10%);

  --color-warning: var(--sp-yellow-600);
  --color-warning-subtle: oklch(0.6 0.16 85 / 10%);

  --surface-base: var(--sp-gray-50);
  --surface-raised: var(--sp-gray-0);
  --surface-overlay: var(--sp-gray-0);
  --surface-inset: var(--sp-gray-100);
  --surface-disabled: var(--sp-gray-100);

  --fg-default: var(--sp-gray-900);
  --fg-muted: var(--sp-gray-600);
  --fg-subtle: var(--sp-gray-500);
  --fg-disabled: var(--sp-gray-400);

  --border-subtle: var(--sp-gray-200);
  --border-default: var(--sp-gray-300);
  --border-strong: var(--sp-gray-400);

  --shadow-sm: 0 1px 2px oklch(0 0 0 / 0.06);
  --shadow-md: 0 4px 6px oklch(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px oklch(0 0 0 / 0.15);

  --focus-ring-color: var(--sp-blue-600);

  --surface-control: var(--sp-gray-300);
  --surface-control-hover: var(--sp-gray-500);
  --surface-inverted: var(--sp-gray-800);
  --fg-on-inverted: var(--sp-gray-50);
  --surface-loading: var(--sp-gray-200);
  --surface-loading-shine: var(--sp-gray-300);
  --surface-scrim: oklch(0 0 0 / 30%);
}

/* ── Theme: Blue → purple accent (dark) ────────────────────── */
[data-theme='blue'] {
  --color-interactive: var(--sp-purple-500);
  --color-interactive-hover: var(--sp-purple-400);
  --color-interactive-subtle: oklch(0.62 0.24 305 / 12%);
  --color-interactive-active: var(--sp-purple-600);
  --border-interactive: var(--sp-purple-500);
}

/* ── Theme: Blue → purple accent (light) ───────────────────── */
:root:not(.dark)[data-theme='blue'],
:root:not(.dark) [data-theme='blue'] {
  --color-interactive: var(--sp-purple-600);
  --color-interactive-hover: var(--sp-purple-500);
  --color-interactive-subtle: oklch(0.52 0.24 305 / 10%);
  --color-interactive-active: var(--sp-purple-700);
  --border-interactive: var(--sp-purple-600);
}

/* ── Theme: Green (dark) ───────────────────────────────────── */
[data-theme='green'] {
  --color-interactive: var(--sp-green-500);
  --color-interactive-hover: var(--sp-green-400);
  --color-interactive-subtle: oklch(0.65 0.19 155 / 12%);
  --color-interactive-active: var(--sp-green-600);
  --border-interactive: var(--sp-green-500);
}

/* ── Theme: Green (light) ──────────────────────────────────── */
:root:not(.dark)[data-theme='green'],
:root:not(.dark) [data-theme='green'] {
  --color-interactive: var(--sp-green-600);
  --color-interactive-hover: var(--sp-green-500);
  --color-interactive-subtle: oklch(0.55 0.19 155 / 10%);
  --color-interactive-active: var(--sp-green-700);
  --border-interactive: var(--sp-green-600);
}

/* ── Density: compact ──────────────────────────────────────── */
[data-density='compact'] {
  --density-gap: var(--sp-space-1_5);
  --density-padding-x: var(--sp-space-2);
  --density-padding-y: var(--sp-space-1);
  --density-item-height: 1.75rem;
}

/* ── Density: spacious ─────────────────────────────────────── */
[data-density='spacious'] {
  --density-gap: var(--sp-space-4);
  --density-padding-x: var(--sp-space-6);
  --density-padding-y: var(--sp-space-3);
  --density-item-height: 2.75rem;
}

/* ── Responsive typography ─────────────────────────────────── */
@media (max-width: 640px) {
  :root {
    --type-display: var(--sp-text-2xl);
    --type-title: var(--sp-text-xl);
    --type-heading: var(--sp-text-lg);
  }
}
```

### layer3-component.css

```css
/* ═══════════════════════════════════════════════════════════════
   Layer 3: Component Tokens
   Component-specific aliases of Layer 2 semantic tokens.
   Override these to reskin individual components without
   touching semantic or primitive layers.
   ═══════════════════════════════════════════════════════════════ */
:root {
  /* ── Button ────────────────────────────────────────────────── */
  --btn-solid-bg: var(--color-interactive);
  --btn-solid-bg-hover: var(--color-interactive-hover);
  --btn-solid-fg: var(--color-interactive-fg);
  --btn-ghost-bg-hover: var(--color-interactive-subtle);
  --btn-ghost-fg: var(--fg-default);
  --btn-outline-border: var(--border-default);
  --btn-outline-hover: var(--border-interactive);
  --btn-danger-bg: var(--color-danger);
  --btn-danger-bg-hover: var(--color-danger-hover);
  --btn-danger-fg: var(--color-danger-fg);
  --btn-solid-bg-active: var(--color-interactive-active);
  --btn-ghost-bg-active: var(--color-interactive-subtle);
  --btn-outline-bg-active: var(--color-interactive-subtle);
  --btn-danger-bg-active: var(--color-danger-active);
  --btn-focus-ring-width: var(--focus-ring-width);
  --btn-focus-ring-color: var(--focus-ring-color);
  --btn-focus-ring-offset: var(--focus-ring-offset);
  --btn-disabled-opacity: 0.4;
  --btn-touch-target: 2.75rem;
  --btn-radius: var(--radius-md);

  /* ── Input ─────────────────────────────────────────────────── */
  --input-bg: var(--surface-inset);
  --input-border: var(--border-default);
  --input-border-focus: var(--border-interactive);
  --input-border-error: var(--border-danger);
  --input-fg: var(--fg-default);
  --input-placeholder: var(--fg-subtle);
  --input-radius: var(--radius-md);
  --input-ring: color-mix(in oklch, var(--focus-ring-color) 25%, transparent);

  /* ── Badge ─────────────────────────────────────────────────── */
  --badge-radius: var(--radius-full);

  /* ── Avatar ────────────────────────────────────────────────── */
  --avatar-radius: var(--radius-full);
  --avatar-bg: var(--color-interactive-subtle);
  --avatar-fg: var(--color-interactive);

  /* ── Sidebar ───────────────────────────────────────────────── */
  --sidebar-width: 240px;
  --sidebar-width-collapsed: 0px;
  --sidebar-bg: var(--surface-raised);
  --sidebar-border: var(--border-subtle);
  --sidebar-item-hover: var(--color-interactive-subtle);
  --sidebar-item-active-bg: var(--color-interactive-subtle);
  --sidebar-item-active-fg: var(--color-interactive);

  /* ── TopBar ────────────────────────────────────────────────── */
  --topbar-height: 48px;
  --topbar-bg: var(--surface-raised);
  --topbar-border: var(--border-subtle);

  /* ── Dialog ────────────────────────────────────────────────── */
  --dialog-bg: var(--surface-overlay);
  --dialog-border: var(--border-subtle);
  --dialog-radius: var(--radius-xl);
  --dialog-shadow: var(--shadow-lg);
  --dialog-duration: var(--motion-duration-entrance);
  --dialog-ease: var(--motion-ease-spring);
  --overlay-bg: var(--surface-scrim);

  /* ── Tooltip ───────────────────────────────────────────────── */
  --tooltip-bg: var(--surface-inverted);
  --tooltip-fg: var(--fg-on-inverted);
  --tooltip-radius: var(--radius-sm);
  --tooltip-duration: var(--motion-duration-fast);
  --tooltip-ease: var(--motion-ease-spring);

  /* ── Tabs ──────────────────────────────────────────────────── */
  --tabs-border: var(--border-subtle);
  --tabs-trigger-fg: var(--fg-muted);
  --tabs-active-fg: var(--fg-default);
  --tabs-active-border: var(--color-interactive);
  --tabs-hover-bg: var(--color-interactive-subtle);

  /* ── DropdownMenu ──────────────────────────────────────────── */
  --menu-bg: var(--surface-overlay);
  --menu-border: var(--border-subtle);
  --menu-radius: var(--radius-lg);
  --menu-item-hover: var(--color-interactive-subtle);
  --menu-item-fg: var(--fg-default);
  --menu-shadow: var(--shadow-md);

  /* ── Switch ──────────────────────────────────────────────── */
  --switch-bg: var(--surface-control);
  --switch-bg-checked: var(--color-interactive);
  --switch-thumb: var(--fg-on-accent);

  /* ── Slider ──────────────────────────────────────────────── */
  --slider-track: var(--surface-control);
  --slider-range: var(--color-interactive);
  --slider-thumb: var(--fg-on-accent);

  /* ── ProgressBar ─────────────────────────────────────────── */
  --progress-track: var(--surface-control);
  --progress-bar: var(--color-interactive);

  /* ── Card ────────────────────────────────────────────────── */
  --card-bg: var(--surface-raised);
  --card-bg-hover: var(--surface-overlay);
  --card-border: var(--border-subtle);
  --card-border-hover: var(--border-default);
  --card-radius: var(--radius-lg);

  /* ── Checkbox ──────────────────────────────────────────── */
  --checkbox-bg: transparent;
  --checkbox-bg-checked: var(--color-interactive);
  --checkbox-border: var(--border-default);
  --checkbox-border-checked: var(--color-interactive);
  --checkbox-fg: var(--fg-on-accent);
  --checkbox-radius: var(--radius-sm);

  /* ── Select ────────────────────────────────────────────── */
  --select-bg: var(--surface-inset);
  --select-border: var(--border-default);
  --select-border-focus: var(--border-interactive);
  --select-fg: var(--fg-default);
  --select-placeholder: var(--fg-subtle);
  --select-radius: var(--radius-md);
  --select-content-bg: var(--surface-overlay);
  --select-item-hover: var(--color-interactive-subtle);

  /* ── Toast ─────────────────────────────────────────────── */
  --toast-bg: var(--surface-overlay);
  --toast-border: var(--border-subtle);
  --toast-radius: var(--radius-lg);
  --toast-shadow: var(--shadow-lg);

  /* ── Alert ─────────────────────────────────────────────── */
  --alert-radius: var(--radius-md);

  /* ── Skeleton ──────────────────────────────────────────── */
  --skeleton-bg: var(--surface-loading);
  --skeleton-shine: var(--surface-loading-shine);

  /* ── RadioGroup ────────────────────────────────────────── */
  /* Reuses checkbox tokens */

  /* ── ScrollArea ──────────────────────────────────────── */
  --scrollarea-thumb: var(--surface-control);
  --scrollarea-thumb-hover: var(--surface-control-hover);
  --scrollarea-track: transparent;

  /* ── ContextMenu ─────────────────────────────────────── */
  /* Reuses --menu-* tokens from DropdownMenu */

  /* ── Toggle / ToggleGroup ────────────────────────────── */
  --toggle-bg: transparent;
  --toggle-active-bg: var(--color-interactive-subtle);
  --toggle-active-fg: var(--color-interactive);
  --toggle-border: var(--border-default);
  --toggle-radius: var(--radius-md);

  /* ── HoverCard ────────────────────────────────────────── */
  /* Reuses --menu-* tokens */

  /* ── Collapsible ──────────────────────────────────────── */
  --collapsible-duration: var(--motion-duration-normal);
  --collapsible-ease: var(--motion-ease);

  /* ── Accordion ──────────────────────────────────────── */
  --accordion-duration: var(--motion-duration-normal);
  --accordion-ease: var(--motion-ease-spring);

  /* ── NavigationMenu ──────────────────────────────────── */
  /* Reuses --menu-* tokens */

  /* ── Menubar ─────────────────────────────────────────── */
  /* Reuses --menu-* tokens */

  /* ── Textarea ────────────────────────────────────────── */
  /* Reuses --input-* tokens */

  /* ── Sheet ───────────────────────────────────────────── */
  /* Reuses --dialog-* and --overlay-bg tokens */
  --sheet-duration: var(--motion-duration-slow);
  --sheet-ease: var(--motion-ease-spring);

  /* ── Pagination ──────────────────────────────────────── */
  /* Reuses --btn-* tokens */

  /* ── AlertDialog ─────────────────────────────────────── */
  /* Reuses --dialog-* and --overlay-bg tokens */

  /* ── Toolbar ─────────────────────────────────────────── */
  /* Reuses --menu-* and --toggle-* tokens */
}
```

## Primitives

### AspectRatio (Tier 0)

# AspectRatio

## Role

Maintains a fixed width-to-height ratio for its child content.

## Tier

0

## Tokens

- none

## Constraints

- Thin wrapper over `@radix-ui/react-aspect-ratio` Root; no custom styling
- Re-exports Radix primitive directly — do not add props or logic

## History

- Sprint 1: Initial implementation

---

### Avatar (Tier 0)

# Avatar

## Role

Displays a user image or initials fallback in a circular badge.

## Tier

0

## Tokens

- `--avatar-radius` — border radius of the avatar container
- `--avatar-bg` — background color of the initials fallback
- `--avatar-fg` — text color of the initials fallback

## Constraints

- Falls back to initials derived from `name` when `src` is absent or fails
- `alt` is required for accessibility regardless of display mode
- Size controlled via `SIZE_MAP` (sm | md | lg), default `md`
- Initials logic: first letter of first word + first letter of last word, uppercased

## History

- Sprint 1: Initial implementation

---

### AvatarGroup (Tier 0)

# AvatarGroup

## Role

Stacks multiple Avatar components with overlap and an optional overflow counter.

## Tier

0

## Tokens

- `--avatar-bg` — background of the overflow counter bubble
- `--avatar-fg` — text color of the overflow counter
- `--surface-default` — ring color around each avatar

## Constraints

- `max` prop controls visible count; excess renders as `+N` overflow bubble
- Children rendered with `Children.toArray`; each wrapped in a ring for separation
- Overflow bubble matches `SIZE_MAP` (sm | md | lg) of the group
- Negative spacing via `-space-x-2` for avatar stacking

## History

- Sprint 1: Initial implementation

---

### Badge (Tier 1)

# Badge

## Role

Renders a small inline label for status, category, or count.

## Tier

1

## Tokens

- `--badge-radius` — border radius of the badge
- `--color-success-subtle` — background for success variant
- `--color-warning-subtle` — background for warning variant
- `--color-danger-subtle` — background for danger variant
- `--color-interactive-subtle` — background for interactive variant

## Constraints

- No interactive states; purely visual indicator
- Size controlled via `SIZE_MAP` (sm | md), default `md`
- Variant controlled via `VARIANT_MAP`, default `default`

## Variants

| variant     | purpose                                                   |
| ----------- | --------------------------------------------------------- |
| default     | Neutral badge on `surface-overlay` background             |
| success     | Positive status on success-subtle background              |
| warning     | Cautionary status on warning-subtle background            |
| danger      | Error/destructive status on danger-subtle background      |
| interactive | Actionable/informational on interactive-subtle background |

## History

- Sprint 1: Initial implementation

---

### Breadcrumb (Tier 2)

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

---

### Button (Tier 1)

# Button

## Role

Primary interactive element for triggering actions, with variant styling, loading state, and icon-only support.

## Tier

1

## Tokens

- `--btn-radius` — border radius
- `--btn-solid-bg` — solid variant background
- `--btn-solid-fg` — solid variant foreground
- `--btn-solid-bg-hover` — solid variant hover background
- `--btn-solid-bg-active` — solid variant active/pressed background
- `--btn-ghost-fg` — ghost variant foreground
- `--btn-ghost-bg-hover` — ghost variant hover background
- `--btn-ghost-bg-active` — ghost variant active/pressed background
- `--btn-outline-border` — outline variant border color
- `--btn-outline-hover` — outline variant hover background
- `--btn-outline-bg-active` — outline variant active/pressed background
- `--btn-danger-bg` — danger variant background
- `--btn-danger-fg` — danger variant foreground
- `--btn-danger-bg-hover` — danger variant hover background
- `--btn-danger-bg-active` — danger variant active/pressed background
- `--btn-focus-ring-width` — focus ring width (aligned with Input/Select)
- `--btn-focus-ring-color` — focus ring color
- `--btn-focus-ring-offset` — focus ring offset from edge
- `--btn-disabled-opacity` — opacity for disabled state
- `--btn-touch-target` — minimum touch target size (WCAG 2.5.8)
- `--border-interactive` — (L2) focus ring color source

## Props

| prop       | type                                          | default   | description                          |
| ---------- | --------------------------------------------- | --------- | ------------------------------------ |
| variant    | `'solid' \| 'ghost' \| 'outline' \| 'danger'` | `'solid'` | Visual variant                       |
| size       | `'sm' \| 'md' \| 'lg' \| 'icon'`              | `'md'`    | Size variant                         |
| fullWidth  | `boolean`                                     | `false`   | Stretch to fill parent width         |
| loading    | `boolean`                                     | `false`   | Show spinner and disable interaction |
| asChild    | `boolean`                                     | `false`   | Delegate rendering to child via Slot |
| classNames | `{ spinner?: string }`                        | —         | Granular sub-element class overrides |
| className  | `string`                                      | —         | Root element class override          |

## Data Attributes

| attribute      | value           | purpose                     |
| -------------- | --------------- | --------------------------- |
| `data-slot`    | `"button"`      | Structural CSS targeting    |
| `data-variant` | variant name    | Variant-based CSS overrides |
| `data-size`    | size name       | Size-based CSS overrides    |
| `data-loading` | `"true"` / none | Loading state CSS overrides |

## Constraints

- `loading` prop disables the button and shows a `Spinner` before children
- `asChild` delegates rendering to `@radix-ui/react-slot` for polymorphism
- `disabled || loading` disables pointer events and reduces opacity via `--btn-disabled-opacity`
- `aria-busy` set when loading
- Focus ring uses `focus-visible` with ring-offset, aligned with Input/Select/Textarea pattern
- Icon-only (`size="icon"`) requires `aria-label` or `aria-labelledby` (dev warning)
- All sizes meet 44px minimum touch target via invisible pseudo-element expansion
- `type="button"` default prevents accidental form submission
- Active/pressed state uses `--motion-duration-fast` for immediate feedback

## Variants

| variant | purpose                                     |
| ------- | ------------------------------------------- |
| solid   | Primary filled button (default)             |
| ghost   | Transparent background, text-only style     |
| outline | Bordered transparent button                 |
| danger  | Destructive action with danger color scheme |

## Sizes

| size | height               | use case                         |
| ---- | -------------------- | -------------------------------- |
| sm   | 28px                 | Compact contexts, inline actions |
| md   | density-aware        | Default, adapts to density mode  |
| lg   | 44px                 | Primary CTAs, mobile-friendly    |
| icon | density-aware square | Icon-only buttons, toolbars      |

## Override Patterns

### Token override (scoped via data attributes)

```css
[data-slot='button'][data-variant='solid'] {
  --btn-solid-bg: var(--sp-green-500);
  --btn-solid-bg-hover: var(--sp-green-400);
}
```

### Sub-element styling via classNames

```tsx
<Button loading classNames={{ spinner: 'opacity-50' }}>
  Saving
</Button>
```

### Extending with buttonVariants

```tsx
import { buttonVariants } from '@siwon-dev-npm/strata';
const customClass = buttonVariants({
  variant: 'solid',
  size: 'lg',
  fullWidth: true,
});
```

## History

- Sprint 1: Initial implementation
- MAINTAIN 10-cycle: Token foundation (active/focus/disabled), focus ring alignment, active states, keyboard tests, variant override tests, touch targets, icon-only support, ARIA tests, type="button" default, density stories, documentation
- DX optimization: Data attributes, classNames prop, fullWidth variant, export structure, visual evaluation tooling

---

### Card (Tier 2)

# Card

## Role

Container component for grouping related content with optional header and footer sections.

## Tier

2

## Tokens

- `--card-bg` — card background color
- `--card-border` — card border color
- `--card-radius` — card border radius
- `--card-bg-hover` — interactive variant hover background
- `--card-border-hover` — interactive variant hover border

## Constraints

- Root `Card` accepts a `variant` prop (default | interactive)
- Interactive variant adds hover states and `cursor-pointer`
- Sub-components handle internal spacing; do not add padding to root `Card`
- All sub-components accept `ref` via `ComponentPropsWithRef`

## Variants

| variant     | purpose                                     |
| ----------- | ------------------------------------------- |
| default     | Static content container with border        |
| interactive | Clickable card with hover state transitions |

## Composition

- `Card` -> root container with border and background
- `CardHeader` -> top section with `px-4 pt-4 pb-0` padding
- `CardBody` -> main content area with `p-4` padding
- `CardFooter` -> bottom section with `px-4 pb-4 pt-0` padding

## History

- Sprint 1: Initial implementation

---

### Checkbox (Tier 0)

# Checkbox

## Role

Binary toggle input built on Radix Checkbox with custom styling and check indicator.

## Tier

0

## Tokens

- `--checkbox-radius` — border radius
- `--checkbox-border` — unchecked border color
- `--checkbox-bg` — unchecked background color
- `--checkbox-bg-checked` — checked background color
- `--checkbox-border-checked` — checked border color
- `--checkbox-fg` — checkmark icon color
- `--border-interactive` — focus ring color

## Constraints

- Wraps `@radix-ui/react-checkbox`; `asChild` prop is omitted from the interface
- Disabled state reduces opacity to 40% and blocks pointer events
- Check indicator is an inline SVG polyline, not an icon component
- Focus ring uses `focus-visible` for keyboard-only indication

## History

- Sprint 1: Initial implementation

---

### Code (Tier 0)

# Code

## Role

Inline code snippet with monospace font and subtle background.

## Tier

0

## Tokens

- `--surface-inset` — background color
- `--border-subtle` — border color

## Constraints

- Renders as `<code>` element with monospace font
- Always inline; not intended for multi-line code blocks
- Uses `text-sm` fixed sizing; no size variants

## History

- Sprint 1: Initial implementation

---

### DataList (Tier 2)

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

---

### Divider (Tier 0)

# Divider

## Role

Visual separator line between content sections, horizontal or vertical.

## Tier

0

## Tokens

- none (uses `bg-border-subtle` utility class)

## Constraints

- Sets `role="separator"` and `aria-orientation` for accessibility
- Horizontal: `h-px w-full`; Vertical: `w-px self-stretch`
- Default orientation is `horizontal`
- No Radix dependency; pure HTML `<div>`

## History

- Sprint 1: Initial implementation

---

### FormField (Tier 0)

# FormField

## Role

Wraps a form control with a label, optional description, and error message.

## Tier

0

## Tokens

- none (uses semantic utility classes: `text-fg-default`, `text-fg-muted`, `text-danger`)

## Constraints

- Error message takes priority over description — only one displays at a time
- `required` prop renders a red asterisk after the label
- `htmlFor` links the label to the child input for accessibility
- Does not manage form state; purely presentational wrapper
- Children slot is between label and description/error

## History

- Sprint 1: Initial implementation

---

### Heading (Tier 1)

# Heading

## Role

Semantic heading element (h1-h6) with level-based typography presets.

## Tier

1

## Tokens

- none (uses semantic utility classes: `text-fg-default`)

## Constraints

- `level` prop (1-6) controls both the rendered element and typography style
- `as` prop overrides the rendered element independently of `level`
- Default level is `2` (renders as `<h2>`)
- All headings use `tracking-tight` letter spacing

## Variants

| variant | purpose                                              |
| ------- | ---------------------------------------------------- |
| level 1 | `text-3xl font-bold` — page title                    |
| level 2 | `text-2xl font-semibold` — section heading (default) |
| level 3 | `text-xl font-semibold` — subsection heading         |
| level 4 | `text-lg font-medium` — group heading                |
| level 5 | `text-base font-medium` — minor heading              |
| level 6 | `text-sm font-medium` — smallest heading             |

## History

- Sprint 1: Initial implementation

---

### Icon (Tier 2)

# Icon

## Role

Base SVG icon wrapper and factory for 61 named icon components.

## Tier

2

## Tokens

- none (inherits `currentColor` from parent via `stroke="currentColor"`)

## Constraints

- Base `Icon` renders an SVG with `viewBox="0 0 24 24"`, stroke-based, `aria-hidden="true"`
- Size controlled via `SIZE_MAP` (sm: 16px | md: 20px | lg: 24px), default `md`
- `createIcon` factory generates named icon components with consistent props
- All icons use `fill="none"` and `strokeWidth={2}` with round caps/joins
- Icons are decorative (`aria-hidden`); pair with text or `aria-label` for meaning

## Composition

- `Icon` -> base SVG wrapper accepting children paths
- `createIcon(name, paths)` -> factory producing named icon components
- 61 named exports: `IconHome`, `IconSearch`, `IconSettings`, `IconPlus`, `IconChevronRight`, `IconHash`, `IconUser`, `IconBell`, `IconMail`, `IconStar`, `IconBookmark`, `IconHeart`, `IconMessageCircle`, `IconRepeat`, `IconMoreHorizontal`, `IconX`, `IconMenu`, `IconCheck`, `IconCircle`, `IconPlay`, `IconPause`, `IconSkipForward`, `IconSkipBack`, `IconVolume2`, `IconMusic`, `IconGrid`, `IconList`, `IconArrowLeft`, `IconFilter`, `IconInbox`, `IconFile`, `IconFolder`, `IconImage`, `IconLink`, `IconChevronDown`, `IconType`, `IconClock`, `IconShuffle`, `IconToggleRight`, `IconCode`, `IconHeadphones`, `IconEdit`, `IconTrash`, `IconCopy`, `IconEye`, `IconLock`, `IconGlobe`, `IconCalendar`, `IconMicrophone`, `IconSmile`, `IconPaperclip`, `IconGift`, `IconAtSign`, `IconArrowRight`, `IconArrowUp`, `IconArrowDown`, `IconRefresh`, `IconDownload`, `IconUpload`, `IconExternalLink`, `IconTerminal`

## History

- Sprint 1: Initial implementation

---

### Input (Tier 0)

# Input

## Role

Text input field with size variants, error state, and optional prefix/suffix adornments via InputGroup.

## Tier

0

## Tokens

- `--input-radius` — border radius
- `--input-bg` — background color
- `--input-fg` — text color
- `--input-border` — default border color
- `--input-placeholder` — placeholder text color
- `--input-ring` — focus ring color
- `--input-border-focus` — focus border color
- `--input-border-error` — error state border color

## Constraints

- `error` prop sets `aria-invalid` and applies error border styling
- Size controlled via `SIZE_MAP` (sm | md | lg), default `md`
- Disabled state reduces opacity to 40% and blocks pointer events
- `InputGroup` is a sibling component for prefix/suffix adornments, not a variant
- Prefix/suffix elements are `pointer-events-none` and positioned absolutely

## History

- Sprint 1: Initial implementation

---

### Kbd (Tier 0)

# Kbd

## Role

Renders a keyboard shortcut key in a styled inline badge.

## Tier

0

## Tokens

- `--border-default` — border color
- `--surface-raised` — background color

## Constraints

- Renders as `<kbd>` element with monospace font
- Fixed `text-[10px]` sizing; no size variants
- Includes `shadow-sm` for a subtle raised key appearance
- Text color is `text-fg-muted` for secondary visual weight

## History

- Sprint 1: Initial implementation

---

### Label (Tier 0)

# Label

## Role

Accessible form label built on Radix Label with peer-disabled styling.

## Tier

0

## Tokens

- none (uses semantic utility classes: `text-fg-default`)

## Constraints

- Wraps `@radix-ui/react-label` Root component
- Automatically dims and disables cursor when associated peer input is disabled (`peer-disabled`)
- `text-sm font-medium` fixed typography; no size variants
- Accepts all Radix Label props via `ComponentPropsWithRef`

## History

- Sprint 1: Initial implementation

---

### Pagination (Tier 2)

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

---

### ProgressBar (Tier 0)

# ProgressBar

## Role

Displays a horizontal bar indicating progress toward completion.

## Tier

0

## Tokens

- `--progress-track`
- `--progress-bar`

## Constraints

- Built on `@radix-ui/react-progress`
- Value is clamped to 0-100% internally
- Indicator uses `translateX` transform for smooth animation (300ms)
- `size` prop controls track height (`sm` = h-1.5, `md` = h-2)

## History

- Sprint 1: Initial implementation

---

### RadioGroup (Tier 0)

# RadioGroup

## Role

Compound radio button group for single-option selection.

## Tier

0

## Tokens

- `--checkbox-border`
- `--checkbox-border-checked`
- `--checkbox-bg-checked`
- `--border-interactive`

## Constraints

- Built on `@radix-ui/react-radio-group`
- Shares `--checkbox-*` token group with Checkbox for visual consistency
- Root lays out items in a vertical flex column with `gap-2`
- Items are 16x16px circles; checked indicator is 8x8px filled dot
- Supports `disabled` state with `opacity-40` and `pointer-events-none`

## History

- Sprint 1: Initial implementation

---

### ScrollArea (Tier 2)

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

---

### Select (Tier 2)

# Select

## Role

Compound dropdown select for choosing a single value from a list.

## Tier

2

## Tokens

- `--select-radius`
- `--select-border`
- `--select-bg`
- `--select-fg`
- `--select-placeholder`
- `--select-border-focus`
- `--select-content-bg`
- `--select-item-hover`

## Constraints

- Built on `@radix-ui/react-select`
- Content renders through a Portal
- Default position is `popper`
- Content has enter/exit fade animations
- Trigger height is h-9 with chevron icon
- Item indicator uses inline SVG checkmark
- Supports `disabled` state with `opacity-40`

## Composition

- `SelectRoot` → Radix root (re-export)
- `SelectValue` → Selected value display (re-export)
- `SelectGroup` → Option grouping (re-export)
- `SelectTrigger` → Button that opens the dropdown
- `SelectContent` → Portal-based dropdown panel
- `SelectItem` → Individual option with checkmark indicator
- `SelectLabel` → Group label inside dropdown
- `SelectSeparator` → Horizontal divider between groups

## History

- Sprint 1: Initial implementation

---

### Separator (Tier 0)

# Separator

## Role

Visual divider between content sections, horizontal or vertical.

## Tier

0

## Tokens

- `--border-subtle`

## Constraints

- Built on `@radix-ui/react-separator`
- Defaults to `horizontal` orientation and `decorative` mode
- Horizontal renders as 1px height, full width; vertical as 1px width, full height
- `decorative` defaults to `true` (no semantic role)

## History

- Sprint 1: Initial implementation

---

### Slider (Tier 0)

# Slider

## Role

Range input for selecting numeric values along a track.

## Tier

0

## Tokens

- `--slider-track`
- `--slider-range`
- `--slider-thumb`
- `--border-interactive`

## Constraints

- Built on `@radix-ui/react-slider`
- Supports multiple thumbs via `value` / `defaultValue` arrays
- Track height is 4px, thumb is 16x16px circle
- Thumb has 2px border matching range color
- Supports `disabled` state with `opacity-40` and `pointer-events-none`

## History

- Sprint 1: Initial implementation

---

### Spinner (Tier 0)

# Spinner

## Role

Animated loading indicator using an SVG spinner.

## Tier

0

## Tokens

- none

## Constraints

- Pure SVG with `animate-spin` Tailwind animation
- Uses `currentColor` for color inheritance from parent
- Has `role="status"` and `aria-label="Loading"` for accessibility
- Size prop: `sm` (14px), `md` (20px), `lg` (32px)

## History

- Sprint 1: Initial implementation

---

### StatusDot (Tier 1)

# StatusDot

## Role

Small colored circle indicating presence or availability status.

## Tier

1

## Tokens

- none (uses hardcoded Tailwind color utilities per status)

## Constraints

- Has `role="status"` and `aria-label` set to the status name
- Status colors are hardcoded: green-500, yellow-500, red-500, gray-500
- Size prop: `sm` (8px), `md` (10px), `lg` (12px)
- `status` prop is required

## Variants

| variant | purpose                    |
| ------- | -------------------------- |
| online  | Green dot — user is active |
| idle    | Yellow dot — user is away  |
| dnd     | Red dot — do not disturb   |
| offline | Gray dot — user is offline |

## History

- Sprint 1: Initial implementation

---

### Switch (Tier 0)

# Switch

## Role

Toggle switch for binary on/off states.

## Tier

0

## Tokens

- `--switch-bg`
- `--switch-bg-checked`
- `--switch-thumb`
- `--border-interactive`

## Constraints

- Built on `@radix-ui/react-switch`
- Size prop: `sm` (28x16px, 12px thumb), `md` (36x20px, 16px thumb)
- Thumb translates on check (sm: 12px, md: 16px)
- Transition duration is 150ms for both color and transform
- Supports `disabled` state with `opacity-40`

## History

- Sprint 1: Initial implementation

---

### Table (Tier 2)

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

---

### Text (Tier 1)

# Text

## Role

Polymorphic typography component for rendering text with consistent size, weight, and color.

## Tier

1

## Tokens

- none (uses semantic Tailwind classes: `text-fg-default`, `text-fg-muted`, `text-fg-subtle`, `text-interactive`, `text-danger`, `text-success`, `bg-surface-inset`)

## Constraints

- Polymorphic `as` prop supports: `h1`, `h2`, `h3`, `h4`, `p`, `span`, `label`, `code`
- Default element is `<p>`
- Size auto-resolves from element type when not explicitly set (e.g. `h1` = `3xl`, `p` = `base`)
- `code` element adds monospace font and inset background automatically
- Color defaults to `default` (fg-default)

## Variants

| variant                                                              | purpose             |
| -------------------------------------------------------------------- | ------------------- |
| **size**: xs / sm / base / lg / xl / 2xl / 3xl                       | Font size scale     |
| **weight**: normal / medium / semibold / bold                        | Font weight         |
| **color**: default / muted / subtle / interactive / danger / success | Semantic text color |

## History

- Sprint 1: Initial implementation

---

### Textarea (Tier 0)

# Textarea

## Role

Multi-line text input field with size and error variants.

## Tier

0

## Tokens

- `--input-radius`
- `--input-bg`
- `--input-fg`
- `--input-border`
- `--input-placeholder`
- `--input-ring`
- `--input-border-focus`
- `--input-border-error`

## Constraints

- Shares `--input-*` token group with Input for visual consistency
- Size prop: `sm` (xs text), `md` (sm text), `lg` (base text)
- `error` prop adds error border and sets `aria-invalid`
- Minimum height is 80px
- Vertically resizable (`resize-y`)
- Supports `disabled` state with `opacity-40`

## History

- Sprint 1: Initial implementation

---

### ToggleGroup (Tier 2)

# ToggleGroup

## Role

Compound toggle button group for selecting one or multiple options.

## Tier

2

## Tokens

- `--toggle-bg`
- `--toggle-active-bg`
- `--toggle-active-fg`
- `--toggle-border`
- `--toggle-radius`
- `--border-interactive`

## Constraints

- Built on `@radix-ui/react-toggle` (single) and `@radix-ui/react-toggle-group` (group)
- `Toggle` is the standalone single-toggle component
- `ToggleGroupRoot` supports both `single` and `multiple` selection modes
- All items share the same `variant` and `size` API
- Supports `disabled` state with `opacity-40`

## Variants

| variant | purpose                               |
| ------- | ------------------------------------- |
| default | Background-only toggle without border |
| outline | Toggle with visible border            |

## Composition

- `Toggle` → Standalone single toggle button
- `ToggleGroupRoot` → Radix group root with flex row layout
- `ToggleGroupItem` → Individual toggle item within the group

## History

- Sprint 1: Initial implementation

---

### Toolbar (Tier 2)

# Toolbar

## Role

Compound horizontal toolbar for grouping actions and toggles.

## Tier

2

## Tokens

- `--menu-border`
- `--menu-bg`
- `--menu-item-fg`
- `--menu-item-hover`
- `--toggle-active-bg`
- `--toggle-active-fg`
- `--border-subtle`
- `--border-interactive`

## Constraints

- Built on `@radix-ui/react-toolbar`
- Root has border, background, and padding (`p-1`)
- Shares `--menu-*` tokens with menu components for visual consistency
- Toggle items reuse `--toggle-*` tokens for on-state styling
- All interactive items support `disabled` state with `opacity-40`

## Composition

- `ToolbarRoot` → Container with border and background
- `ToolbarButton` → Standard action button
- `ToolbarSeparator` → 1px vertical divider between groups
- `ToolbarToggleGroup` → Group of mutually exclusive toggle items
- `ToolbarToggleItem` → Individual toggle option with on/off state
- `ToolbarLink` → Navigation link styled as toolbar item

## History

- Sprint 1: Initial implementation

---

### Truncate (Tier 0)

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

---

### VisuallyHidden (Tier 0)

# VisuallyHidden

## Role

Hides content visually while keeping it accessible to screen readers.

## Tier

0

## Tokens

- none

## Constraints

- Uses standard screen-reader-only CSS technique (1px clip rect, absolute position)
- Renders as `<span>` element
- Forwards ref and spreads all additional props
- Must not be used for decorative/non-semantic content

## History

- Sprint 1: Initial implementation

---

## Layout

### AppShell (Tier 0)

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

---

### Container (Tier 0)

# Container

## Role

Centered, max-width-constrained content wrapper with horizontal padding.

## Tier

0

## Tokens

- none

## Constraints

- `size` prop controls max-width: `sm` (640px), `md` (768px), `lg` (1024px, default), `xl` (1280px), `full` (none)
- Always horizontally centered (`mx-auto`) with `px-4` inline padding
- Does not impose vertical constraints; height is content-driven

## History

- Sprint 1: Initial implementation

---

### Sidebar (Tier 2)

# Sidebar

## Role

Collapsible vertical navigation panel with grouped sections and interactive items.

## Tier

2

## Tokens

- `--sidebar-width` — default expanded width
- `--sidebar-width-collapsed` — collapsed width (fallback `0px`)
- `--sidebar-bg` — background color
- `--sidebar-border` — right border color
- `--sidebar-item-active-bg` — active item background
- `--sidebar-item-active-fg` — active item foreground
- `--sidebar-item-hover` — item hover background
- `--fg-muted` — muted foreground for inactive items and section titles
- `--fg-default` — default foreground on hover

## Constraints

- Width transitions via CSS `transition-[width]`; collapsed state hides overflow
- `width` prop accepts any CSS value; defaults to `var(--sidebar-width)`
- SidebarItem renders as `<button>` for accessibility; always keyboard-reachable
- Labels truncate via `truncate` class; badges auto-align to the right

## Composition

- `SidebarSection` — groups items under an uppercase label
- `SidebarItem` — individual navigation entry with icon, label, active state, and optional badge

## History

- Sprint 1: Initial implementation

---

### Stack (Tier 0)

# Stack

## Role

Flexbox layout primitive for arranging children in a row or column with controlled spacing and alignment.

## Tier

0

## Tokens

- none

## Constraints

- `direction`: `row` | `col` (default `col`)
- `gap`: `0` | `1` | `2` | `3` | `4` (default) | `5` | `6` | `8` — maps to Tailwind gap utilities
- `align`: `start` | `center` | `end` | `stretch` (default) | `baseline`
- `justify`: `start` (default) | `center` | `end` | `between`
- Extends `ComponentPropsWithoutRef<'div'>` — all native div props forwarded
- `wrap` prop enables `flex-wrap`

## History

- Sprint 1: Initial implementation

---

### TopBar (Tier 0)

# TopBar

## Role

Fixed-height horizontal header bar for application-level navigation and actions.

## Tier

0

## Tokens

- `--topbar-height` — fixed height of the bar
- `--topbar-border` — bottom border color
- `--topbar-bg` — background color

## Constraints

- Renders as `<header>` for semantic HTML
- Height is token-driven via `h-[--topbar-height]`; `shrink-0` prevents flex compression
- Children are flex-aligned horizontally with `gap-3` and `px-4` padding

## History

- Sprint 1: Initial implementation

---

## Disclosure

### Accordion (Tier 2)

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

---

### AlertDialog (Tier 2)

# AlertDialog

## Role

Modal confirmation dialog for destructive or irreversible actions, with required user acknowledgment.

## Tier

2

## Tokens

- `--overlay-bg` — overlay backdrop color
- `--dialog-radius` — content border radius
- `--dialog-bg` — content background
- `--dialog-border` — content border color
- `--dialog-shadow` — content box shadow
- `--btn-radius` — action/cancel button border radius
- `--btn-danger-bg` — destructive action background
- `--btn-danger-fg` — destructive action foreground
- `--btn-danger-bg-hover` — destructive action hover background
- `--btn-outline-border` — cancel button border
- `--btn-ghost-bg-hover` — cancel button hover background
- `--border-interactive` — focus ring color

## Constraints

- Always renders via Portal; overlay covers entire viewport at `z-50`
- Content is centered (`left-1/2 top-1/2 -translate`) with `max-w-md`
- Action button uses danger styling by default; Cancel uses ghost/outline styling
- Open/close transitions: fade + zoom (95% scale)

## Composition

- `AlertDialogRoot` — Radix Root pass-through; controls open state
- `AlertDialogTrigger` — Radix Trigger pass-through
- `AlertDialogContent` — portal + overlay + centered content panel
- `AlertDialogTitle` — semibold heading
- `AlertDialogDescription` — muted description text

## History

- Sprint 1: Initial implementation

---

### Collapsible (Tier 0)

# Collapsible

## Role

Simple show/hide toggle container powered by Radix Collapsible primitive.

## Tier

0

## Tokens

- none

## Constraints

- Root and Trigger are direct Radix pass-throughs
- Content animates with slide + fade: `slide-in-from-top-1` / `slide-out-to-top-1`
- Overflow hidden during animation to prevent layout shift
- No opinion on trigger styling; consumer provides their own trigger element

## History

- Sprint 1: Initial implementation

---

### ContextMenu (Tier 2)

# ContextMenu

## Role

Right-click context menu with items, labels, and separators, using shared menu token system.

## Tier

2

## Tokens

- `--menu-radius` — content border radius
- `--menu-bg` — content background
- `--menu-border` — content border color
- `--menu-shadow` — content box shadow
- `--menu-item-fg` — item text color
- `--menu-item-hover` — item hover/focus background
- `--border-subtle` — separator color

## Constraints

- Renders via Portal; positioned at `z-50` with min-width `180px`
- Slide-in direction is context-aware based on `data-[side=*]`
- Items support optional `icon` (16px) and `shortcut` (right-aligned)
- Separator is a 1px horizontal rule using `--border-subtle`

## Composition

- `ContextMenuRoot` — Radix Root pass-through
- `ContextMenuTrigger` — Radix Trigger pass-through; wraps the right-click target
- `ContextMenuContent` — portal + animated menu panel
- `ContextMenuItem` — interactive row with icon and shortcut support

## History

- Sprint 1: Initial implementation

---

### Dialog (Tier 2)

# Dialog

## Role

General-purpose modal dialog with structured header, body, and footer sections.

## Tier

2

## Tokens

- `--overlay-bg` — overlay backdrop color
- `--dialog-radius` — content border radius
- `--dialog-bg` — content background
- `--dialog-border` — content border color
- `--dialog-shadow` — content box shadow
- `--border-subtle` — header/footer separator borders

## Constraints

- Always renders via Portal; overlay covers entire viewport at `z-50`
- Content is centered with `max-w-lg` and `p-0`; sections handle their own padding
- Open/close transitions: fade + zoom (95% scale)
- Close is a Radix pass-through; consumer places close buttons manually
- Header and Footer have border separators; Body has no borders

## Composition

- `DialogRoot` — Radix Root pass-through; controls open state
- `DialogTrigger` — Radix Trigger pass-through
- `DialogClose` — Radix Close pass-through
- `DialogContent` — portal + overlay + centered content panel
- `DialogHeader` — top section with bottom border
- `DialogBody` — scrollable middle section

## History

- Sprint 1: Initial implementation

---

### DropdownMenu (Tier 2)

# DropdownMenu

## Role

Click-triggered dropdown menu with items, labels, and separators, using shared menu token system.

## Tier

2

## Tokens

- `--menu-radius` — content border radius
- `--menu-bg` — content background
- `--menu-border` — content border color
- `--menu-shadow` — content box shadow
- `--menu-item-fg` — item text color
- `--menu-item-hover` — item hover/focus background
- `--border-subtle` — separator color

## Constraints

- Renders via Portal with `sideOffset={4}`; positioned at `z-50` with min-width `180px`
- Slide-in direction is context-aware based on `data-[side=*]`
- Items support optional `icon` (16px) and `shortcut` (right-aligned)
- Shares identical token contract with ContextMenu and Menubar

## Composition

- `DropdownMenuRoot` — Radix Root pass-through
- `DropdownMenuTrigger` — Radix Trigger pass-through
- `DropdownMenuContent` — portal + animated menu panel
- `DropdownMenuItem` — interactive row with icon and shortcut support

## History

- Sprint 1: Initial implementation

---

### HoverCard (Tier 0)

# HoverCard

## Role

Hover-triggered floating card for previewing content without clicking.

## Tier

0

## Tokens

- `--menu-radius` — content border radius
- `--menu-bg` — content background
- `--menu-border` — content border color
- `--menu-shadow` — content box shadow

## Constraints

- Renders via Portal with `sideOffset={4}`; min-width `220px`, padding `p-4`
- Uses shared `--menu-*` tokens for visual consistency with other floating surfaces
- Slide-in direction is context-aware based on `data-[side=*]`
- Root and Trigger are direct Radix pass-throughs; no custom styling

## History

- Sprint 1: Initial implementation

---

### Menubar (Tier 2)

# Menubar

## Role

Horizontal menu bar with multiple dropdown menus, suitable for application-level menus.

## Tier

2

## Tokens

- `--menu-radius` — content and root border radius
- `--menu-bg` — root and dropdown background
- `--menu-border` — root and dropdown border color
- `--menu-shadow` — dropdown box shadow
- `--menu-item-fg` — trigger and item text color
- `--menu-item-hover` — trigger and item hover/focus background
- `--border-subtle` — separator color

## Constraints

- Root renders as a bordered horizontal bar with `gap-1` and `p-1`
- Content renders via Portal with `sideOffset={4}` and `align="start"`
- Items support optional `icon` (16px) and `shortcut` (right-aligned)
- Shares identical item/separator/label token contract with DropdownMenu and ContextMenu

## Composition

- `MenubarRoot` — styled horizontal container wrapping all menus
- `MenubarMenu` — Radix Menu pass-through; groups trigger + content
- `MenubarTrigger` — clickable top-level menu label
- `MenubarContent` — portal + animated dropdown panel
- `MenubarItem` — interactive row with icon and shortcut support
- `MenubarSeparator` — horizontal divider within a dropdown

## History

- Sprint 1: Initial implementation

---

### NavigationMenu (Tier 2)

# NavigationMenu

## Role

Site-level navigation with trigger-activated content panels and link items.

## Tier

2

## Tokens

- `--menu-radius` — content and viewport border radius
- `--menu-bg` — content and viewport background
- `--menu-border` — content and viewport border color
- `--menu-shadow` — content and viewport box shadow
- `--menu-item-fg` — link text color
- `--menu-item-hover` — trigger and link hover background

## Constraints

- Root positions as `relative z-10` flex container
- Content is absolutely positioned (`top-full left-0 w-max`); animates with fade + slide-from-top
- Trigger includes an inline chevron SVG that rotates on `data-[state=open]`
- Viewport is an optional floating container for aggregated content display
- List renders as `list-none` flex row with `gap-1`

## Composition

- `NavigationMenuRoot` — styled flex container
- `NavigationMenuList` — horizontal list of navigation items
- `NavigationMenuItem` — Radix Item pass-through
- `NavigationMenuTrigger` — clickable label with chevron indicator
- `NavigationMenuContent` — absolutely positioned dropdown panel
- `NavigationMenuLink` — styled anchor for direct navigation

## History

- Sprint 1: Initial implementation

---

### Popover (Tier 0)

# Popover

## Role

Click-triggered floating panel for forms, filters, or supplementary content.

## Tier

0

## Tokens

- `--menu-radius` — content border radius
- `--menu-bg` — content background
- `--menu-border` — content border color
- `--menu-shadow` — content box shadow
- `--border-interactive` — close button focus ring color

## Constraints

- Renders via Portal with `sideOffset={4}`; fixed width `w-72`, padding `p-4`
- Uses shared `--menu-*` tokens for visual consistency with other floating surfaces
- Slide-in direction is context-aware based on `data-[side=*]`
- PopoverClose positions at `absolute right-2 top-2`; includes a default X icon SVG
- Root and Trigger are direct Radix pass-throughs

## History

- Sprint 1: Initial implementation

---

### Sheet (Tier 2)

# Sheet

## Role

Slide-out panel (drawer) anchored to any viewport edge, built on Radix Dialog.

## Tier

2

## Tokens

- `--overlay-bg` — overlay backdrop color
- `--dialog-bg` — panel background
- `--dialog-border` — panel border color
- `--dialog-shadow` — panel box shadow
- `--input-ring` — close button focus ring color
- `--border-subtle` — header/footer separator borders

## Constraints

- `side` prop controls anchor edge: `left` | `right` (default) | `top` | `bottom`
- Horizontal sides constrain to `max-w-sm`; vertical sides to `max-h-[50vh]`
- Built-in close button (IconX) at `absolute right-4 top-4`; always present
- Open/close transitions: fade + directional slide matching the chosen side
- Header and Footer have border separators; Body is unstyled flex-1

## Composition

- `SheetRoot` — Radix Dialog Root pass-through
- `SheetTrigger` — Radix Dialog Trigger pass-through
- `SheetClose` — Radix Dialog Close pass-through
- `SheetContent` — portal + overlay + side-anchored panel with close button
- `SheetHeader` — top section with bottom border
- `SheetBody` — flexible middle section

## History

- Sprint 1: Initial implementation

---

### Tabs (Tier 2)

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

---

### Tooltip (Tier 2)

# Tooltip

## Role

Hover-triggered informational label that appears near the target element.

## Tier

2

## Tokens

- `--tooltip-radius` — content border radius
- `--tooltip-bg` — content background
- `--tooltip-fg` — content text color

## Constraints

- TooltipProvider wraps all tooltips with `delayDuration={200}`; must be placed at app root
- Content renders with `sideOffset={6}` and `z-50`
- Transitions: fade + zoom (95% scale) on delayed-open/closed
- SimpleTooltip is a convenience wrapper combining Root + Trigger + Content for string-only tooltips
- `side` prop on SimpleTooltip controls placement: `top` | `bottom` | `left` | `right`

## Composition

- `TooltipProvider` — global provider with delay configuration
- `TooltipRoot` — Radix Root pass-through
- `TooltipTrigger` — Radix Trigger pass-through

## History

- Sprint 1: Initial implementation

---

## Feedback

### Alert (Tier 0)

# Alert

## Role

Inline status message with variant-driven severity and optional dismiss action.

## Tier

0

## Tokens

- `--alert-radius` — border radius of the alert container
- `--border-interactive` — border color for `info` variant
- `--color-success` / `--color-success-subtle` — border/bg for `success` variant
- `--color-warning` / `--color-warning-subtle` — border/bg for `warning` variant
- `--color-danger` / `--color-danger-subtle` — border/bg for `danger` variant
- `--color-interactive-subtle` — bg for `info` variant

## Constraints

- Must render `role="alert"` on the root element
- Variants: `info` (default), `success`, `warning`, `danger`
- Dismiss button only renders when `onDismiss` is provided
- Uses `border-l-4` accent pattern — do not change to full border
- Forward ref via React 19 prop destructuring

## History

- Sprint 1: Initial implementation

---

### Callout (Tier 0)

# Callout

## Role

Contextual highlight block with optional icon, title, and body content.

## Tier

0

## Tokens

- none (uses Tailwind color utilities directly: `blue-500`, `green-500`, `yellow-500`, `red-500` with opacity modifiers)

## Constraints

- Variants: `info` (default), `success`, `warning`, `danger`
- Icon slot is optional; renders with variant-colored text when present
- Uses full-border style (distinct from Alert's left-border accent)
- No ARIA role — presentational emphasis only, not a live region
- Colors are hardcoded Tailwind utilities; migrate to semantic tokens when available

## History

- Sprint 1: Initial implementation

---

### EmptyState (Tier 0)

# EmptyState

## Role

Centered placeholder for empty data views with icon, message, and call-to-action slot.

## Tier

0

## Tokens

- none (uses semantic Tailwind classes: `text-fg-muted`, `text-fg-default`)

## Constraints

- `title` is required; all other props are optional
- Icon container constrains child SVGs to 48x48 via `[&>svg]` selector
- Description max-width capped at `max-w-sm` for readability
- Action slot accepts arbitrary ReactNode (typically a Button)
- Always vertically/horizontally centered with `py-12`

## History

- Sprint 1: Initial implementation

---

### Skeleton (Tier 0)

# Skeleton

## Role

Animated loading placeholder with shape variants for content shimmer effects.

## Tier

0

## Tokens

- `--skeleton-bg` — background color of the skeleton element

## Constraints

- Variants: `text` (default, full-width h-4), `circle` (round), `rect` (rounded-md)
- Uses `animate-pulse` for shimmer animation
- Renders `aria-hidden="true"` — must never contain accessible content
- `width` and `height` applied via inline `style` for dynamic sizing

## History

- Sprint 1: Initial implementation

---

### Toast (Tier 2)

# Toast

## Role

Transient notification system built on Radix Toast primitive with timed auto-dismiss.

## Tier

2

## Tokens

- `--toast-bg` — background color of the toast surface
- `--toast-border` — border color
- `--toast-radius` — border radius
- `--toast-shadow` — box shadow elevation

## Constraints

- Must wrap in `ToastProvider` at app root for context
- `ToastViewport` fixed to bottom-right (`bottom-4 right-4 z-50`)
- Uses Radix `data-[state=open|closed]` for opacity transitions
- Close button positioned absolute (`right-2 top-2`)
- Namespace export pattern: `Toast.Provider`, `Toast.Root`, etc. via barrel `index.ts`
- All 7 sub-components also available as named exports

## Composition

- `ToastProvider` → Radix context provider pass-through
- `ToastViewport` → Fixed-position container for toast stack
- `ToastRoot` → Individual toast surface with token-driven styling
- `ToastTitle` → Semibold heading text
- `ToastDescription` → Muted body text
- `ToastAction` → Inline action button with border style
- `ToastClose` → Absolute-positioned dismiss button with X icon

## History

- Sprint 1: Initial implementation

---

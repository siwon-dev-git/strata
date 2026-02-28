/* ═══════════════════════════════════════════════════════════════
   Demo Page Schema
   Typed metadata for each demo — drives the App.tsx registry,
   component coverage reports, and llms.md generation.
   ═══════════════════════════════════════════════════════════════ */

import type { ComponentType } from 'react';

/* ── Layout patterns ──────────────────────────────────────────── */

export type LayoutPattern =
  | 'sidebar-main' // 2-column: sidebar + main content
  | 'sidebar-detail' // sidebar + list + detail panel
  | 'three-column' // left nav + center + right widget
  | 'kanban' // horizontal scrolling columns
  | 'mobile-frame' // constrained mobile viewport
  | 'fixed-footer' // main content + fixed bottom bar
  | 'showcase'; // single-column reference page

/* ── Component catalog ────────────────────────────────────────── */

/** All registered Strata components by category. */
export const COMPONENT_CATALOG = {
  primitives: [
    'Avatar',
    'AvatarGroup',
    'Badge',
    'Breadcrumb',
    'Button',
    'Card',
    'Checkbox',
    'Code',
    'DataList',
    'Divider',
    'FormField',
    'Heading',
    'Input',
    'Kbd',
    'Label',
    'Pagination',
    'ProgressBar',
    'RadioGroup',
    'ScrollArea',
    'Select',
    'Separator',
    'Slider',
    'Spinner',
    'StatusDot',
    'Switch',
    'Table',
    'Text',
    'Textarea',
    'Toggle',
    'ToggleGroup',
    'Toolbar',
    'Truncate',
    'VisuallyHidden',
  ],
  layout: ['AppShell', 'Container', 'Sidebar', 'Stack', 'TopBar'],
  disclosure: [
    'Accordion',
    'AlertDialog',
    'Collapsible',
    'ContextMenu',
    'Dialog',
    'DropdownMenu',
    'HoverCard',
    'Menubar',
    'NavigationMenu',
    'Popover',
    'Sheet',
    'Tabs',
    'Tooltip',
  ],
  feedback: ['Alert', 'Callout', 'EmptyState', 'Skeleton', 'Toast'],
} as const;

export type ComponentCategory = keyof typeof COMPONENT_CATALOG;
export type PrimitiveName = (typeof COMPONENT_CATALOG.primitives)[number];
export type LayoutName = (typeof COMPONENT_CATALOG.layout)[number];
export type DisclosureName = (typeof COMPONENT_CATALOG.disclosure)[number];
export type FeedbackName = (typeof COMPONENT_CATALOG.feedback)[number];

/* ── Demo identifiers ────────────────────────────────────────── */

/** All registered demo IDs. Add new entries here when creating demos. */
export const DEMO_IDS = [
  'linear',
  'slack',
  'twitter',
  'notion',
  'spotify',
  'github',
  'discord',
  'figma',
  'vscode',
  'trello',
  'whatsapp',
  'reddit',
  'showcase',
  'character-chat',
] as const;

export type DemoId = (typeof DEMO_IDS)[number];

/* ── Demo schema ──────────────────────────────────────────────── */

export interface DemoComponentMap {
  primitives: PrimitiveName[];
  layout: LayoutName[];
  disclosure: DisclosureName[];
  feedback: FeedbackName[];
}

export interface DemoSchema {
  /** Unique identifier (kebab-case). Must match a value in DEMO_IDS. */
  id: DemoId;
  /** Display label. */
  label: string;
  /** One-line description of what the demo recreates. */
  description: string;
  /** The React component to render. */
  component: ComponentType;
  /** Strata components used in this demo. */
  components: DemoComponentMap;
  /** Layout pattern. */
  layout: LayoutPattern;
  /** Features demonstrated. */
  features: {
    /** Has interactive local state. */
    interactivity: boolean;
    /** Uses density-responsive tokens. */
    density: boolean;
  };
}

/* ── Coverage helpers ─────────────────────────────────────────── */

export interface CoverageReport {
  /** Total unique components across all demos. */
  covered: string[];
  /** Components that exist but have no demo coverage. */
  uncovered: string[];
  /** Coverage percentage. */
  percentage: number;
}

/** Compute coverage report from a list of demo schemas. */
export function computeCoverage(demos: DemoSchema[]): CoverageReport {
  const allComponents = [
    ...COMPONENT_CATALOG.primitives,
    ...COMPONENT_CATALOG.layout,
    ...COMPONENT_CATALOG.disclosure,
    ...COMPONENT_CATALOG.feedback,
  ];

  const usedSet = new Set<string>();
  for (const demo of demos) {
    for (const name of demo.components.primitives) usedSet.add(name);
    for (const name of demo.components.layout) usedSet.add(name);
    for (const name of demo.components.disclosure) usedSet.add(name);
    for (const name of demo.components.feedback) usedSet.add(name);
  }

  const covered = allComponents.filter((c) => usedSet.has(c));
  const uncovered = allComponents.filter((c) => !usedSet.has(c));
  const percentage = Math.round((covered.length / allComponents.length) * 100);

  return { covered, uncovered, percentage };
}

/**
 * Assembly MCP — Tool definitions for AI agent component assembly.
 *
 * Layer 3 of the 4-tier AI consumption strategy:
 *   L1: llms.md (discovery)
 *   L2: Storybook MCP (exploration)
 *   L3: Assembly MCP (assembly) ← this module
 *   L4: tokens.json (integration)
 *
 * Exposes 5 tools: recommend, component, assemble, tokens, demo.
 */

/* ── Tool schemas ─────────────────────────────────────────────── */

export interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    name: 'strata/recommend',
    description:
      'Recommend Strata components for a given task. Returns ranked list with confidence scores.',
    inputSchema: {
      type: 'object',
      properties: {
        task: {
          type: 'string',
          description:
            'Natural language description of the UI task (e.g., "user settings page with sidebar navigation")',
        },
        constraints: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Optional constraints (e.g., ["no dialogs", "mobile-first"])',
        },
      },
      required: ['task'],
    },
  },
  {
    name: 'strata/component',
    description:
      'Get detailed info for a single Strata component: props, tokens, a11y attributes, and usage examples.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Component name (e.g., "Button", "Dialog", "Sidebar")',
        },
      },
      required: ['name'],
    },
  },
  {
    name: 'strata/assemble',
    description:
      'Assemble a page from natural language description. Returns JSX code using Strata components.',
    inputSchema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description: 'Natural language page description',
        },
        layout: {
          type: 'string',
          enum: [
            'sidebar-main',
            'topbar-main',
            'sidebar-topbar-main',
            'centered',
            'dashboard',
            'list-detail',
            'full-bleed',
          ],
          description: 'Preferred layout pattern',
        },
        intent: {
          type: 'string',
          description: 'Mood/intent preset (e.g., "professional", "playful")',
        },
      },
      required: ['description'],
    },
  },
  {
    name: 'strata/tokens',
    description:
      'Query design tokens by category or name. Returns token values and their layer chain.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Token search query (e.g., "blue", "surface", "motion")',
        },
        layer: {
          type: 'string',
          enum: ['primitive', 'semantic', 'component'],
          description: 'Filter by token layer',
        },
      },
      required: ['query'],
    },
  },
  {
    name: 'strata/demo',
    description:
      'Get reference code from Strata demo applications. 13 real-world app clones available.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description:
            'Demo name (e.g., "github", "slack", "linear", "discord", "spotify")',
        },
      },
      required: ['name'],
    },
  },
];

/* ── Component registry ───────────────────────────────────────── */

export interface ComponentInfo {
  name: string;
  category: 'primitives' | 'layout' | 'disclosure' | 'feedback';
  description: string;
  props: string[];
  tokens: string[];
  a11y: string[];
  interactive: boolean;
}

const COMPONENT_REGISTRY: ComponentInfo[] = [
  // Layout
  {
    name: 'AppShell',
    category: 'layout',
    description: 'Root layout container with flex structure',
    props: ['className', 'children'],
    tokens: [],
    a11y: ['role="main" on content area'],
    interactive: false,
  },
  {
    name: 'Sidebar',
    category: 'layout',
    description: 'Collapsible navigation sidebar',
    props: ['collapsed', 'width', 'className', 'children'],
    tokens: [
      '--sidebar-width',
      '--sidebar-bg',
      '--sidebar-border',
      '--sidebar-item-hover',
      '--sidebar-item-active-bg',
      '--sidebar-item-active-fg',
    ],
    a11y: ['aside landmark'],
    interactive: true,
  },
  {
    name: 'TopBar',
    category: 'layout',
    description: 'Top navigation bar with banner role',
    props: ['className', 'children'],
    tokens: ['--topbar-bg', '--topbar-border', '--topbar-height'],
    a11y: ['role="banner"'],
    interactive: false,
  },
  {
    name: 'Container',
    category: 'layout',
    description: 'Max-width centered content container',
    props: ['className', 'children'],
    tokens: [],
    a11y: [],
    interactive: false,
  },
  {
    name: 'Stack',
    category: 'layout',
    description: 'Vertical/horizontal stack with gap',
    props: ['direction', 'gap', 'className', 'children'],
    tokens: [],
    a11y: [],
    interactive: false,
  },

  // Primitives — Interactive
  {
    name: 'Button',
    category: 'primitives',
    description: 'Action button with variants',
    props: [
      'variant',
      'size',
      'disabled',
      'loading',
      'fullWidth',
      'onClick',
      'children',
    ],
    tokens: [
      '--btn-solid-bg',
      '--btn-solid-fg',
      '--btn-ghost-bg-hover',
      '--btn-outline-border',
      '--btn-danger-bg',
      '--btn-radius',
    ],
    a11y: ['role="button"', 'aria-disabled', 'aria-busy'],
    interactive: true,
  },
  {
    name: 'Input',
    category: 'primitives',
    description: 'Text input field',
    props: ['type', 'placeholder', 'disabled', 'error', 'onPressEnter'],
    tokens: [
      '--input-bg',
      '--input-border',
      '--input-focus-border',
      '--input-ring',
      '--input-radius',
    ],
    a11y: ['role="textbox"', 'aria-invalid'],
    interactive: true,
  },
  {
    name: 'Select',
    category: 'primitives',
    description: 'Dropdown select with Radix',
    props: ['defaultValue', 'disabled', 'onValueChange'],
    tokens: ['--select-bg', '--select-border', '--select-radius'],
    a11y: ['role="combobox"', 'aria-expanded'],
    interactive: true,
  },
  {
    name: 'Checkbox',
    category: 'primitives',
    description: 'Checkbox with label support',
    props: ['defaultChecked', 'onCheckedChange', 'disabled'],
    tokens: [
      '--checkbox-bg',
      '--checkbox-border',
      '--checkbox-checked',
      '--checkbox-fg',
      '--checkbox-radius',
    ],
    a11y: ['role="checkbox"', 'aria-checked'],
    interactive: true,
  },
  {
    name: 'Switch',
    category: 'primitives',
    description: 'Toggle switch',
    props: ['defaultChecked', 'onCheckedChange', 'disabled', 'size'],
    tokens: ['--switch-bg', '--switch-thumb', '--switch-checked'],
    a11y: ['role="switch"', 'aria-checked'],
    interactive: true,
  },
  {
    name: 'Slider',
    category: 'primitives',
    description: 'Range slider',
    props: ['defaultValue', 'min', 'max', 'step', 'disabled'],
    tokens: ['--slider-track', '--slider-range', '--slider-thumb'],
    a11y: ['role="slider"', 'aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
    interactive: true,
  },
  {
    name: 'RadioGroup',
    category: 'primitives',
    description: 'Radio button group',
    props: ['defaultValue', 'onValueChange'],
    tokens: ['--checkbox-bg', '--checkbox-border', '--checkbox-checked'],
    a11y: ['role="radiogroup"', 'role="radio"'],
    interactive: true,
  },

  // Primitives — Display
  {
    name: 'Card',
    category: 'primitives',
    description: 'Content card container',
    props: ['variant', 'className', 'children'],
    tokens: ['--card-bg', '--card-bg-hover', '--card-border', '--card-radius'],
    a11y: [],
    interactive: false,
  },
  {
    name: 'Badge',
    category: 'primitives',
    description: 'Status badge label',
    props: ['variant', 'children'],
    tokens: ['--badge-bg', '--badge-fg', '--badge-border'],
    a11y: [],
    interactive: false,
  },
  {
    name: 'Avatar',
    category: 'primitives',
    description: 'User avatar image/fallback',
    props: ['src', 'alt', 'fallback', 'size'],
    tokens: ['--avatar-bg', '--avatar-size'],
    a11y: ['img role with alt'],
    interactive: false,
  },
  {
    name: 'Table',
    category: 'primitives',
    description: 'Data table',
    props: ['children'],
    tokens: ['--table-border', '--table-header-bg', '--table-row-hover'],
    a11y: ['role="table"'],
    interactive: false,
  },
  {
    name: 'Heading',
    category: 'primitives',
    description: 'Semantic heading',
    props: ['level', 'children'],
    tokens: [],
    a11y: ['h1-h6 semantic'],
    interactive: false,
  },
  {
    name: 'Text',
    category: 'primitives',
    description: 'Body text',
    props: ['size', 'color', 'weight', 'children'],
    tokens: [],
    a11y: [],
    interactive: false,
  },
  {
    name: 'FormField',
    category: 'primitives',
    description: 'Label + input wrapper',
    props: ['label', 'error', 'hint', 'children'],
    tokens: [],
    a11y: ['label htmlFor association'],
    interactive: false,
  },
  {
    name: 'Icon',
    category: 'primitives',
    description: '61 SVG icons',
    props: ['size', 'className'],
    tokens: [],
    a11y: ['aria-hidden="true"'],
    interactive: false,
  },
  {
    name: 'Breadcrumb',
    category: 'primitives',
    description: 'Navigation breadcrumb',
    props: ['children'],
    tokens: [],
    a11y: ['role="navigation"', 'aria-label="breadcrumb"'],
    interactive: false,
  },
  {
    name: 'Divider',
    category: 'primitives',
    description: 'Horizontal/vertical divider',
    props: ['orientation', 'className'],
    tokens: [],
    a11y: ['role="separator"'],
    interactive: false,
  },

  // Disclosure
  {
    name: 'Dialog',
    category: 'disclosure',
    description: 'Modal dialog',
    props: ['open', 'onOpenChange', 'children'],
    tokens: [
      '--dialog-bg',
      '--dialog-border',
      '--dialog-radius',
      '--dialog-shadow',
    ],
    a11y: ['role="dialog"', 'aria-modal="true"'],
    interactive: true,
  },
  {
    name: 'Sheet',
    category: 'disclosure',
    description: 'Slide-out panel',
    props: ['side', 'children'],
    tokens: ['--dialog-bg', '--dialog-border'],
    a11y: ['role="dialog"'],
    interactive: true,
  },
  {
    name: 'Accordion',
    category: 'disclosure',
    description: 'Expandable sections',
    props: ['type', 'collapsible', 'children'],
    tokens: [],
    a11y: ['aria-expanded', 'aria-controls'],
    interactive: true,
  },
  {
    name: 'Tabs',
    category: 'disclosure',
    description: 'Tabbed navigation',
    props: ['defaultValue', 'children'],
    tokens: ['--tabs-border', '--tabs-trigger-active'],
    a11y: ['role="tablist"', 'role="tab"', 'role="tabpanel"'],
    interactive: true,
  },
  {
    name: 'DropdownMenu',
    category: 'disclosure',
    description: 'Dropdown action menu',
    props: ['children'],
    tokens: ['--menu-bg', '--menu-border', '--menu-radius', '--menu-shadow'],
    a11y: ['role="menu"', 'role="menuitem"'],
    interactive: true,
  },
  {
    name: 'Tooltip',
    category: 'disclosure',
    description: 'Info tooltip on hover',
    props: ['content', 'children'],
    tokens: ['--tooltip-bg', '--tooltip-fg'],
    a11y: ['role="tooltip"'],
    interactive: true,
  },

  // Feedback
  {
    name: 'Alert',
    category: 'feedback',
    description: 'Inline alert message',
    props: ['variant', 'title', 'onDismiss', 'children'],
    tokens: [],
    a11y: ['role="alert"'],
    interactive: false,
  },
  {
    name: 'Toast',
    category: 'feedback',
    description: 'Notification toast',
    props: ['open', 'title', 'description'],
    tokens: ['--toast-bg', '--toast-border', '--toast-radius'],
    a11y: ['role="status"', 'aria-live="polite"'],
    interactive: true,
  },
  {
    name: 'Skeleton',
    category: 'feedback',
    description: 'Loading skeleton',
    props: ['variant', 'width', 'height'],
    tokens: ['--skeleton-bg', '--skeleton-shine'],
    a11y: ['aria-hidden="true"'],
    interactive: false,
  },
  {
    name: 'Spinner',
    category: 'feedback',
    description: 'Loading spinner',
    props: ['size', 'className'],
    tokens: [],
    a11y: ['role="status"', 'aria-label="Loading"'],
    interactive: false,
  },
  {
    name: 'EmptyState',
    category: 'feedback',
    description: 'Empty content placeholder',
    props: ['icon', 'title', 'description', 'action'],
    tokens: [],
    a11y: [],
    interactive: false,
  },
];

/* ── Demo registry ────────────────────────────────────────────── */

const DEMO_NAMES = [
  'discord',
  'figma',
  'github',
  'linear',
  'notion',
  'reddit',
  'showcase',
  'slack',
  'spotify',
  'trello',
  'twitter',
  'vscode',
  'whatsapp',
] as const;

export type DemoName = (typeof DEMO_NAMES)[number];

/* ── Recommend handler ────────────────────────────────────────── */

const TASK_KEYWORDS: Record<string, string[]> = {
  settings: [
    'Sidebar',
    'Tabs',
    'FormField',
    'Input',
    'Select',
    'Switch',
    'Button',
  ],
  dashboard: ['TopBar', 'Container', 'Card', 'Table', 'Badge', 'Button'],
  auth: ['Container', 'Card', 'Input', 'Button', 'FormField', 'Checkbox'],
  navigation: ['Sidebar', 'TopBar', 'Breadcrumb', 'Tabs', 'NavigationMenu'],
  form: [
    'FormField',
    'Input',
    'Select',
    'Checkbox',
    'RadioGroup',
    'Switch',
    'Button',
  ],
  list: ['Table', 'Card', 'Badge', 'Pagination', 'EmptyState'],
  modal: ['Dialog', 'Button', 'Input', 'FormField'],
  notification: ['Toast', 'Alert', 'Callout'],
  profile: ['Avatar', 'Card', 'Heading', 'Text', 'Badge'],
};

export interface Recommendation {
  name: string;
  category: string;
  confidence: number;
  reason: string;
}

export function recommend(
  task: string,
  constraints: string[] = [],
): Recommendation[] {
  const taskLower = task.toLowerCase();
  const scores = new Map<string, number>();
  const reasons = new Map<string, string>();

  // Keyword matching
  for (const [keyword, components] of Object.entries(TASK_KEYWORDS)) {
    if (taskLower.includes(keyword)) {
      for (const comp of components) {
        scores.set(comp, (scores.get(comp) ?? 0) + 3);
        reasons.set(comp, `Matches "${keyword}" pattern`);
      }
    }
  }

  // Direct component name mentions
  for (const comp of COMPONENT_REGISTRY) {
    if (taskLower.includes(comp.name.toLowerCase())) {
      scores.set(comp.name, (scores.get(comp.name) ?? 0) + 5);
      reasons.set(comp.name, 'Directly mentioned in task');
    }
  }

  // Filter by constraints
  const excluded = new Set<string>();
  for (const constraint of constraints) {
    const lower = constraint.toLowerCase();
    if (lower.startsWith('no ')) {
      const target = lower.slice(3).trim();
      for (const comp of COMPONENT_REGISTRY) {
        if (comp.name.toLowerCase().includes(target)) {
          excluded.add(comp.name);
        }
      }
    }
  }

  return Array.from(scores.entries())
    .filter(([name]) => !excluded.has(name))
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([name, score]) => ({
      name,
      category:
        COMPONENT_REGISTRY.find((c) => c.name === name)?.category ?? 'unknown',
      confidence: Math.min(score / 8, 1),
      reason: reasons.get(name) ?? 'General match',
    }));
}

/* ── Component detail handler ─────────────────────────────────── */

export function getComponentDetail(name: string): ComponentInfo | undefined {
  return COMPONENT_REGISTRY.find(
    (c) => c.name.toLowerCase() === name.toLowerCase(),
  );
}

/* ── Token query handler ──────────────────────────────────────── */

export interface TokenMatch {
  name: string;
  component: string;
  layer: 'component';
}

export function queryTokens(query: string): TokenMatch[] {
  const queryLower = query.toLowerCase();
  const matches: TokenMatch[] = [];

  for (const comp of COMPONENT_REGISTRY) {
    for (const token of comp.tokens) {
      if (token.toLowerCase().includes(queryLower)) {
        matches.push({ name: token, component: comp.name, layer: 'component' });
      }
    }
  }

  return matches;
}

/* ── Demo handler ─────────────────────────────────────────────── */

export function getDemoInfo(
  name: string,
): { name: string; path: string; available: boolean } | undefined {
  const normalized = name.toLowerCase() as DemoName;
  if (!DEMO_NAMES.includes(normalized)) return undefined;

  const capitalized = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  return {
    name: capitalized,
    path: `src/demos/${normalized}/${capitalized}Demo.tsx`,
    available: true,
  };
}

/* ── Exports ──────────────────────────────────────────────────── */

export { COMPONENT_REGISTRY, DEMO_NAMES };

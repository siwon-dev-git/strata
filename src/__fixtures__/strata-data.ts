// Mock data for all service demos

// ── Linear Demo Data ────────────────────────────────────────────
export interface LinearIssue {
  id: string;
  title: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'done' | 'cancelled';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  assignee: { name: string; avatar?: string };
  label: string;
  identifier: string;
  createdAt: string;
  description: string;
}

export const LINEAR_ISSUES: LinearIssue[] = [
  {
    id: '1',
    identifier: 'ENG-127',
    title: 'Add pagination to the issues list API endpoint',
    status: 'in-progress',
    priority: 'high',
    assignee: { name: 'Sarah Kim' },
    label: 'Backend',
    createdAt: '2h ago',
    description:
      'The issues list endpoint currently returns all issues. We need cursor-based pagination with configurable page size.',
  },
  {
    id: '2',
    identifier: 'ENG-126',
    title: 'Fix dark mode contrast in settings page',
    status: 'todo',
    priority: 'medium',
    assignee: { name: 'Alex Chen' },
    label: 'Design',
    createdAt: '4h ago',
    description:
      'Several text elements in the settings page have insufficient contrast ratio in dark mode. Need to update to meet WCAG AA.',
  },
  {
    id: '3',
    identifier: 'ENG-125',
    title: 'Implement WebSocket reconnection logic',
    status: 'in-progress',
    priority: 'urgent',
    assignee: { name: 'Jordan Park' },
    label: 'Infrastructure',
    createdAt: '1d ago',
    description:
      'WebSocket connections drop silently after idle timeout. Implement exponential backoff reconnection with state sync.',
  },
  {
    id: '4',
    identifier: 'ENG-124',
    title: 'Add keyboard shortcuts for issue triage',
    status: 'todo',
    priority: 'medium',
    assignee: { name: 'Emily Liu' },
    label: 'Frontend',
    createdAt: '1d ago',
    description:
      'Add vim-style keyboard navigation: j/k for up/down, x for select, s for status change, p for priority.',
  },
  {
    id: '5',
    identifier: 'ENG-123',
    title: 'Migrate user preferences to new schema',
    status: 'done',
    priority: 'high',
    assignee: { name: 'Sarah Kim' },
    label: 'Backend',
    createdAt: '2d ago',
    description:
      'Migrate from flat JSON to normalized relational schema. Write migration script with rollback support.',
  },
  {
    id: '6',
    identifier: 'ENG-122',
    title: 'Set up error monitoring with Sentry',
    status: 'done',
    priority: 'medium',
    assignee: { name: 'Alex Chen' },
    label: 'Infrastructure',
    createdAt: '3d ago',
    description:
      'Configure Sentry for both client and server. Add source maps, set up alert rules for P0 errors.',
  },
  {
    id: '7',
    identifier: 'ENG-121',
    title: 'Optimize bundle size for initial load',
    status: 'backlog',
    priority: 'low',
    assignee: { name: 'Jordan Park' },
    label: 'Performance',
    createdAt: '5d ago',
    description:
      'Current bundle is 450KB gzipped. Target: under 200KB. Audit deps, add code splitting, lazy-load routes.',
  },
  {
    id: '8',
    identifier: 'ENG-120',
    title: 'Add unit tests for permission service',
    status: 'backlog',
    priority: 'low',
    assignee: { name: 'Emily Liu' },
    label: 'Testing',
    createdAt: '1w ago',
    description:
      'Permission service has 0% coverage. Add tests for role hierarchy, resource scoping, and edge cases.',
  },
];

export const LINEAR_VIEWS = [
  { label: 'My Issues', count: 3 },
  { label: 'All Issues', count: 8 },
  { label: 'Active', count: 2 },
  { label: 'Backlog', count: 2 },
];

// ── Twitter Demo Data ───────────────────────────────────────────
export interface Tweet {
  id: string;
  author: { name: string; handle: string; avatar?: string; verified?: boolean };
  content: string;
  timestamp: string;
  stats: { replies: number; retweets: number; likes: number; views: string };
}

export const TWEETS: Tweet[] = [
  {
    id: '1',
    author: {
      name: 'Dan Abramov',
      handle: '@dan_abramov',
      verified: true,
    },
    content:
      'Hot take: The best design system is the one your team actually uses. Ship the MVP, iterate based on real feedback. Perfection is the enemy of adoption.',
    timestamp: '2h',
    stats: { replies: 42, retweets: 187, likes: 1243, views: '45.2K' },
  },
  {
    id: '2',
    author: {
      name: 'Sara Vieira',
      handle: '@NikkitaFTW',
    },
    content:
      "Just spent 3 hours debugging a CSS issue that turned out to be a missing semicolon. I'm a senior engineer btw.",
    timestamp: '4h',
    stats: { replies: 89, retweets: 342, likes: 2891, views: '120K' },
  },
  {
    id: '3',
    author: {
      name: 'Guillermo Rauch',
      handle: '@raaborern',
      verified: true,
    },
    content:
      'Design tokens are the API contract between design and engineering. Treat them with the same rigor as your REST endpoints.',
    timestamp: '6h',
    stats: { replies: 23, retweets: 156, likes: 892, views: '34.1K' },
  },
  {
    id: '4',
    author: {
      name: 'Cassidy Williams',
      handle: '@cassidoo',
      verified: true,
    },
    content:
      "Accessibility isn't a feature, it's a requirement. If your design system doesn't enforce a11y, you're building exclusion by default.",
    timestamp: '8h',
    stats: { replies: 67, retweets: 445, likes: 3201, views: '89.5K' },
  },
  {
    id: '5',
    author: {
      name: 'Ryan Florence',
      handle: '@ryanflorence',
    },
    content:
      'The compound component pattern is underrated. Context + composition > prop drilling every time.',
    timestamp: '12h',
    stats: { replies: 31, retweets: 98, likes: 567, views: '21.3K' },
  },
];

export const TRENDING_TOPICS = [
  { category: 'Technology', topic: '#ReactConf', posts: '12.4K' },
  { category: 'Design', topic: 'Design Tokens', posts: '8.2K' },
  { category: 'Programming', topic: 'TypeScript 6.0', posts: '24.1K' },
  { category: 'Technology', topic: '#TailwindCSS', posts: '6.8K' },
  { category: 'Design', topic: 'Figma Variables', posts: '3.1K' },
];

export const TWITTER_NAV_ITEMS = [
  { label: 'Home', icon: 'home' as const, active: true },
  { label: 'Explore', icon: 'search' as const },
  { label: 'Notifications', icon: 'bell' as const, badge: 3 },
  { label: 'Messages', icon: 'mail' as const },
  { label: 'Bookmarks', icon: 'bookmark' as const },
  { label: 'Profile', icon: 'user' as const },
];

// ── Slack Demo Data ─────────────────────────────────────────────
export interface SlackWorkspace {
  id: string;
  name: string;
  initial: string;
  color: string; // tailwind bg class like 'bg-interactive' or 'bg-danger'
}

export interface SlackChannel {
  id: string;
  name: string;
  unread?: number;
  isActive?: boolean;
}

export interface SlackMessage {
  id: string;
  author: { name: string; avatar?: string };
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
  thread?: { replyCount: number; lastReplyTime: string };
}

export const SLACK_WORKSPACES: SlackWorkspace[] = [
  { id: 'w1', name: 'Acme Corp', initial: 'A', color: 'bg-interactive' },
  { id: 'w2', name: 'Design Guild', initial: 'D', color: 'bg-success' },
  { id: 'w3', name: 'Open Source', initial: 'O', color: 'bg-warning' },
];

export const SLACK_CHANNELS: SlackChannel[] = [
  { id: 'c1', name: 'general', isActive: true },
  { id: 'c2', name: 'engineering', unread: 5 },
  { id: 'c3', name: 'design-system', unread: 12 },
  { id: 'c4', name: 'random' },
  { id: 'c5', name: 'announcements' },
  { id: 'c6', name: 'help-react' },
  { id: 'c7', name: 'help-typescript' },
];

export const SLACK_DMS = [
  { id: 'd1', name: 'Sarah Kim', online: true },
  { id: 'd2', name: 'Alex Chen', online: true },
  { id: 'd3', name: 'Jordan Park', online: false },
];

export const SLACK_MESSAGES: SlackMessage[] = [
  {
    id: 'm1',
    author: { name: 'Sarah Kim' },
    content:
      'Hey team! I just pushed the new token system. Can everyone pull and check if the dark mode looks right?',
    timestamp: '10:23 AM',
    reactions: [
      { emoji: '\u{1F44D}', count: 4 },
      { emoji: '\u{1F680}', count: 2 },
    ],
    thread: { replyCount: 3, lastReplyTime: '11:05 AM' },
  },
  {
    id: 'm2',
    author: { name: 'Alex Chen' },
    content:
      'Looks great on my end! The OKLch colors are rendering beautifully. One thing \u2014 the contrast ratio on the muted text might be too low for a11y.',
    timestamp: '10:31 AM',
    reactions: [{ emoji: '\u{1F440}', count: 1 }],
  },
  {
    id: 'm3',
    author: { name: 'Jordan Park' },
    content:
      "I ran the a11y audit and we're hitting 4.3:1 on --fg-muted against --surface-base. WCAG AA requires 4.5:1 for body text. We need to bump the luminance by about 0.03.",
    timestamp: '10:45 AM',
    reactions: [
      { emoji: '\u{1F3AF}', count: 3 },
      { emoji: '\u{1F4AF}', count: 1 },
    ],
  },
  {
    id: 'm4',
    author: { name: 'Emily Liu' },
    content:
      "I'll fix the contrast issue. Also, should we add a high-contrast theme as an option? Some users specifically need WCAG AAA (7:1 ratio).",
    timestamp: '10:52 AM',
    thread: { replyCount: 7, lastReplyTime: '12:30 PM' },
  },
  {
    id: 'm5',
    author: { name: 'Sarah Kim' },
    content:
      "@Emily great idea. Let's add it to the Sprint 3 backlog. For now, fixing the AA compliance is priority.",
    timestamp: '11:01 AM',
    reactions: [{ emoji: '\u2705', count: 2 }],
  },
  {
    id: 'm6',
    author: { name: 'Alex Chen' },
    content:
      "BTW, the new Button component's loading state is chef's kiss \u{1F90C} The spinner inheriting currentColor is exactly right.",
    timestamp: '11:15 AM',
    reactions: [
      { emoji: '\u{1F90C}', count: 5 },
      { emoji: '\u2764\uFE0F', count: 3 },
    ],
  },
  {
    id: 'm7',
    author: { name: 'Jordan Park' },
    content:
      'Quick question \u2014 are we using Radix Slot for the asChild pattern? Or rolling our own polymorphic component?',
    timestamp: '11:30 AM',
  },
  {
    id: 'm8',
    author: { name: 'Emily Liu' },
    content:
      'Radix Slot. It handles ref forwarding automatically and the TypeScript types are much cleaner than a manual `as` prop.',
    timestamp: '11:34 AM',
    reactions: [{ emoji: '\u{1F44D}', count: 2 }],
  },
];

// ── Notion Demo Data ────────────────────────────────────────────

export interface NotionPage {
  id: string;
  title: string;
  icon: string;
  children?: NotionPage[];
  lastEdited?: string;
}

export interface NotionBlock {
  id: string;
  type:
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'paragraph'
    | 'toggle'
    | 'code'
    | 'callout'
    | 'divider'
    | 'bulleted-list'
    | 'todo';
  content: string;
  checked?: boolean;
  language?: string;
  children?: NotionBlock[];
}

export const NOTION_PAGES: NotionPage[] = [
  {
    id: 'p1',
    title: 'Getting Started',
    icon: '🚀',
    children: [
      { id: 'p1-1', title: 'Quick Start Guide', icon: '⚡' },
      { id: 'p1-2', title: 'Installation', icon: '📦' },
    ],
  },
  {
    id: 'p2',
    title: 'Design Tokens',
    icon: '🎨',
    children: [
      { id: 'p2-1', title: 'Color System', icon: '🌈' },
      { id: 'p2-2', title: 'Typography', icon: '✏️' },
      { id: 'p2-3', title: 'Spacing & Layout', icon: '📐' },
    ],
  },
  { id: 'p3', title: 'Components', icon: '🧩' },
  { id: 'p4', title: 'Patterns', icon: '📋' },
  { id: 'p5', title: 'Changelog', icon: '📝', lastEdited: '2 hours ago' },
];

export const NOTION_BLOCKS: NotionBlock[] = [
  { id: 'b1', type: 'heading1', content: 'Design Tokens' },
  {
    id: 'b2',
    type: 'paragraph',
    content:
      'Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values (such as hex values for color or pixel values for spacing) in order to maintain a scalable and consistent visual system for UI development.',
  },
  {
    id: 'b3',
    type: 'callout',
    content:
      '💡 Strata uses a 3-layer token architecture: Primitive → Semantic → Component. This enables maximum flexibility while maintaining consistency.',
  },
  { id: 'b4', type: 'heading2', content: 'Layer 1: Primitive Tokens' },
  {
    id: 'b5',
    type: 'paragraph',
    content:
      'Primitive tokens are the raw building blocks. They define the actual values — colors in OKLch, spacing in rem, etc. They use the --sp- prefix and should never be referenced directly in component code.',
  },
  {
    id: 'b6',
    type: 'code',
    content:
      ':root {\n  --sp-blue-500: oklch(0.62 0.21 260);\n  --sp-gray-800: oklch(0.27 0.01 260);\n  --sp-spacing-4: 1rem;\n}',
    language: 'css',
  },
  { id: 'b7', type: 'heading2', content: 'Layer 2: Semantic Tokens' },
  {
    id: 'b8',
    type: 'paragraph',
    content:
      'Semantic tokens give meaning to primitives. Instead of referencing --sp-blue-500, you use --color-interactive. This abstraction makes theme switching trivial.',
  },
  {
    id: 'b9',
    type: 'toggle',
    content: 'Token naming conventions',
    children: [
      {
        id: 'b9-1',
        type: 'bulleted-list',
        content:
          'Surface tokens (--surface-*): Background colors for containers',
      },
      {
        id: 'b9-2',
        type: 'bulleted-list',
        content: 'Foreground tokens (--fg-*): Text and icon colors',
      },
      {
        id: 'b9-3',
        type: 'bulleted-list',
        content: 'Border tokens (--border-*): Stroke and separator colors',
      },
      {
        id: 'b9-4',
        type: 'bulleted-list',
        content:
          'Interactive tokens (--color-interactive-*): Action and focus states',
      },
    ],
  },
  { id: 'b10', type: 'heading2', content: 'Layer 3: Component Tokens' },
  {
    id: 'b11',
    type: 'paragraph',
    content:
      'Component tokens are the most specific layer. They allow individual components to be reskinned without affecting the rest of the system.',
  },
  {
    id: 'b12',
    type: 'todo',
    content: 'Document all component token groups',
    checked: true,
  },
  {
    id: 'b13',
    type: 'todo',
    content: 'Add token visualization page',
    checked: false,
  },
  {
    id: 'b14',
    type: 'todo',
    content: 'Create token migration guide',
    checked: false,
  },
  { id: 'b15', type: 'divider', content: '' },
  { id: 'b16', type: 'paragraph', content: 'Last edited 2 hours ago' },
];

export const NOTION_BREADCRUMB = ['Strata', 'Design Tokens'];

// ── Spotify Demo Data ───────────────────────────────────────────

export interface SpotifyTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverColor: string; // tailwind bg class for placeholder cover art
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  trackCount: number;
  coverColor: string;
}

export interface SpotifyAlbum {
  id: string;
  title: string;
  artist: string;
  year: number;
  coverColor: string;
  type: 'album' | 'single' | 'playlist';
}

export const SPOTIFY_PLAYLISTS: SpotifyPlaylist[] = [
  {
    id: 'pl1',
    name: 'Liked Songs',
    trackCount: 342,
    coverColor: 'bg-gradient-to-br from-indigo-600 to-purple-800',
  },
  {
    id: 'pl2',
    name: 'Daily Mix 1',
    trackCount: 50,
    coverColor: 'bg-gradient-to-br from-emerald-600 to-teal-800',
  },
  {
    id: 'pl3',
    name: 'Discover Weekly',
    trackCount: 30,
    coverColor: 'bg-gradient-to-br from-green-600 to-green-900',
  },
  {
    id: 'pl4',
    name: 'Release Radar',
    trackCount: 30,
    coverColor: 'bg-gradient-to-br from-blue-600 to-blue-900',
  },
  {
    id: 'pl5',
    name: 'Chill Vibes',
    trackCount: 67,
    coverColor: 'bg-gradient-to-br from-orange-500 to-pink-700',
  },
  {
    id: 'pl6',
    name: 'Focus Flow',
    trackCount: 45,
    coverColor: 'bg-gradient-to-br from-cyan-600 to-blue-800',
  },
];

export const SPOTIFY_ALBUMS: SpotifyAlbum[] = [
  {
    id: 'a1',
    title: 'Midnight Dreams',
    artist: 'Luna Echo',
    year: 2025,
    coverColor: 'bg-gradient-to-br from-purple-700 to-indigo-900',
    type: 'album',
  },
  {
    id: 'a2',
    title: 'Electric Sunrise',
    artist: 'Neon Wave',
    year: 2025,
    coverColor: 'bg-gradient-to-br from-yellow-500 to-orange-700',
    type: 'album',
  },
  {
    id: 'a3',
    title: 'Deep Focus',
    artist: 'Various Artists',
    year: 2024,
    coverColor: 'bg-gradient-to-br from-teal-600 to-emerald-800',
    type: 'playlist',
  },
  {
    id: 'a4',
    title: 'Chromatic',
    artist: 'Glass Harmony',
    year: 2025,
    coverColor: 'bg-gradient-to-br from-pink-600 to-rose-800',
    type: 'album',
  },
  {
    id: 'a5',
    title: 'Velocity',
    artist: 'Circuit Breaker',
    year: 2025,
    coverColor: 'bg-gradient-to-br from-red-600 to-red-900',
    type: 'single',
  },
  {
    id: 'a6',
    title: 'Ambient Worlds',
    artist: 'Sky Atlas',
    year: 2024,
    coverColor: 'bg-gradient-to-br from-blue-500 to-cyan-800',
    type: 'album',
  },
  {
    id: 'a7',
    title: 'Golden Hour',
    artist: 'Sunset Theory',
    year: 2025,
    coverColor: 'bg-gradient-to-br from-amber-500 to-orange-800',
    type: 'album',
  },
  {
    id: 'a8',
    title: 'Nocturne',
    artist: 'Piano Clouds',
    year: 2024,
    coverColor: 'bg-gradient-to-br from-gray-600 to-gray-900',
    type: 'album',
  },
];

export const SPOTIFY_TRACKS: SpotifyTrack[] = [
  {
    id: 't1',
    title: 'Starlight Cascade',
    artist: 'Luna Echo',
    album: 'Midnight Dreams',
    duration: '3:42',
    coverColor: 'bg-purple-700',
  },
  {
    id: 't2',
    title: 'Dawn Patrol',
    artist: 'Neon Wave',
    album: 'Electric Sunrise',
    duration: '4:15',
    coverColor: 'bg-yellow-600',
  },
  {
    id: 't3',
    title: 'Crystal Clear',
    artist: 'Glass Harmony',
    album: 'Chromatic',
    duration: '3:58',
    coverColor: 'bg-pink-600',
  },
  {
    id: 't4',
    title: 'Terminal Velocity',
    artist: 'Circuit Breaker',
    album: 'Velocity',
    duration: '2:47',
    coverColor: 'bg-red-600',
  },
  {
    id: 't5',
    title: 'Cloud Nine',
    artist: 'Sky Atlas',
    album: 'Ambient Worlds',
    duration: '5:23',
    coverColor: 'bg-blue-600',
  },
];

export const SPOTIFY_NAV = [
  { label: 'Home', icon: 'home' as const },
  { label: 'Search', icon: 'search' as const },
  { label: 'Your Library', icon: 'music' as const },
];

// ── GitHub Demo Data ────────────────────────────────────────────

export interface GitHubRepo {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  issues: number;
  updatedAt: string;
  isPrivate: boolean;
}

export interface GitHubFile {
  id: string;
  name: string;
  type: 'file' | 'directory';
  lastCommit: string;
  updatedAt: string;
}

export interface GitHubTab {
  label: string;
  count?: number;
  icon: string;
}

export const GITHUB_REPO: GitHubRepo = {
  id: 'r1',
  name: 'strata',
  fullName: 'acme/strata',
  description:
    'A modern, universal design system built with React, Radix, and Tailwind CSS. 3-layer token architecture with OKLch colors.',
  language: 'TypeScript',
  languageColor: 'bg-blue-500',
  stars: 2847,
  forks: 342,
  issues: 23,
  updatedAt: '2 hours ago',
  isPrivate: false,
};

export const GITHUB_FILES: GitHubFile[] = [
  {
    id: 'f1',
    name: '.github',
    type: 'directory',
    lastCommit: 'CI: add coverage reporting',
    updatedAt: '3 days ago',
  },
  {
    id: 'f2',
    name: '.storybook',
    type: 'directory',
    lastCommit: 'feat: add theme toolbar',
    updatedAt: '1 day ago',
  },
  {
    id: 'f3',
    name: 'src',
    type: 'directory',
    lastCommit: 'feat: Sprint 5 — test coverage',
    updatedAt: '2 hours ago',
  },
  {
    id: 'f4',
    name: 'public',
    type: 'directory',
    lastCommit: 'chore: add favicon',
    updatedAt: '1 week ago',
  },
  {
    id: 'f5',
    name: '.eslintrc.js',
    type: 'file',
    lastCommit: 'chore: eslint config',
    updatedAt: '2 weeks ago',
  },
  {
    id: 'f6',
    name: '.gitignore',
    type: 'file',
    lastCommit: 'chore: initial commit',
    updatedAt: '3 weeks ago',
  },
  {
    id: 'f7',
    name: 'package.json',
    type: 'file',
    lastCommit: 'feat: add radix dependencies',
    updatedAt: '1 day ago',
  },
  {
    id: 'f8',
    name: 'tsconfig.json',
    type: 'file',
    lastCommit: 'fix: strict mode config',
    updatedAt: '5 days ago',
  },
  {
    id: 'f9',
    name: 'vite.config.ts',
    type: 'file',
    lastCommit: 'feat: vitest config',
    updatedAt: '4 days ago',
  },
  {
    id: 'f10',
    name: 'README.md',
    type: 'file',
    lastCommit: 'docs: update readme',
    updatedAt: '1 day ago',
  },
];

export const GITHUB_TABS: GitHubTab[] = [
  { label: 'Code', icon: 'code' },
  { label: 'Issues', count: 23, icon: 'circle' },
  { label: 'Pull requests', count: 7, icon: 'inbox' },
  { label: 'Actions', icon: 'play' },
  { label: 'Settings', icon: 'settings' },
];

export const GITHUB_README = `# Strata Design System

A modern, universal design system built with React 19, Radix UI, and Tailwind CSS v4.

## Features

- **3-Layer Token Architecture** — Primitive → Semantic → Component tokens
- **OKLch Color System** — Perceptually uniform colors
- **Radix UI Headless** — Accessible, composable primitives
- **Dark Mode** — First-class dark mode support
- **5 Demo Apps** — Linear, Slack, Twitter, Notion, Spotify

## Quick Start

\`\`\`bash
pnpm install
pnpm dev        # Start dev server
pnpm storybook  # Start Storybook on port 6007
\`\`\`

## Components

| Category | Components |
|----------|-----------|
| Primitives | Button, Text, Input, Avatar, Badge, Spinner, Icon, Switch, Slider, ProgressBar, Card, Checkbox, Select, FormField |
| Layout | AppShell, Sidebar, TopBar, Stack, Container |
| Disclosure | Dialog, Tabs, Tooltip, DropdownMenu, Popover |
| Feedback | Toast, Alert, Skeleton |

## License

MIT`;

// ── Discord Demo Data ──────────────────────────────────────────
export interface DiscordServer {
  id: string;
  name: string;
  icon: string; // single letter/emoji for icon
  color: string; // tailwind bg color
}

export interface DiscordChannel {
  id: string;
  name: string;
  type: 'text' | 'voice';
  category: string;
  unread?: boolean;
}

export interface DiscordMessage {
  id: string;
  author: string;
  avatar: string; // single letter
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
}

export interface DiscordMember {
  id: string;
  name: string;
  status: 'online' | 'idle' | 'dnd' | 'offline';
  role: string;
  avatar: string;
}

export const DISCORD_SERVERS: DiscordServer[] = [
  { id: '1', name: 'Strata', icon: 'S', color: 'bg-indigo-500' },
  { id: '2', name: 'React Dev', icon: 'R', color: 'bg-blue-500' },
  { id: '3', name: 'Gaming', icon: 'G', color: 'bg-green-500' },
  { id: '4', name: 'Music', icon: 'M', color: 'bg-purple-500' },
  { id: '5', name: 'Design', icon: 'D', color: 'bg-pink-500' },
];

export const DISCORD_CHANNELS: DiscordChannel[] = [
  {
    id: '1',
    name: 'general',
    type: 'text',
    category: 'TEXT CHANNELS',
    unread: true,
  },
  { id: '2', name: 'introductions', type: 'text', category: 'TEXT CHANNELS' },
  { id: '3', name: 'help', type: 'text', category: 'TEXT CHANNELS' },
  { id: '4', name: 'showcase', type: 'text', category: 'TEXT CHANNELS' },
  { id: '5', name: 'General', type: 'voice', category: 'VOICE CHANNELS' },
  { id: '6', name: 'Music', type: 'voice', category: 'VOICE CHANNELS' },
];

export const DISCORD_MESSAGES: DiscordMessage[] = [
  {
    id: '1',
    author: 'Alice',
    avatar: 'A',
    content:
      'Hey everyone! Just shipped the new design system components \u{1F389}',
    timestamp: 'Today at 2:30 PM',
    reactions: [
      { emoji: '\u{1F389}', count: 5 },
      { emoji: '\u2764\uFE0F', count: 3 },
    ],
  },
  {
    id: '2',
    author: 'Bob',
    avatar: 'B',
    content: 'Nice work! The token system is really clean.',
    timestamp: 'Today at 2:32 PM',
  },
  {
    id: '3',
    author: 'Carol',
    avatar: 'C',
    content:
      'Has anyone tried the new ScrollArea component? Works great with long lists.',
    timestamp: 'Today at 2:45 PM',
    reactions: [{ emoji: '\u{1F44D}', count: 2 }],
  },
  {
    id: '4',
    author: 'Dave',
    avatar: 'D',
    content:
      'I love the 3-layer token architecture. Makes theming so much easier.',
    timestamp: 'Today at 3:01 PM',
  },
  {
    id: '5',
    author: 'Eve',
    avatar: 'E',
    content: '@Alice will there be a dark mode toggle in the next sprint?',
    timestamp: 'Today at 3:15 PM',
  },
  {
    id: '6',
    author: 'Alice',
    avatar: 'A',
    content: 'Already on the roadmap! Should land in Sprint 9.',
    timestamp: 'Today at 3:17 PM',
    reactions: [{ emoji: '\u{1F680}', count: 4 }],
  },
  {
    id: '7',
    author: 'Frank',
    avatar: 'F',
    content: 'The Accordion animations are smooth. CSS keyframes FTW.',
    timestamp: 'Today at 3:30 PM',
  },
  {
    id: '8',
    author: 'Grace',
    avatar: 'G',
    content:
      'Just opened a PR for the command palette component. Review please!',
    timestamp: 'Today at 3:45 PM',
    reactions: [{ emoji: '\u{1F440}', count: 3 }],
  },
];

export const DISCORD_MEMBERS: DiscordMember[] = [
  { id: '1', name: 'Alice', status: 'online', role: 'Admin', avatar: 'A' },
  { id: '2', name: 'Bob', status: 'online', role: 'Moderator', avatar: 'B' },
  { id: '3', name: 'Carol', status: 'online', role: 'Member', avatar: 'C' },
  { id: '4', name: 'Dave', status: 'idle', role: 'Member', avatar: 'D' },
  { id: '5', name: 'Eve', status: 'online', role: 'Member', avatar: 'E' },
  { id: '6', name: 'Frank', status: 'dnd', role: 'Member', avatar: 'F' },
  { id: '7', name: 'Grace', status: 'offline', role: 'Member', avatar: 'G' },
  { id: '8', name: 'Henry', status: 'offline', role: 'Member', avatar: 'H' },
];

// ── Figma Demo Data ────────────────────────────────────────────
export interface FigmaLayer {
  id: string;
  name: string;
  type: 'frame' | 'rectangle' | 'text' | 'ellipse' | 'group';
  visible: boolean;
  locked: boolean;
  children?: FigmaLayer[];
}

export interface FigmaTool {
  id: string;
  name: string;
  shortcut: string;
}

export const FIGMA_LAYERS: FigmaLayer[] = [
  {
    id: '1',
    name: 'Hero Section',
    type: 'frame',
    visible: true,
    locked: false,
    children: [
      {
        id: '1-1',
        name: 'Background',
        type: 'rectangle',
        visible: true,
        locked: false,
      },
      {
        id: '1-2',
        name: 'Headline',
        type: 'text',
        visible: true,
        locked: false,
      },
      {
        id: '1-3',
        name: 'Subtitle',
        type: 'text',
        visible: true,
        locked: false,
      },
      {
        id: '1-4',
        name: 'CTA Button',
        type: 'rectangle',
        visible: true,
        locked: false,
      },
    ],
  },
  {
    id: '2',
    name: 'Features Grid',
    type: 'frame',
    visible: true,
    locked: false,
    children: [
      {
        id: '2-1',
        name: 'Feature Card 1',
        type: 'rectangle',
        visible: true,
        locked: false,
      },
      {
        id: '2-2',
        name: 'Feature Card 2',
        type: 'rectangle',
        visible: true,
        locked: false,
      },
      {
        id: '2-3',
        name: 'Feature Card 3',
        type: 'rectangle',
        visible: true,
        locked: false,
      },
      {
        id: '2-4',
        name: 'Icon Circle',
        type: 'ellipse',
        visible: true,
        locked: true,
      },
    ],
  },
  {
    id: '3',
    name: 'Footer',
    type: 'frame',
    visible: true,
    locked: false,
    children: [
      {
        id: '3-1',
        name: 'Logo',
        type: 'rectangle',
        visible: true,
        locked: false,
      },
      {
        id: '3-2',
        name: 'Links Group',
        type: 'group',
        visible: true,
        locked: false,
      },
      {
        id: '3-3',
        name: 'Copyright',
        type: 'text',
        visible: false,
        locked: false,
      },
    ],
  },
];

export const FIGMA_TOOLS: FigmaTool[] = [
  { id: 'move', name: 'Move', shortcut: 'V' },
  { id: 'frame', name: 'Frame', shortcut: 'F' },
  { id: 'rectangle', name: 'Rectangle', shortcut: 'R' },
  { id: 'ellipse', name: 'Ellipse', shortcut: 'O' },
  { id: 'text', name: 'Text', shortcut: 'T' },
  { id: 'pen', name: 'Pen', shortcut: 'P' },
  { id: 'hand', name: 'Hand', shortcut: 'H' },
];

// ── VS Code Demo Data ──────────────────────────────────────────
export interface VSCodeFile {
  id: string;
  name: string;
  type: 'file' | 'folder';
  language?: string;
  children?: VSCodeFile[];
}

export interface VSCodeTab {
  id: string;
  name: string;
  language: string;
  active?: boolean;
  modified?: boolean;
}

export const VSCODE_FILES: VSCodeFile[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    children: [
      {
        id: '1-1',
        name: 'components',
        type: 'folder',
        children: [
          {
            id: '1-1-1',
            name: 'Button.tsx',
            type: 'file',
            language: 'typescriptreact',
          },
          {
            id: '1-1-2',
            name: 'Input.tsx',
            type: 'file',
            language: 'typescriptreact',
          },
          {
            id: '1-1-3',
            name: 'Dialog.tsx',
            type: 'file',
            language: 'typescriptreact',
          },
        ],
      },
      {
        id: '1-2',
        name: 'utils',
        type: 'folder',
        children: [
          { id: '1-2-1', name: 'cn.ts', type: 'file', language: 'typescript' },
          {
            id: '1-2-2',
            name: 'hooks.ts',
            type: 'file',
            language: 'typescript',
          },
        ],
      },
      { id: '1-3', name: 'App.tsx', type: 'file', language: 'typescriptreact' },
      { id: '1-4', name: 'index.css', type: 'file', language: 'css' },
      {
        id: '1-5',
        name: 'main.tsx',
        type: 'file',
        language: 'typescriptreact',
      },
    ],
  },
  { id: '2', name: 'package.json', type: 'file', language: 'json' },
  { id: '3', name: 'tsconfig.json', type: 'file', language: 'json' },
  { id: '4', name: 'README.md', type: 'file', language: 'markdown' },
];

export const VSCODE_TABS: VSCodeTab[] = [
  {
    id: '1',
    name: 'Button.tsx',
    language: 'TypeScript React',
    active: true,
    modified: true,
  },
  { id: '2', name: 'App.tsx', language: 'TypeScript React' },
  { id: '3', name: 'index.css', language: 'CSS' },
];

export const VSCODE_CODE = `import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  variant = 'solid',
  size = 'md',
  children,
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center',
        'font-medium rounded-md transition-colors',
        'focus:outline-none focus:ring-2',
        VARIANT_MAP[variant],
        SIZE_MAP[size],
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}`;

// ── Trello Demo Data ──────────────────────────────────────────
export interface TrelloCard {
  id: string;
  title: string;
  labels: { name: string; color: string }[];
  members: string[];
  comments?: number;
  attachments?: number;
  dueDate?: string;
  cover?: string;
}

export interface TrelloList {
  id: string;
  title: string;
  cards: TrelloCard[];
}

export const TRELLO_BOARD: TrelloList[] = [
  {
    id: '1',
    title: 'Backlog',
    cards: [
      {
        id: '1-1',
        title: 'Research competitor design systems',
        labels: [{ name: 'Research', color: 'bg-purple-500' }],
        members: ['A', 'B'],
        comments: 3,
      },
      {
        id: '1-2',
        title: 'Write documentation for token system',
        labels: [{ name: 'Docs', color: 'bg-blue-500' }],
        members: ['C'],
        attachments: 2,
      },
      {
        id: '1-3',
        title: 'Audit color contrast ratios',
        labels: [{ name: 'A11y', color: 'bg-green-500' }],
        members: ['D'],
      },
    ],
  },
  {
    id: '2',
    title: 'In Progress',
    cards: [
      {
        id: '2-1',
        title: 'Build Combobox component',
        labels: [{ name: 'Component', color: 'bg-orange-500' }],
        members: ['A'],
        dueDate: 'Mar 5',
        comments: 7,
      },
      {
        id: '2-2',
        title: 'Dark mode token refinement',
        labels: [
          { name: 'Design', color: 'bg-pink-500' },
          { name: 'Tokens', color: 'bg-yellow-500' },
        ],
        members: ['B', 'E'],
      },
    ],
  },
  {
    id: '3',
    title: 'Review',
    cards: [
      {
        id: '3-1',
        title: 'PR: Add Sheet component',
        labels: [{ name: 'Component', color: 'bg-orange-500' }],
        members: ['C'],
        comments: 12,
      },
      {
        id: '3-2',
        title: 'Storybook 10 migration guide',
        labels: [{ name: 'Docs', color: 'bg-blue-500' }],
        members: ['D'],
        attachments: 1,
      },
    ],
  },
  {
    id: '4',
    title: 'Done',
    cards: [
      {
        id: '4-1',
        title: 'Set up CI pipeline',
        labels: [{ name: 'Infra', color: 'bg-gray-500' }],
        members: ['E'],
      },
      {
        id: '4-2',
        title: 'Deploy Storybook to Vercel',
        labels: [{ name: 'Infra', color: 'bg-gray-500' }],
        members: ['A'],
        attachments: 1,
      },
    ],
  },
];

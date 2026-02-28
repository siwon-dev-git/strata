/* ═══════════════════════════════════════════════════════════════
   Demo Registry
   Single source of truth for all demo pages.
   Component lists are verified against actual imports.
   ═══════════════════════════════════════════════════════════════ */

import type { DemoSchema } from './demo-schema';
import { DiscordDemo } from './discord/DiscordDemo';
import { FigmaDemo } from './figma/FigmaDemo';
import { GitHubDemo } from './github/GitHubDemo';
import { LinearDemo } from './linear/LinearDemo';
import { NotionDemo } from './notion/NotionDemo';
import { RedditDemo } from './reddit/RedditDemo';
import { SlackDemo } from './slack/SlackDemo';
import { SpotifyDemo } from './spotify/SpotifyDemo';
import { TrelloDemo } from './trello/TrelloDemo';
import { TwitterDemo } from './twitter/TwitterDemo';
import { VSCodeDemo } from './vscode/VSCodeDemo';
import { WhatsAppDemo } from './whatsapp/WhatsAppDemo';

/* ── Registry ─────────────────────────────────────────────────── */

export const DEMO_REGISTRY: DemoSchema[] = [
  {
    id: 'linear',
    label: 'Linear',
    description: 'Project tracker with sidebar navigation and split-pane issue view.',
    component: LinearDemo,
    components: {
      primitives: ['Avatar', 'Badge', 'Button', 'Divider', 'Text'],
      layout: ['AppShell', 'Sidebar', 'TopBar'],
      disclosure: [],
      feedback: [],
    },
    layout: 'sidebar-detail',
    features: { interactivity: true, density: true },
  },
  {
    id: 'slack',
    label: 'Slack',
    description: 'Team messaging with workspace rail, channel sidebar, and compose area.',
    component: SlackDemo,
    components: {
      primitives: ['Avatar', 'Badge', 'Button', 'Divider', 'Input', 'Text'],
      layout: ['Stack', 'TopBar', 'Sidebar'],
      disclosure: [],
      feedback: [],
    },
    layout: 'three-column',
    features: { interactivity: false, density: true },
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    description: 'Social feed with left navigation, timeline, and trending sidebar.',
    component: TwitterDemo,
    components: {
      primitives: ['Avatar', 'Badge', 'Button', 'Input', 'Text'],
      layout: ['Stack', 'TopBar'],
      disclosure: [],
      feedback: [],
    },
    layout: 'three-column',
    features: { interactivity: false, density: false },
  },
  {
    id: 'notion',
    label: 'Notion',
    description: 'Document workspace with collapsible sidebar and block-based content.',
    component: NotionDemo,
    components: {
      primitives: ['Button', 'Divider', 'Input', 'Text'],
      layout: ['Sidebar', 'TopBar'],
      disclosure: [],
      feedback: [],
    },
    layout: 'sidebar-main',
    features: { interactivity: false, density: false },
  },
  {
    id: 'spotify',
    label: 'Spotify',
    description: 'Music player with playlist sidebar, album grid, and fixed playback bar.',
    component: SpotifyDemo,
    components: {
      primitives: ['Button', 'Text'],
      layout: ['Sidebar'],
      disclosure: [],
      feedback: [],
    },
    layout: 'fixed-footer',
    features: { interactivity: true, density: false },
  },
  {
    id: 'github',
    label: 'GitHub',
    description: 'Repository view with file tree, code display, and action buttons.',
    component: GitHubDemo,
    components: {
      primitives: ['Avatar', 'Badge', 'Button', 'Divider', 'Input', 'Text'],
      layout: ['TopBar'],
      disclosure: [],
      feedback: [],
    },
    layout: 'sidebar-main',
    features: { interactivity: false, density: false },
  },
  {
    id: 'discord',
    label: 'Discord',
    description: 'Chat platform with server rail, channel list, messages, and member panel.',
    component: DiscordDemo,
    components: {
      primitives: ['Avatar', 'Badge', 'Divider', 'Input', 'Text'],
      layout: [],
      disclosure: ['Tooltip'],
      feedback: [],
    },
    layout: 'three-column',
    features: { interactivity: false, density: false },
  },
  {
    id: 'figma',
    label: 'Figma',
    description: 'Design tool with layers panel, canvas, and properties inspector.',
    component: FigmaDemo,
    components: {
      primitives: ['Avatar', 'Badge', 'Button', 'Divider', 'Input', 'Text'],
      layout: [],
      disclosure: ['Collapsible', 'Tooltip'],
      feedback: [],
    },
    layout: 'three-column',
    features: { interactivity: true, density: false },
  },
  {
    id: 'vscode',
    label: 'VS Code',
    description: 'Code editor with activity bar, explorer sidebar, and tabbed editor.',
    component: VSCodeDemo,
    components: {
      primitives: ['Badge', 'Divider', 'Text'],
      layout: [],
      disclosure: ['Collapsible', 'Tabs', 'Tooltip'],
      feedback: [],
    },
    layout: 'sidebar-main',
    features: { interactivity: true, density: false },
  },
  {
    id: 'trello',
    label: 'Trello',
    description: 'Kanban board with draggable columns and task cards.',
    component: TrelloDemo,
    components: {
      primitives: ['Avatar', 'Badge', 'Button', 'Card', 'Text'],
      layout: [],
      disclosure: [],
      feedback: [],
    },
    layout: 'kanban',
    features: { interactivity: false, density: false },
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    description: 'Mobile messaging with contact list and chat view in a phone frame.',
    component: WhatsAppDemo,
    components: {
      primitives: ['Avatar', 'Badge', 'Button', 'Input', 'Text'],
      layout: [],
      disclosure: ['Tabs'],
      feedback: [],
    },
    layout: 'mobile-frame',
    features: { interactivity: true, density: false },
  },
  {
    id: 'reddit',
    label: 'Reddit',
    description: 'Forum with subreddit sidebar, tabbed feed, and community info panel.',
    component: RedditDemo,
    components: {
      primitives: [
        'Avatar',
        'Badge',
        'Button',
        'Card',
        'Divider',
        'Heading',
        'Input',
        'ScrollArea',
        'Text',
      ],
      layout: ['Stack', 'TopBar'],
      disclosure: ['Tabs'],
      feedback: [],
    },
    layout: 'three-column',
    features: { interactivity: false, density: false },
  },
];

/** Lookup map for O(1) access by demo ID. */
export const DEMO_MAP = Object.fromEntries(
  DEMO_REGISTRY.map((d) => [d.id, d]),
) as Record<string, DemoSchema>;

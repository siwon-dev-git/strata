import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DiscordDemo } from '@/demos/discord/DiscordDemo';
import { FigmaDemo } from '@/demos/figma/FigmaDemo';
import { GitHubDemo } from '@/demos/github/GitHubDemo';
import { LinearDemo } from '@/demos/linear/LinearDemo';
import { NotionDemo } from '@/demos/notion/NotionDemo';
import { SlackDemo } from '@/demos/slack/SlackDemo';
import { SpotifyDemo } from '@/demos/spotify/SpotifyDemo';
import { TwitterDemo } from '@/demos/twitter/TwitterDemo';
import { TrelloDemo } from '@/demos/trello/TrelloDemo';
import { VSCodeDemo } from '@/demos/vscode/VSCodeDemo';
import { WhatsAppDemo } from '@/demos/whatsapp/WhatsAppDemo';
import { RedditDemo } from '@/demos/reddit/RedditDemo';

const DEMOS = {
  linear: { label: 'Linear', component: LinearDemo },
  slack: { label: 'Slack', component: SlackDemo },
  twitter: { label: 'Twitter / X', component: TwitterDemo },
  notion: { label: 'Notion', component: NotionDemo },
  spotify: { label: 'Spotify', component: SpotifyDemo },
  github: { label: 'GitHub', component: GitHubDemo },
  discord: { label: 'Discord', component: DiscordDemo },
  figma: { label: 'Figma', component: FigmaDemo },
  vscode: { label: 'VS Code', component: VSCodeDemo },
  trello: { label: 'Trello', component: TrelloDemo },
  whatsapp: { label: 'WhatsApp', component: WhatsAppDemo },
  reddit: { label: 'Reddit', component: RedditDemo },
} as const;

type DemoId = keyof typeof DEMOS;

export function App() {
  const [active, setActive] = useState<DemoId>('linear');
  const ActiveDemo = DEMOS[active].component;

  return (
    <div className="flex h-screen flex-col">
      {/* Demo switcher */}
      <div className="flex h-10 shrink-0 items-center gap-1 border-b border-border-subtle bg-surface-raised px-4">
        <span className="mr-3 text-xs font-semibold text-fg-subtle">
          Strata
        </span>
        {(Object.entries(DEMOS) as [DemoId, (typeof DEMOS)[DemoId]][]).map(
          ([id, { label }]) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={cn(
                'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                active === id
                  ? 'bg-interactive-subtle text-interactive'
                  : 'text-fg-muted hover:text-fg-default',
              )}
            >
              {label}
            </button>
          ),
        )}
      </div>
      {/* Demo viewport */}
      <div className="flex-1 overflow-hidden">
        <ActiveDemo />
      </div>
    </div>
  );
}

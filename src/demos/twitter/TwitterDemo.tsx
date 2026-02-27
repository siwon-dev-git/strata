import type { ReactNode } from 'react';

import {
  TWEETS,
  TRENDING_TOPICS,
  TWITTER_NAV_ITEMS,
} from '@/__fixtures__/strata-data';
import { Stack } from '@/components/layout';
import { TopBar } from '@/components/layout';
import { Avatar, Badge, Button, Text } from '@/components/primitives';
import { Input } from '@/components/primitives/Input/Input';
import {
  IconHome,
  IconSearch,
  IconBell,
  IconMail,
  IconBookmark,
  IconUser,
} from '@/components/primitives';

import { TweetCard } from './TweetCard';

const ICON_MAP: Record<
  string,
  ({
    size,
    className,
  }: {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
  }) => ReactNode
> = {
  home: IconHome,
  search: IconSearch,
  bell: IconBell,
  mail: IconMail,
  bookmark: IconBookmark,
  user: IconUser,
};

export function TwitterDemo() {
  return (
    <div className="flex h-full bg-surface-base">
      {/* ── Left Nav ──────────────────────────────────────────── */}
      <nav className="w-[275px] flex flex-col border-r border-border-subtle p-4 shrink-0">
        {/* Logo */}
        <Text as="span" size="2xl" weight="bold" className="mb-6">
          𝕏
        </Text>

        {/* Nav Items */}
        <Stack direction="col" gap={1}>
          {TWITTER_NAV_ITEMS.map((item) => {
            const IconComp = ICON_MAP[item.icon];
            return (
              <button
                key={item.label}
                type="button"
                className={`flex items-center gap-4 px-4 py-3 rounded-full text-lg hover:bg-surface-raised transition-colors ${
                  item.active ? 'font-bold text-fg-default' : 'text-fg-muted'
                }`}
              >
                <span className="relative">
                  {IconComp && <IconComp size="md" />}
                  {item.badge != null && (
                    <Badge
                      variant="danger"
                      size="sm"
                      className="absolute -top-1.5 -right-1.5"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </span>
                {item.label}
              </button>
            );
          })}
        </Stack>

        {/* Post Button */}
        <Button
          variant="solid"
          className="mt-4 w-full rounded-full h-12 text-base font-bold"
        >
          Post
        </Button>
      </nav>

      {/* ── Feed (Center) ─────────────────────────────────────── */}
      <main className="flex-1 max-w-[600px] border-r border-border-subtle overflow-y-auto">
        {/* Top Bar */}
        <TopBar className="sticky top-0 z-10">
          <Text as="h1" size="lg" weight="bold">
            Home
          </Text>
        </TopBar>

        {/* Compose Area */}
        <div className="flex gap-3 p-4 border-b border-border-subtle">
          <Avatar name="You" alt="Your avatar" size="md" />
          <div className="flex-1 flex flex-col gap-3">
            <div
              className="bg-transparent text-xl text-fg-subtle py-2"
              role="textbox"
              tabIndex={0}
              aria-label="Compose tweet"
            >
              What&apos;s happening?
            </div>
            <div className="flex justify-end">
              <Button variant="solid" size="sm" className="rounded-full">
                Post
              </Button>
            </div>
          </div>
        </div>

        {/* Tweet Feed */}
        {TWEETS.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </main>

      {/* ── Right Widgets ─────────────────────────────────────── */}
      <aside className="w-[350px] p-4 shrink-0 overflow-y-auto hidden xl:block">
        {/* Search */}
        <Input
          placeholder="Search"
          className="rounded-full bg-surface-raised"
        />

        {/* Trending */}
        <div className="mt-4 bg-surface-raised rounded-xl p-4">
          <Text as="h2" size="lg" weight="bold" className="mb-4">
            Trends for you
          </Text>
          <Stack direction="col" gap={4}>
            {TRENDING_TOPICS.map((topic) => (
              <Stack key={topic.topic} direction="col" gap={0}>
                <Text as="span" size="xs" color="subtle">
                  {topic.category}
                </Text>
                <Text as="span" size="sm" weight="bold">
                  {topic.topic}
                </Text>
                <Text as="span" size="xs" color="subtle">
                  {topic.posts} posts
                </Text>
              </Stack>
            ))}
          </Stack>
        </div>
      </aside>
    </div>
  );
}

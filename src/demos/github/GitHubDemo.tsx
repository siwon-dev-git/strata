import { useState } from 'react';

import {
  GITHUB_FILES,
  GITHUB_README,
  GITHUB_REPO,
  GITHUB_TABS,
} from '@/__fixtures__/strata-data';
import { TopBar } from '@/components/layout';
import {
  Avatar,
  Badge,
  Button,
  Divider,
  IconBookmark,
  IconChevronDown,
  IconCircle,
  IconCode,
  IconFile,
  IconFolder,
  IconInbox,
  IconPlay,
  IconPlus,
  IconSearch,
  IconSettings,
  IconStar,
  Input,
  Text,
} from '@/components/primitives';

// -- Tab icon map -------------------------------------------------------------

const TAB_ICONS: Record<string, React.ReactNode> = {
  code: <IconCode size="sm" />,
  circle: <IconCircle size="sm" />,
  inbox: <IconInbox size="sm" />,
  play: <IconPlay size="sm" />,
  settings: <IconSettings size="sm" />,
};

// -- README renderer ----------------------------------------------------------

function ReadmeSection({ content }: { content: string }) {
  const lines = content.split('\n');

  return (
    <div className="space-y-3">
      {lines.map((line, i) => {
        const key = `readme-${i}`;

        // Heading 1
        if (line.startsWith('# ')) {
          return (
            <Text
              key={key}
              as="h1"
              size="xl"
              weight="bold"
              className="text-2xl border-b border-border-subtle pb-2"
            >
              {line.slice(2)}
            </Text>
          );
        }

        // Heading 2
        if (line.startsWith('## ')) {
          return (
            <Text
              key={key}
              as="h2"
              size="lg"
              weight="semibold"
              className="text-xl mt-6 mb-2 border-b border-border-subtle pb-1"
            >
              {line.slice(3)}
            </Text>
          );
        }

        // Code block fences
        if (line.startsWith('```')) {
          return null;
        }

        // Table rows (simplified rendering)
        if (line.startsWith('|')) {
          const cells = line
            .split('|')
            .filter(Boolean)
            .map((c) => c.trim());
          if (cells.every((c) => /^[-]+$/.test(c))) return null; // separator
          return (
            <div
              key={key}
              className="flex gap-4 font-mono text-xs text-fg-muted"
            >
              {cells.map((cell, ci) => (
                <span
                  key={ci}
                  className={
                    ci === 0 ? 'w-24 font-semibold text-fg-default' : 'flex-1'
                  }
                >
                  {cell}
                </span>
              ))}
            </div>
          );
        }

        // List items
        if (line.startsWith('- ')) {
          const text = line.slice(2);
          // Handle bold markdown (**text**)
          const parts = text.split(/(\*\*[^*]+\*\*)/);
          return (
            <div key={key} className="flex items-start gap-2 py-0.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fg-muted" />
              <Text as="span" size="sm" className="leading-relaxed">
                {parts.map((part, pi) =>
                  part.startsWith('**') && part.endsWith('**') ? (
                    <strong key={pi} className="font-semibold text-fg-default">
                      {part.slice(2, -2)}
                    </strong>
                  ) : (
                    <span key={pi}>{part}</span>
                  ),
                )}
              </Text>
            </div>
          );
        }

        // Empty lines
        if (line.trim() === '') {
          return <div key={key} className="h-2" />;
        }

        // Inline code
        if (line.includes('`')) {
          const parts = line.split(/(`[^`]+`)/);
          return (
            <Text
              key={key}
              as="p"
              size="sm"
              className="leading-relaxed text-fg-default"
            >
              {parts.map((part, pi) =>
                part.startsWith('`') && part.endsWith('`') ? (
                  <code
                    key={pi}
                    className="rounded bg-surface-inset px-1.5 py-0.5 text-xs font-mono"
                  >
                    {part.slice(1, -1)}
                  </code>
                ) : (
                  <span key={pi}>{part}</span>
                ),
              )}
            </Text>
          );
        }

        // Plain paragraph
        return (
          <Text
            key={key}
            as="p"
            size="sm"
            className="leading-relaxed text-fg-default"
          >
            {line}
          </Text>
        );
      })}
    </div>
  );
}

// -- Main component -----------------------------------------------------------

export function GitHubDemo() {
  const [activeTab, setActiveTab] = useState('Code');

  return (
    <div className="flex h-full flex-col bg-surface-base">
      {/* ── GitHub TopBar ───────────────────────────────────────────── */}
      <TopBar className="bg-surface-base border-b border-border-subtle">
        <div className="flex items-center gap-4 flex-1">
          {/* Octocat placeholder */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fg-default text-surface-base">
            <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </div>

          {/* Search */}
          <div className="relative max-w-70 flex-1">
            <IconSearch
              size="sm"
              className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-fg-muted"
            />
            <Input
              size="sm"
              placeholder="Type / to search"
              className="pl-7 rounded-md bg-surface-inset border-border-subtle"
            />
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-4">
            <Text
              as="span"
              size="sm"
              className="text-fg-muted hover:text-fg-default cursor-pointer"
            >
              Pull requests
            </Text>
            <Text
              as="span"
              size="sm"
              className="text-fg-muted hover:text-fg-default cursor-pointer"
            >
              Issues
            </Text>
            <Text
              as="span"
              size="sm"
              className="text-fg-muted hover:text-fg-default cursor-pointer"
            >
              Marketplace
            </Text>
            <Text
              as="span"
              size="sm"
              className="text-fg-muted hover:text-fg-default cursor-pointer"
            >
              Explore
            </Text>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-fg-muted">
            <IconPlus size="sm" />
            <IconChevronDown size="sm" />
          </Button>
          <Avatar name="Shawn" alt="User avatar" size="sm" />
        </div>
      </TopBar>

      {/* ── Repo header ────────────────────────────────────────────── */}
      <div className="border-b border-border-subtle bg-surface-base px-6 pt-4 pb-0">
        {/* Repo name + badges */}
        <div className="flex items-center gap-2 mb-3">
          <IconBookmark size="sm" className="text-fg-muted" />
          <Text
            as="span"
            size="sm"
            className="text-interactive hover:underline cursor-pointer"
          >
            acme
          </Text>
          <Text as="span" size="sm" color="subtle">
            /
          </Text>
          <Text
            as="span"
            size="sm"
            weight="semibold"
            className="text-interactive hover:underline cursor-pointer"
          >
            {GITHUB_REPO.name}
          </Text>
          <Badge variant="default" size="sm" className="ml-1">
            Public
          </Badge>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0 -mb-px">
          {GITHUB_TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveTab(tab.label)}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm border-b-2 transition-colors ${
                activeTab === tab.label
                  ? 'border-interactive text-fg-default font-medium'
                  : 'border-transparent text-fg-muted hover:text-fg-default hover:border-border-default'
              }`}
            >
              {TAB_ICONS[tab.icon]}
              {tab.label}
              {tab.count != null && (
                <Badge variant="default" size="sm" className="ml-0.5 text-xs">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-300 px-6 py-4">
          <div className="flex gap-6">
            {/* ── File browser + README (left) ──────────────────────── */}
            <div className="flex-1 min-w-0">
              {/* Branch bar */}
              <div className="flex items-center gap-2 mb-3">
                <Button variant="outline" size="sm" className="gap-1">
                  <svg
                    viewBox="0 0 16 16"
                    width="14"
                    height="14"
                    fill="currentColor"
                    className="text-fg-muted"
                  >
                    <path d="M11.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122V6A2.5 2.5 0 0110 8.5H6a1 1 0 00-1 1v1.128a2.251 2.251 0 11-1.5 0V5.372a2.25 2.25 0 111.5 0v1.836A2.492 2.492 0 016 7h4a1 1 0 001-1v-.628A2.25 2.25 0 019.5 3.25zM4.25 12a.75.75 0 100 1.5.75.75 0 000-1.5zM3.5 3.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0z" />
                  </svg>
                  main
                  <IconChevronDown size="sm" />
                </Button>

                <div className="flex-1" />

                <Button variant="outline" size="sm">
                  Go to file
                </Button>
                <Button variant="outline" size="sm">
                  <IconPlus size="sm" />
                  <IconChevronDown size="sm" />
                </Button>
                <Button variant="solid" size="sm" className="gap-1">
                  <IconCode size="sm" />
                  Code
                  <IconChevronDown size="sm" />
                </Button>
              </div>

              {/* File list */}
              <div className="rounded-md border border-border-subtle overflow-hidden">
                {/* Latest commit header */}
                <div className="flex items-center gap-2 bg-surface-raised px-4 py-2 border-b border-border-subtle">
                  <Avatar name="Sarah Kim" alt="Sarah Kim" size="sm" />
                  <Text as="span" size="sm" weight="medium">
                    sarahkim
                  </Text>
                  <Text
                    as="span"
                    size="sm"
                    color="subtle"
                    className="truncate flex-1"
                  >
                    feat: Sprint 5 — test coverage
                  </Text>
                  <Text as="span" size="xs" color="subtle">
                    {GITHUB_REPO.updatedAt}
                  </Text>
                </div>

                {/* File rows */}
                {GITHUB_FILES.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 px-4 py-1.5 border-b border-border-subtle last:border-b-0 hover:bg-surface-raised/50 transition-colors cursor-pointer"
                  >
                    {/* Icon */}
                    {file.type === 'directory' ? (
                      <IconFolder
                        size="sm"
                        className="text-interactive shrink-0"
                      />
                    ) : (
                      <IconFile size="sm" className="text-fg-muted shrink-0" />
                    )}

                    {/* Name */}
                    <Text
                      as="span"
                      size="sm"
                      className="w-40 shrink-0 text-interactive hover:underline cursor-pointer truncate"
                    >
                      {file.name}
                    </Text>

                    {/* Last commit message */}
                    <Text
                      as="span"
                      size="sm"
                      color="subtle"
                      className="flex-1 truncate"
                    >
                      {file.lastCommit}
                    </Text>

                    {/* Updated time */}
                    <Text
                      as="span"
                      size="xs"
                      color="subtle"
                      className="shrink-0 text-right w-20"
                    >
                      {file.updatedAt}
                    </Text>
                  </div>
                ))}
              </div>

              {/* README */}
              <div className="mt-4 rounded-md border border-border-subtle overflow-hidden">
                <div className="flex items-center gap-2 bg-surface-raised px-4 py-2 border-b border-border-subtle">
                  <IconFile size="sm" className="text-fg-muted" />
                  <Text as="span" size="sm" weight="medium">
                    README.md
                  </Text>
                </div>
                <div className="px-8 py-6">
                  <ReadmeSection content={GITHUB_README} />
                </div>
              </div>
            </div>

            {/* ── About sidebar (right) ─────────────────────────────── */}
            <aside className="hidden lg:block w-70 shrink-0">
              <div className="space-y-4">
                {/* About header */}
                <div className="flex items-center justify-between">
                  <Text as="h3" size="base" weight="semibold">
                    About
                  </Text>
                  <IconSettings
                    size="sm"
                    className="text-fg-muted cursor-pointer hover:text-fg-default"
                  />
                </div>

                {/* Description */}
                <Text as="p" size="sm" className="leading-relaxed">
                  {GITHUB_REPO.description}
                </Text>

                {/* Topics */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'react',
                    'design-system',
                    'tailwindcss',
                    'radix-ui',
                    'typescript',
                    'oklch',
                  ].map((topic) => (
                    <Badge
                      key={topic}
                      variant="interactive"
                      size="sm"
                      className="cursor-pointer hover:opacity-80"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>

                <Divider />

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <IconStar size="sm" className="text-fg-muted" />
                    <Text as="span" size="sm" weight="medium">
                      {GITHUB_REPO.stars.toLocaleString()}
                    </Text>
                    <Text as="span" size="sm" color="subtle">
                      stars
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      viewBox="0 0 16 16"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="text-fg-muted"
                    >
                      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8 12.75a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                    </svg>
                    <Text as="span" size="sm" weight="medium">
                      {GITHUB_REPO.forks.toLocaleString()}
                    </Text>
                    <Text as="span" size="sm" color="subtle">
                      forks
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <IconCircle size="sm" className="text-fg-muted" />
                    <Text as="span" size="sm" weight="medium">
                      {GITHUB_REPO.issues}
                    </Text>
                    <Text as="span" size="sm" color="subtle">
                      open issues
                    </Text>
                  </div>
                </div>

                <Divider />

                {/* Star / Fork buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <IconStar size="sm" />
                    Star
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 gap-1">
                    <svg
                      viewBox="0 0 16 16"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="text-fg-muted"
                    >
                      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8 12.75a.75.75 0 100 1.5.75.75 0 000-1.5z" />
                    </svg>
                    Fork
                  </Button>
                </div>

                <Divider />

                {/* Language */}
                <div>
                  <Text as="h4" size="sm" weight="semibold" className="mb-2">
                    Languages
                  </Text>
                  {/* Language bar */}
                  <div className="h-2 rounded-full overflow-hidden bg-surface-inset mb-2">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: '87%' }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-blue-500" />
                      <Text as="span" size="xs">
                        TypeScript
                      </Text>
                      <Text as="span" size="xs" color="subtle">
                        87.2%
                      </Text>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-yellow-400" />
                      <Text as="span" size="xs">
                        CSS
                      </Text>
                      <Text as="span" size="xs" color="subtle">
                        10.5%
                      </Text>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-orange-500" />
                      <Text as="span" size="xs">
                        HTML
                      </Text>
                      <Text as="span" size="xs" color="subtle">
                        2.3%
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

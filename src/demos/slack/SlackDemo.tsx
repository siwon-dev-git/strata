import {
  SLACK_WORKSPACES,
  SLACK_CHANNELS,
  SLACK_DMS,
  SLACK_MESSAGES,
} from '@/__fixtures__/strata-data';
import {
  Stack,
  TopBar,
  SidebarSection,
  SidebarItem,
} from '@/components/layout';
import {
  Avatar,
  Badge,
  Button,
  Text,
  Divider,
  Input,
  IconPlus,
  IconHash,
  IconSearch,
  IconUser,
  IconChevronRight,
  IconImage,
  IconLink,
} from '@/components/primitives';

export function SlackDemo() {
  return (
    <div className="flex h-full">
      {/* ── Team Rail (Discord-style icon sidebar) ───────────────── */}
      <div className="w-16 bg-surface-base flex flex-col items-center py-3 gap-2 border-r border-border-subtle shrink-0">
        {SLACK_WORKSPACES.map((ws, i) => (
          <button
            key={ws.id}
            type="button"
            className={`w-10 h-10 ${i === 0 ? 'rounded-xl' : 'rounded-2xl hover:rounded-xl'} transition-all duration-200 flex items-center justify-center text-sm font-bold text-fg-default ${ws.color} ${i === 0 ? 'border-l-2 border-white' : ''}`}
            title={ws.name}
          >
            {ws.initial}
          </button>
        ))}
        <Divider className="w-8 mx-auto" />
        <button
          type="button"
          className="w-10 h-10 rounded-full bg-surface-raised hover:bg-interactive-subtle flex items-center justify-center transition-colors"
          title="Add workspace"
        >
          <IconPlus size="sm" />
        </button>
      </div>

      {/* ── Channel Sidebar ──────────────────────────────────────── */}
      <div className="w-55 bg-surface-raised flex flex-col border-r border-border-subtle shrink-0">
        {/* Workspace header */}
        <div className="flex items-center h-[--topbar-height] px-4 gap-2 border-b border-border-subtle shrink-0">
          <Text as="span" size="sm" weight="bold" className="flex-1 truncate">
            Acme Corp
          </Text>
          <IconChevronRight size="sm" className="text-fg-subtle" />
        </div>

        {/* Scrollable channel list */}
        <div className="flex-1 overflow-y-auto py-2">
          <SidebarSection title="Channels">
            {SLACK_CHANNELS.map((ch) => (
              <SidebarItem
                key={ch.id}
                icon={<IconHash size="sm" />}
                label={ch.name}
                active={ch.isActive}
                badge={ch.unread}
              />
            ))}
          </SidebarSection>

          <SidebarSection title="Direct Messages">
            {SLACK_DMS.map((dm) => (
              <SidebarItem
                key={dm.id}
                icon={
                  <span className="relative">
                    <IconUser size="sm" />
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-surface-raised ${
                        dm.online ? 'bg-success' : 'bg-fg-subtle'
                      }`}
                    />
                  </span>
                }
                label={dm.name}
              />
            ))}
          </SidebarSection>
        </div>

        {/* Footer: user info */}
        <div className="flex items-center gap-2 px-3 py-2 border-t border-border-subtle">
          <Avatar name="You" alt="Your avatar" size="sm" />
          <Text as="span" size="xs" weight="medium" className="truncate flex-1">
            You
          </Text>
          <span className="h-2 w-2 rounded-full bg-success shrink-0" />
        </div>
      </div>

      {/* ── Message Area ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <TopBar>
          <Stack
            direction="row"
            gap={2}
            align="center"
            className="flex-1 min-w-0"
          >
            <IconHash size="md" className="text-fg-muted shrink-0" />
            <Text as="span" size="sm" weight="bold">
              general
            </Text>
            <Badge variant="default" size="sm">
              42 members
            </Badge>
            <div className="flex-1" />
            <Input
              size="sm"
              placeholder="Search..."
              className="max-w-50 rounded-md"
            />
            <IconSearch size="sm" className="text-fg-muted shrink-0" />
          </Stack>
        </TopBar>

        {/* Message list */}
        <div className="flex-1 overflow-y-auto px-4 py-2">
          {SLACK_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className="flex gap-3 py-1.5 hover:bg-surface-raised/50 px-1 -mx-1 rounded group"
            >
              <Avatar
                name={msg.author.name}
                alt={msg.author.name}
                size="md"
                className="shrink-0 mt-0.5"
              />
              <Stack direction="col" gap={0} className="flex-1 min-w-0">
                <Stack direction="row" gap={2} align="baseline">
                  <Text as="span" size="sm" weight="bold">
                    {msg.author.name}
                  </Text>
                  <Text as="span" size="xs" color="subtle">
                    {msg.timestamp}
                  </Text>
                </Stack>
                <Text as="p" size="sm" className="whitespace-pre-wrap">
                  {msg.content}
                </Text>
                {msg.reactions && msg.reactions.length > 0 && (
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {msg.reactions.map((r) => (
                      <button
                        key={r.emoji}
                        type="button"
                        className="text-xs px-1.5 py-0.5 rounded-full bg-surface-overlay border border-border-subtle hover:border-interactive transition-colors"
                      >
                        {r.emoji} {r.count}
                      </button>
                    ))}
                  </div>
                )}
                {msg.thread && (
                  <button
                    type="button"
                    className="text-xs text-interactive hover:underline mt-1 text-left"
                  >
                    {msg.thread.replyCount} replies &middot; Last reply{' '}
                    {msg.thread.lastReplyTime}
                  </button>
                )}
              </Stack>
            </div>
          ))}
        </div>

        {/* Compose area */}
        <div className="border-t border-border-subtle p-4">
          <div className="flex items-end gap-2">
            <Button variant="ghost" size="sm" className="rounded-full shrink-0">
              <IconPlus size="sm" />
            </Button>
            <Input
              placeholder="Message #general"
              className="flex-1 rounded-lg"
            />
            <Button variant="ghost" size="sm" className="shrink-0">
              <IconImage size="sm" />
            </Button>
            <Button variant="ghost" size="sm" className="shrink-0">
              <IconLink size="sm" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

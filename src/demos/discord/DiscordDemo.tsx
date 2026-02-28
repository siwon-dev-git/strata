import {
  DISCORD_SERVERS,
  DISCORD_CHANNELS,
  DISCORD_MESSAGES,
  DISCORD_MEMBERS,
} from '@/__fixtures__/strata-data';
import {
  Text,
  Avatar,
  Badge,
  Divider,
  Input,
  IconHash,
  IconVolume2,
  IconSearch,
  IconBell,
  IconPlus,
  IconSettings,
  IconUser,
  IconInbox,
  IconChevronDown,
} from '@/components/primitives';
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from '@/components/disclosure';

/* ── Status indicator colors ──────────────────────────────────── */
const STATUS_COLOR: Record<string, string> = {
  online: 'bg-green-500',
  idle: 'bg-yellow-500',
  dnd: 'bg-red-500',
  offline: 'bg-gray-500',
};

/* ── Group channels by category ──────────────────────────────── */
function groupByCategory() {
  const map = new Map<string, typeof DISCORD_CHANNELS>();
  for (const ch of DISCORD_CHANNELS) {
    const arr = map.get(ch.category) ?? [];
    arr.push(ch);
    map.set(ch.category, arr);
  }
  return map;
}

/* ── Group members by role ───────────────────────────────────── */
function groupByRole() {
  const map = new Map<string, typeof DISCORD_MEMBERS>();
  for (const m of DISCORD_MEMBERS) {
    const arr = map.get(m.role) ?? [];
    arr.push(m);
    map.set(m.role, arr);
  }
  return map;
}

export function DiscordDemo() {
  const channelGroups = groupByCategory();
  const memberGroups = groupByRole();

  return (
    <TooltipProvider>
      <div className="flex h-full text-sm">
        {/* ── Server Rail (72px) ────────────────────────────────── */}
        <div className="flex w-18 shrink-0 flex-col items-center gap-2 bg-surface-inset py-3">
          {/* Home button */}
          <TooltipRoot>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-interactive text-fg-on-accent transition-all hover:rounded-xl"
              >
                <IconHome />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Direct Messages</TooltipContent>
          </TooltipRoot>

          <Divider className="mx-auto w-8 border-border-default" />

          {/* Server icons */}
          {DISCORD_SERVERS.map((server) => (
            <TooltipRoot key={server.id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={`flex h-12 w-12 items-center justify-center rounded-3xl ${server.color} text-base font-bold text-white transition-all hover:rounded-xl ${
                    server.id === '1' ? 'rounded-xl' : ''
                  }`}
                >
                  {server.icon}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">{server.name}</TooltipContent>
            </TooltipRoot>
          ))}

          <Divider className="mx-auto w-8 border-border-default" />

          {/* Add server */}
          <TooltipRoot>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-3xl bg-surface-base text-green-500 transition-all hover:rounded-xl hover:bg-green-500 hover:text-white"
              >
                <IconPlus size="md" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Add a Server</TooltipContent>
          </TooltipRoot>
        </div>

        {/* ── Channel Sidebar (240px) ──────────────────────────── */}
        <div className="flex w-60 shrink-0 flex-col bg-surface-raised">
          {/* Server name header */}
          <button
            type="button"
            className="flex h-12 items-center justify-between border-b border-border-subtle px-4 shadow-sm transition-colors hover:bg-surface-overlay"
          >
            <Text
              as="span"
              size="sm"
              weight="bold"
              className="truncate text-fg-default"
            >
              Strata
            </Text>
            <IconChevronDown size="sm" className="text-fg-muted" />
          </button>

          {/* Channel list */}
          <div className="flex-1 overflow-y-auto px-2 pt-4">
            {[...channelGroups.entries()].map(([category, channels]) => (
              <div key={category} className="mb-4">
                <button
                  type="button"
                  className="mb-1 flex w-full items-center gap-0.5 px-0.5 text-[11px] font-bold uppercase tracking-wide text-fg-muted transition-colors hover:text-fg-default"
                >
                  <IconChevronDown size="sm" className="h-3 w-3 shrink-0" />
                  {category}
                </button>
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    type="button"
                    className={`group flex w-full items-center gap-1.5 rounded px-2 py-1.5 transition-colors ${
                      ch.id === '1'
                        ? 'bg-surface-overlay text-fg-default'
                        : 'text-fg-muted hover:bg-surface-overlay hover:text-fg-default'
                    }`}
                  >
                    {ch.type === 'text' ? (
                      <IconHash size="sm" className="shrink-0" />
                    ) : (
                      <IconVolume2 size="sm" className="shrink-0" />
                    )}
                    <span className="flex-1 truncate text-left text-sm">
                      {ch.name}
                    </span>
                    {ch.unread && (
                      <span className="h-2 w-2 shrink-0 rounded-full bg-white" />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* User area at bottom */}
          <div className="flex items-center gap-2 bg-surface-inset px-2 py-2">
            <div className="relative">
              <Avatar
                name="You"
                alt="Your avatar"
                size="sm"
                className="h-8 w-8"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface-inset bg-green-500" />
            </div>
            <div className="min-w-0 flex-1">
              <Text
                as="span"
                size="xs"
                weight="bold"
                className="block truncate text-fg-default"
              >
                You
              </Text>
              <Text
                as="span"
                size="xs"
                className="block truncate text-fg-muted"
              >
                Online
              </Text>
            </div>
            <button
              type="button"
              className="rounded p-1 text-fg-muted transition-colors hover:bg-surface-overlay"
            >
              <IconSettings size="sm" />
            </button>
          </div>
        </div>

        {/* ── Message Area (flex-1) ────────────────────────────── */}
        <div className="flex min-w-0 flex-1 flex-col bg-surface-base">
          {/* Channel header */}
          <div className="flex h-12 shrink-0 items-center gap-2 border-b border-border-subtle px-4 shadow-sm">
            <IconHash size="sm" className="text-fg-subtle" />
            <Text as="span" size="sm" weight="bold" className="text-fg-default">
              general
            </Text>
            <Divider
              orientation="vertical"
              className="mx-2 h-6 border-border-default"
            />
            <Text as="span" size="xs" className="flex-1 truncate text-fg-muted">
              General discussion about the Strata design system
            </Text>
            <div className="flex items-center gap-3 text-fg-muted">
              <button
                type="button"
                className="transition-colors hover:text-fg-default"
              >
                <IconBell size="sm" />
              </button>
              <button
                type="button"
                className="transition-colors hover:text-fg-default"
              >
                <IconInbox size="sm" />
              </button>
              <button
                type="button"
                className="transition-colors hover:text-fg-default"
              >
                <IconUser size="sm" />
              </button>
              <div className="relative">
                <Input
                  size="sm"
                  placeholder="Search"
                  className="h-6 w-36 rounded bg-surface-inset text-xs placeholder:text-fg-muted"
                />
                <IconSearch
                  size="sm"
                  className="pointer-events-none absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-fg-muted"
                />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {DISCORD_MESSAGES.map((msg, i) => {
              const prevMsg = DISCORD_MESSAGES[i - 1];
              const isGrouped = prevMsg?.author === msg.author;

              return (
                <div
                  key={msg.id}
                  className={`group relative flex gap-4 rounded px-2 py-0.5 hover:bg-surface-raised ${
                    !isGrouped ? 'mt-4 first:mt-0' : ''
                  }`}
                >
                  {/* Avatar or spacer */}
                  <div className="w-10 shrink-0">
                    {!isGrouped && (
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                          msg.avatar === 'A'
                            ? 'bg-indigo-500'
                            : msg.avatar === 'B'
                              ? 'bg-green-500'
                              : msg.avatar === 'C'
                                ? 'bg-yellow-500'
                                : msg.avatar === 'D'
                                  ? 'bg-red-500'
                                  : msg.avatar === 'E'
                                    ? 'bg-pink-500'
                                    : msg.avatar === 'F'
                                      ? 'bg-teal-500'
                                      : msg.avatar === 'G'
                                        ? 'bg-purple-500'
                                        : 'bg-blue-500'
                        }`}
                      >
                        {msg.avatar}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    {!isGrouped && (
                      <div className="flex items-baseline gap-2">
                        <Text
                          as="span"
                          size="sm"
                          weight="bold"
                          className={
                            msg.avatar === 'A'
                              ? 'text-indigo-400'
                              : msg.avatar === 'B'
                                ? 'text-green-400'
                                : msg.avatar === 'C'
                                  ? 'text-yellow-400'
                                  : msg.avatar === 'D'
                                    ? 'text-red-400'
                                    : msg.avatar === 'E'
                                      ? 'text-pink-400'
                                      : msg.avatar === 'F'
                                        ? 'text-teal-400'
                                        : msg.avatar === 'G'
                                          ? 'text-purple-400'
                                          : 'text-blue-400'
                          }
                        >
                          {msg.author}
                        </Text>
                        <Text as="span" size="xs" className="text-fg-muted">
                          {msg.timestamp}
                        </Text>
                      </div>
                    )}

                    <Text as="p" size="sm" className="text-fg-default">
                      {msg.content}
                    </Text>

                    {/* Reactions */}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {msg.reactions.map((r) => (
                          <button
                            key={r.emoji}
                            type="button"
                            className="flex items-center gap-1 rounded-full bg-surface-raised px-2 py-0.5 text-xs text-fg-default transition-colors hover:border-interactive hover:bg-surface-overlay"
                          >
                            <span>{r.emoji}</span>
                            <span className="text-fg-muted">{r.count}</span>
                          </button>
                        ))}
                        <button
                          type="button"
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-raised text-fg-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-surface-overlay"
                        >
                          <IconPlus size="sm" className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message input */}
          <div className="shrink-0 px-4 pb-6">
            <div className="flex items-center gap-2 rounded-lg bg-surface-overlay px-4 py-2.5">
              <button
                type="button"
                className="shrink-0 text-fg-muted transition-colors hover:text-fg-default"
              >
                <IconPlus size="md" />
              </button>
              <input
                type="text"
                placeholder="Message #general"
                className="min-w-0 flex-1 bg-transparent text-sm text-fg-default placeholder:text-fg-subtle outline-none"
              />
            </div>
          </div>
        </div>

        {/* ── Member List (240px) ──────────────────────────────── */}
        <div className="w-60 shrink-0 overflow-y-auto bg-surface-raised px-2 pt-6">
          {[...memberGroups.entries()].map(([role, members]) => {
            const onlineCount = members.filter(
              (m) => m.status !== 'offline',
            ).length;

            return (
              <div key={role} className="mb-4">
                <Text
                  as="span"
                  size="xs"
                  weight="bold"
                  className="mb-1 block px-2 uppercase tracking-wide text-fg-muted"
                >
                  {role} &mdash; {onlineCount}
                </Text>
                {members.map((member) => (
                  <button
                    key={member.id}
                    type="button"
                    className="flex w-full items-center gap-3 rounded px-2 py-1.5 transition-colors hover:bg-surface-overlay"
                  >
                    <div className="relative shrink-0">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${
                          member.avatar === 'A'
                            ? 'bg-indigo-500'
                            : member.avatar === 'B'
                              ? 'bg-green-500'
                              : member.avatar === 'C'
                                ? 'bg-yellow-500'
                                : member.avatar === 'D'
                                  ? 'bg-red-500'
                                  : member.avatar === 'E'
                                    ? 'bg-pink-500'
                                    : member.avatar === 'F'
                                      ? 'bg-teal-500'
                                      : member.avatar === 'G'
                                        ? 'bg-purple-500'
                                        : 'bg-blue-500'
                        }`}
                      >
                        {member.avatar}
                      </div>
                      <span
                        className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface-raised ${STATUS_COLOR[member.status]}`}
                      />
                    </div>
                    <Text
                      as="span"
                      size="sm"
                      className={
                        member.status === 'offline'
                          ? 'text-fg-subtle'
                          : 'text-fg-muted'
                      }
                    >
                      {member.name}
                    </Text>
                    {member.role === 'Admin' && (
                      <Badge
                        variant="default"
                        size="sm"
                        className="ml-auto bg-interactive text-[10px] text-fg-on-accent"
                      >
                        Admin
                      </Badge>
                    )}
                    {member.role === 'Moderator' && (
                      <Badge
                        variant="default"
                        size="sm"
                        className="ml-auto bg-green-600 text-[10px] text-white"
                      >
                        Mod
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}

/* ── Inline Home icon (Discord logo placeholder) ─────────────── */
function IconHome() {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.966 1.4168C15.0097 1.11523 13.0219 1.11523 11.0656 1.4168C10.8567 0.934541 10.6253 0.461742 10.3732 0C8.52271 0.320709 6.71891 0.882396 5.00751 1.67966C1.71218 6.70668 0.80992 11.6073 1.2613 16.4395C3.24059 17.9105 5.46361 19.0278 7.83165 19.7381C8.35891 19.0393 8.82624 18.2969 9.22891 17.5183C8.48533 17.2371 7.76795 16.8912 7.08625 16.4849C7.27804 16.3448 7.4657 16.2007 7.64885 16.0566C12.0191 18.0939 16.8652 18.0939 21.1866 16.0566C21.3717 16.2047 21.5594 16.3448 21.7492 16.4849C21.0655 16.8932 20.3462 17.2391 19.6006 17.5203C20.0053 18.2989 20.4726 19.0413 20.9979 19.7401C23.3679 19.0298 25.5929 17.9125 27.5702 16.4395C28.1057 10.8354 26.5691 5.98014 23.0212 1.67671ZM9.68812 13.4629C8.40608 13.4629 7.35694 12.2958 7.35694 10.8688C7.35694 9.44178 8.38132 8.27075 9.68812 8.27075C10.9949 8.27075 12.0441 9.44178 12.0193 10.8688C12.0193 12.2958 10.9929 13.4629 9.68812 13.4629ZM18.3413 13.4629C17.0593 13.4629 16.0101 12.2958 16.0101 10.8688C16.0101 9.44178 17.0345 8.27075 18.3413 8.27075C19.6481 8.27075 20.6973 9.44178 20.6725 10.8688C20.6725 12.2958 19.6481 13.4629 18.3413 13.4629Z"
        fill="currentColor"
      />
    </svg>
  );
}

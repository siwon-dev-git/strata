import { useState, useRef, useEffect } from 'react';
import {
  CHAT_CHARACTERS,
  CHAT_CONVERSATIONS,
  type ChatCharacter,
  type ChatMessage,
} from '@/__fixtures__/strata-data';
import { cn } from '@/lib/utils';
import {
  Text,
  Input,
  Button,
  IconArrowUp,
  IconSmile,
  IconMoreHorizontal,
} from '@/components/primitives';
import { TopBar, Stack } from '@/components/layout';

export function CharacterChatDemo() {
  const [activeId, setActiveId] = useState<string>('luna');
  const active = CHAT_CHARACTERS.find((c) => c.id === activeId)!;
  const messages = CHAT_CONVERSATIONS[activeId] ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [activeId]);

  return (
    <div className="flex h-full">
      {/* ── Character List Sidebar ─────────────────────────────── */}
      <div className="flex w-[300px] shrink-0 flex-col border-r border-border-subtle bg-surface-base">
        {/* Sidebar header */}
        <div className="flex h-[--topbar-height] items-center px-4 border-b border-border-subtle shrink-0">
          <Text as="span" size="sm" weight="bold" className="flex-1">
            Characters
          </Text>
          <Text as="span" size="xs" color="subtle">
            {CHAT_CHARACTERS.length}
          </Text>
        </div>

        {/* Search */}
        <div className="p-3">
          <Input
            size="sm"
            placeholder="Search characters..."
            className="rounded-lg"
          />
        </div>

        {/* Character list */}
        <div className="flex-1 overflow-y-auto">
          {CHAT_CHARACTERS.map((char) => (
            <CharacterItem
              key={char.id}
              character={char}
              active={char.id === activeId}
              onClick={() => setActiveId(char.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Chat Area ─────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col bg-surface-base">
        {/* Chat header */}
        <TopBar>
          <Stack
            direction="row"
            gap={3}
            align="center"
            className="flex-1 min-w-0"
          >
            <span
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full text-lg',
                active.color,
              )}
            >
              {active.avatar}
            </span>
            <div className="min-w-0 flex-1">
              <Text as="span" size="sm" weight="bold" className="block">
                {active.name}
              </Text>
              <Text as="span" size="xs" color="subtle">
                {active.tagline}
              </Text>
            </div>
            <button
              type="button"
              className="rounded-md p-1.5 text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg-default"
            >
              <IconMoreHorizontal size="sm" />
            </button>
          </Stack>
        </TopBar>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-2xl space-y-4">
            {/* Character intro card */}
            <div className="mb-8 flex flex-col items-center text-center">
              <span
                className={cn(
                  'mb-3 flex h-16 w-16 items-center justify-center rounded-full text-3xl',
                  active.color,
                )}
              >
                {active.avatar}
              </span>
              <Text as="h3" size="lg" weight="bold">
                {active.name}
              </Text>
              <Text as="p" size="sm" color="subtle" className="mt-1">
                {active.tagline}
              </Text>
            </div>

            {/* Message bubbles */}
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} character={active} />
            ))}
          </div>
        </div>

        {/* Compose area */}
        <div className="shrink-0 border-t border-border-subtle p-4">
          <div className="mx-auto max-w-2xl">
            <div className="flex items-end gap-2 rounded-2xl border border-border-default bg-surface-raised px-3 py-2">
              <button
                type="button"
                className="shrink-0 rounded-full p-1.5 text-fg-muted transition-colors hover:bg-surface-overlay hover:text-fg-default"
              >
                <IconSmile size="sm" />
              </button>
              <input
                type="text"
                placeholder={`Message ${active.name}...`}
                className="min-w-0 flex-1 bg-transparent text-sm text-fg-default placeholder:text-fg-subtle outline-none"
              />
              <Button
                variant="solid"
                size="sm"
                className="h-8 w-8 shrink-0 rounded-full p-0"
              >
                <IconArrowUp size="sm" />
              </Button>
            </div>
            <Text as="p" size="xs" color="subtle" className="mt-2 text-center">
              Characters are fictional AI personas for demonstration purposes.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Character List Item ───────────────────────────────────────── */
function CharacterItem({
  character,
  active,
  onClick,
}: {
  character: ChatCharacter;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors',
        active ? 'bg-interactive-subtle' : 'hover:bg-surface-raised',
      )}
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg',
          character.color,
        )}
      >
        {character.avatar}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <Text
            as="span"
            size="sm"
            weight="bold"
            className={cn('truncate', active && 'text-interactive')}
          >
            {character.name}
          </Text>
          <Text as="span" size="xs" color="subtle" className="shrink-0">
            {character.lastMessageTime}
          </Text>
        </div>
        <Text as="span" size="xs" color="muted" className="block truncate">
          {character.lastMessage}
        </Text>
      </div>
    </button>
  );
}

/* ── Chat Message Bubble ───────────────────────────────────────── */
function MessageBubble({
  message,
  character,
}: {
  message: ChatMessage;
  character: ChatCharacter;
}) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-3', isUser && 'flex-row-reverse')}>
      {/* Avatar */}
      {!isUser && (
        <span
          className={cn(
            'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm',
            character.color,
          )}
        >
          {character.avatar}
        </span>
      )}

      {/* Bubble */}
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-2.5',
          isUser
            ? 'rounded-br-md bg-interactive text-fg-on-accent'
            : 'rounded-bl-md bg-surface-raised',
        )}
      >
        <Text as="p" size="sm" className="whitespace-pre-wrap">
          {message.content}
        </Text>
        <Text
          as="span"
          size="xs"
          className={cn(
            'mt-1 block',
            isUser ? 'text-fg-on-accent/70' : 'text-fg-subtle',
          )}
        >
          {message.timestamp}
        </Text>
      </div>
    </div>
  );
}

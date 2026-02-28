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
  Button,
  IconArrowLeft,
  IconArrowUp,
  IconSmile,
  IconMoreHorizontal,
} from '@/components/primitives';

/* ── Suggested prompts (per-character, demo-local) ─────────── */
const SUGGESTED_PROMPTS: Record<string, string[]> = {
  luna: ['Tell me a cosmic story', 'What is dark matter?', 'Describe a nebula'],
  kai: ['Explain React hooks', 'TypeScript tips', 'Best practices'],
  sage: ['Help me find balance', 'What is mindfulness?', 'A calming thought'],
  nova: ['Challenge my idea', 'Debate AI ethics', "Devil's advocate"],
  pixel: ['Pick a color palette', 'UI design tips', 'Critique my layout'],
  echo: ['Read my fortune', 'What does the future hold?', 'A cryptic riddle'],
};

/* ── Main Demo ─────────────────────────────────────────────── */
type View = 'discovery' | 'chat';

export function CharacterChatDemo() {
  const [view, setView] = useState<View>('discovery');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const activeCharacter = activeId
    ? (CHAT_CHARACTERS.find((c) => c.id === activeId) ?? null)
    : null;
  const messages = activeId ? (CHAT_CONVERSATIONS[activeId] ?? []) : [];

  const openChat = (id: string) => {
    setActiveId(id);
    setView('chat');
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  const goBack = () => {
    setView('discovery');
    setActiveId(null);
    setIsTyping(false);
  };

  return (
    <div className="flex h-full items-center justify-center bg-surface-inset">
      {/* ── Phone Frame ──────────────────────────────────────── */}
      <div
        className="relative flex flex-col overflow-hidden rounded-[44px] border-[3px] border-border-strong bg-surface-base shadow-lg"
        style={{ width: 375, height: 812 }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-7.5 w-31.5 -translate-x-1/2 rounded-b-2xl bg-border-strong" />

        {/* Status Bar */}
        <StatusBar />

        {/* Screen Content */}
        {view === 'discovery' && (
          <div
            key="discovery"
            className="flex flex-1 flex-col overflow-hidden animate-[fade-in_200ms_ease-out]"
          >
            <DiscoveryView onSelect={openChat} />
          </div>
        )}
        {view === 'chat' && activeCharacter && (
          <div
            key="chat"
            className="flex flex-1 flex-col overflow-hidden animate-[fade-up_250ms_ease-out]"
          >
            <ChatView
              character={activeCharacter}
              messages={messages}
              isTyping={isTyping}
              onBack={goBack}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Status Bar (decorative) ───────────────────────────────── */
function StatusBar() {
  return (
    <div className="flex h-11 shrink-0 items-end justify-between px-8 pb-1">
      <Text as="span" size="xs" weight="bold">
        9:41
      </Text>
      <div className="flex items-center gap-1">
        {/* Signal bars */}
        <svg
          width="16"
          height="12"
          viewBox="0 0 16 12"
          className="text-fg-default"
        >
          <rect x="0" y="8" width="3" height="4" rx="0.5" fill="currentColor" />
          <rect
            x="4.5"
            y="5"
            width="3"
            height="7"
            rx="0.5"
            fill="currentColor"
          />
          <rect
            x="9"
            y="2"
            width="3"
            height="10"
            rx="0.5"
            fill="currentColor"
          />
          <rect
            x="13"
            y="0"
            width="3"
            height="12"
            rx="0.5"
            fill="currentColor"
          />
        </svg>
        {/* Battery */}
        <svg
          width="24"
          height="12"
          viewBox="0 0 24 12"
          className="text-fg-default"
        >
          <rect
            x="0"
            y="1"
            width="20"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
          />
          <rect x="2" y="3" width="14" height="6" rx="1" fill="currentColor" />
          <rect
            x="21"
            y="4"
            width="2"
            height="4"
            rx="0.5"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

/* ── Discovery View ────────────────────────────────────────── */
function DiscoveryView({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <>
      {/* Header */}
      <div className="px-5 pt-2 pb-3">
        <Text as="h2" size="xl" weight="bold">
          Discover
        </Text>
        <Text as="p" size="xs" color="muted" className="mt-0.5">
          {CHAT_CHARACTERS.length} AI characters
        </Text>
      </div>

      {/* Character Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-8 scrollbar-none">
        <div className="grid grid-cols-2 gap-3">
          {CHAT_CHARACTERS.map((char, i) => (
            <button
              key={char.id}
              type="button"
              onClick={() => onSelect(char.id)}
              className={cn(
                'flex flex-col items-center rounded-2xl bg-surface-raised p-4 text-center',
                'transition-transform duration-150 active:scale-95',
                'animate-[fade-up_400ms_ease-out_both]',
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-full text-2xl',
                  char.color,
                )}
              >
                {char.avatar}
              </span>
              <Text as="span" size="sm" weight="bold" className="mt-3">
                {char.name}
              </Text>
              <Text as="span" size="xs" color="subtle" className="mt-1">
                {char.tagline}
              </Text>
              <Text
                as="span"
                size="xs"
                color="muted"
                className="mt-2 line-clamp-2"
              >
                &ldquo;{char.lastMessage}&rdquo;
              </Text>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── Chat View ─────────────────────────────────────────────── */
function ChatView({
  character,
  messages,
  isTyping,
  onBack,
}: {
  character: ChatCharacter;
  messages: ChatMessage[];
  isTyping: boolean;
  onBack: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [character.id, isTyping]);

  return (
    <>
      {/* Chat Header */}
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-border-subtle px-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-1 text-fg-muted transition-colors hover:text-fg-default"
        >
          <IconArrowLeft size="sm" />
        </button>
        <span
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-base',
            character.color,
          )}
        >
          {character.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <Text as="span" size="sm" weight="bold" className="block">
            {character.name}
          </Text>
          <Text as="span" size="xs" color="subtle">
            Online
          </Text>
        </div>
        <button
          type="button"
          className="rounded-full p-1 text-fg-muted transition-colors hover:text-fg-default"
        >
          <IconMoreHorizontal size="sm" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-none">
        {/* Character intro */}
        <div className="flex flex-col items-center px-8 pt-6 pb-4 text-center">
          <span
            className={cn(
              'mb-2 flex h-16 w-16 items-center justify-center rounded-full text-3xl',
              character.color,
            )}
          >
            {character.avatar}
          </span>
          <Text as="h3" size="base" weight="bold">
            {character.name}
          </Text>
          <Text as="p" size="xs" color="subtle" className="mt-1">
            {character.tagline}
          </Text>
        </div>

        {/* Suggested prompts */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-none">
          {(SUGGESTED_PROMPTS[character.id] ?? []).map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="shrink-0 rounded-full border border-border-default bg-surface-raised px-3 py-1.5 text-xs text-fg-muted transition-colors hover:bg-surface-overlay hover:text-fg-default"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message bubbles */}
        <div className="space-y-3 px-4 pb-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} character={character} />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-2">
              <span
                className={cn(
                  'mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs',
                  character.color,
                )}
              >
                {character.avatar}
              </span>
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-surface-raised px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-fg-muted animate-[typing-dot_1.4s_ease-in-out_infinite]" />
                <span className="h-1.5 w-1.5 rounded-full bg-fg-muted animate-[typing-dot_1.4s_ease-in-out_0.2s_infinite]" />
                <span className="h-1.5 w-1.5 rounded-full bg-fg-muted animate-[typing-dot_1.4s_ease-in-out_0.4s_infinite]" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose bar */}
      <div className="shrink-0 border-t border-border-subtle px-3 py-2 pb-6">
        <div className="flex items-center gap-2 rounded-full border border-border-default bg-surface-raised px-3 py-1.5">
          <button
            type="button"
            className="shrink-0 text-fg-muted transition-colors hover:text-fg-default"
          >
            <IconSmile size="sm" />
          </button>
          <input
            type="text"
            placeholder={`Message ${character.name}...`}
            className="min-w-0 flex-1 bg-transparent text-xs text-fg-default placeholder:text-fg-subtle outline-none"
          />
          <Button
            variant="solid"
            size="sm"
            className="h-7 w-7 shrink-0 rounded-full p-0"
          >
            <IconArrowUp size="sm" />
          </Button>
        </div>
      </div>
    </>
  );
}

/* ── Message Bubble ────────────────────────────────────────── */
function MessageBubble({
  message,
  character,
}: {
  message: ChatMessage;
  character: ChatCharacter;
}) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex gap-2', isUser && 'flex-row-reverse')}>
      {!isUser && (
        <span
          className={cn(
            'mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs',
            character.color,
          )}
        >
          {character.avatar}
        </span>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-3 py-2',
          isUser
            ? 'rounded-br-md bg-interactive text-fg-on-accent'
            : 'rounded-bl-md bg-surface-raised',
        )}
      >
        <Text as="p" size="xs" className="whitespace-pre-wrap">
          {message.content}
        </Text>
        <Text
          as="span"
          size="xs"
          className={cn(
            'mt-0.5 block text-[10px]',
            isUser ? 'text-fg-on-accent/70' : 'text-fg-subtle',
          )}
        >
          {message.timestamp}
        </Text>
      </div>
    </div>
  );
}

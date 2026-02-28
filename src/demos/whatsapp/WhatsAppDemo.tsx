import { useState } from 'react';
import {
  WHATSAPP_CONTACTS,
  WHATSAPP_MESSAGES,
  type WhatsAppContact,
} from '@/__fixtures__/strata-data';
import { cn } from '@/lib/utils';
import {
  Text,
  Avatar,
  Badge,
  Button,
  Input,
  IconArrowLeft,
  IconArrowUp,
  IconSearch,
  IconCheck,
  IconPlus,
  IconMoreHorizontal,
} from '@/components/primitives';
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/disclosure';

/* ── Status Bar (decorative) ──────────────────────────────────── */
function StatusBar() {
  return (
    <div className="flex h-11 shrink-0 items-end justify-between px-8 pb-1">
      <Text as="span" size="xs" weight="bold">
        9:41
      </Text>
      <div className="flex items-center gap-1">
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

/* ── Double check marks ───────────────────────────────────────── */
function CheckMarks({ status }: { status?: 'sent' | 'delivered' | 'read' }) {
  if (!status) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0',
        status === 'read' ? 'text-interactive' : 'text-fg-subtle',
      )}
    >
      <IconCheck size="sm" className="h-3 w-3" />
      {(status === 'delivered' || status === 'read') && (
        <IconCheck size="sm" className="-ml-1.5 h-3 w-3" />
      )}
    </span>
  );
}

/* ── Contact List Item ────────────────────────────────────────── */
function ContactItem({
  contact,
  onSelect,
}: {
  contact: WhatsAppContact;
  onSelect: (id: string) => void;
}) {
  const isInitials = !contact.avatar.match(/\p{Emoji}/u);

  return (
    <button
      type="button"
      onClick={() => onSelect(contact.id)}
      className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-raised active:bg-surface-overlay"
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        {isInitials ? (
          <Avatar name={contact.name} alt={contact.name} size="md" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-overlay text-lg">
            {contact.avatar}
          </div>
        )}
        {contact.online && (
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface-base bg-success" />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <Text as="span" size="sm" weight="semibold" className="truncate">
            {contact.name}
          </Text>
          <Text
            as="span"
            size="xs"
            className={cn(
              contact.unread ? 'text-interactive' : 'text-fg-subtle',
            )}
          >
            {contact.lastMessageTime}
          </Text>
        </div>
        <div className="flex items-center justify-between gap-2">
          <Text as="span" size="xs" color="muted" className="truncate">
            {contact.lastMessage}
          </Text>
          {contact.unread && (
            <Badge
              variant="default"
              size="sm"
              className="shrink-0 bg-interactive text-fg-on-accent text-[10px] min-w-[18px] justify-center"
            >
              {contact.unread}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}

/* ── Chat List View ───────────────────────────────────────────── */
function ChatListView({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <>
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between px-4">
        <Text as="h1" size="lg" weight="bold">
          WhatsApp
        </Text>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-fg-muted transition-colors hover:text-fg-default"
          >
            <IconSearch size="sm" />
          </button>
          <button
            type="button"
            className="text-fg-muted transition-colors hover:text-fg-default"
          >
            <IconPlus size="sm" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <TabsRoot defaultValue="all">
        <TabsList className="flex gap-1 px-4 pb-2">
          {['All', 'Unread', 'Groups'].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase()}
              className="rounded-full px-3 py-1 text-xs font-medium text-fg-muted transition-colors data-[state=active]:bg-interactive data-[state=active]:text-fg-on-accent"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="flex-1 overflow-y-auto">
          {WHATSAPP_CONTACTS.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onSelect={onSelect}
            />
          ))}
        </TabsContent>

        <TabsContent value="unread" className="flex-1 overflow-y-auto">
          {WHATSAPP_CONTACTS.filter((c) => c.unread).map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              onSelect={onSelect}
            />
          ))}
        </TabsContent>

        <TabsContent value="groups" className="flex-1 overflow-y-auto">
          {WHATSAPP_CONTACTS.filter((c) => c.avatar.match(/\p{Emoji}/u)).map(
            (contact) => (
              <ContactItem
                key={contact.id}
                contact={contact}
                onSelect={onSelect}
              />
            ),
          )}
        </TabsContent>
      </TabsRoot>
    </>
  );
}

/* ── Chat View ────────────────────────────────────────────────── */
function ChatView({
  contact,
  onBack,
}: {
  contact: WhatsAppContact;
  onBack: () => void;
}) {
  const isInitials = !contact.avatar.match(/\p{Emoji}/u);

  return (
    <>
      {/* Chat Header */}
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border-subtle px-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-1 text-fg-muted transition-colors hover:text-fg-default"
        >
          <IconArrowLeft size="sm" />
        </button>

        {isInitials ? (
          <Avatar name={contact.name} alt={contact.name} size="sm" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-overlay text-sm">
            {contact.avatar}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <Text as="span" size="sm" weight="bold" className="block truncate">
            {contact.name}
          </Text>
          {contact.online && (
            <Text as="span" size="xs" color="subtle">
              online
            </Text>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full p-1.5 text-fg-muted transition-colors hover:text-fg-default"
          >
            {/* Phone icon (inline) */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
          </button>
          <button
            type="button"
            className="rounded-full p-1.5 text-fg-muted transition-colors hover:text-fg-default"
          >
            <IconMoreHorizontal size="sm" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-none">
        {/* Date chip */}
        <div className="mb-4 flex justify-center">
          <span className="rounded-full bg-surface-overlay px-3 py-0.5 text-[10px] text-fg-subtle">
            Today
          </span>
        </div>

        <div className="space-y-1.5">
          {WHATSAPP_MESSAGES.map((msg) => {
            const isSent = msg.role === 'sent';
            return (
              <div
                key={msg.id}
                className={cn('flex', isSent ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-lg px-3 py-1.5',
                    isSent
                      ? 'rounded-br-sm bg-interactive text-fg-on-accent'
                      : 'rounded-bl-sm bg-surface-raised',
                  )}
                >
                  <Text as="p" size="xs" className="whitespace-pre-wrap">
                    {msg.content}
                  </Text>
                  <div
                    className={cn(
                      'mt-0.5 flex items-center justify-end gap-1 text-[10px]',
                      isSent ? 'text-fg-on-accent/70' : 'text-fg-subtle',
                    )}
                  >
                    <span>{msg.timestamp}</span>
                    {isSent && <CheckMarks status={msg.status} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compose bar */}
      <div className="shrink-0 border-t border-border-subtle px-3 py-2 pb-6">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Type a message"
            className="flex-1 rounded-full"
            size="sm"
          />
          <Button
            variant="solid"
            size="sm"
            className="h-8 w-8 shrink-0 rounded-full p-0"
          >
            <IconArrowUp size="sm" />
          </Button>
        </div>
      </div>
    </>
  );
}

/* ── Main WhatsApp Demo ───────────────────────────────────────── */
export function WhatsAppDemo() {
  const [view, setView] = useState<'list' | 'chat'>('list');
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeContact = activeId
    ? (WHATSAPP_CONTACTS.find((c) => c.id === activeId) ?? null)
    : null;

  const openChat = (id: string) => {
    setActiveId(id);
    setView('chat');
  };

  const goBack = () => {
    setView('list');
    setActiveId(null);
  };

  return (
    <div className="flex h-full items-center justify-center bg-surface-inset">
      {/* Phone Frame */}
      <div
        className="relative flex flex-col overflow-hidden rounded-[44px] border-[3px] border-border-strong bg-surface-base shadow-lg"
        style={{ width: 375, height: 812 }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-0 z-10 h-[30px] w-[126px] -translate-x-1/2 rounded-b-2xl bg-border-strong" />

        {/* Status Bar */}
        <StatusBar />

        {/* Screen Content */}
        {view === 'list' && (
          <div className="flex flex-1 flex-col overflow-hidden animate-[fade-in_200ms_ease-out]">
            <ChatListView onSelect={openChat} />
          </div>
        )}
        {view === 'chat' && activeContact && (
          <div className="flex flex-1 flex-col overflow-hidden animate-[fade-up_250ms_ease-out]">
            <ChatView contact={activeContact} onBack={goBack} />
          </div>
        )}
      </div>
    </div>
  );
}

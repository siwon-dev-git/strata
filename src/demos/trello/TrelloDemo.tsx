import type {
  TrelloCard as TrelloCardData,
  TrelloList,
} from '@/__fixtures__/strata-data';
import { TRELLO_BOARD } from '@/__fixtures__/strata-data';
import {
  Avatar,
  Badge,
  Button,
  Card,
  IconClock,
  IconLink,
  IconMessageCircle,
  IconMoreHorizontal,
  IconPlus,
  IconStar,
  Text,
} from '@/components/primitives';

/* ------------------------------------------------------------------ */
/*  Board Header                                                       */
/* ------------------------------------------------------------------ */

function BoardHeader() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Text as="h1" size="lg" weight="bold">
        Strata Design System
      </Text>
      <button className="text-fg-muted hover:text-fg-default transition-colors">
        <IconStar size="sm" />
      </button>
      <div className="ml-auto flex items-center gap-1">
        {['S', 'A', 'J', 'E', 'D'].map((letter) => (
          <Avatar
            key={letter}
            name={letter}
            alt={letter}
            size="sm"
            className="ring-2 ring-surface-inset -ml-1 first:ml-0"
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Trello Card                                                        */
/* ------------------------------------------------------------------ */

function TrelloCard({ card }: { card: TrelloCardData }) {
  return (
    <Card className="bg-surface-raised border-none rounded-lg p-2 cursor-pointer hover:ring-1 hover:ring-interactive/50 transition-all">
      {/* Color labels */}
      {card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {card.labels.map((label) => (
            <span
              key={label.name}
              className={`${label.color} h-2 w-10 rounded-full`}
              title={label.name}
            />
          ))}
        </div>
      )}

      {/* Title */}
      <Text as="p" size="sm" className="leading-snug">
        {card.title}
      </Text>

      {/* Bottom row: meta */}
      <div className="flex items-center gap-2 mt-2">
        {/* Members */}
        <div className="flex -space-x-1">
          {card.members.map((m) => (
            <Avatar
              key={m}
              name={m}
              alt={m}
              size="sm"
              className="ring-1 ring-surface-raised h-5 w-5 text-[10px]"
            />
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {/* Comments */}
          {card.comments && (
            <span className="flex items-center gap-0.5 text-fg-muted text-xs">
              <IconMessageCircle size="sm" className="h-3.5 w-3.5" />
              {card.comments}
            </span>
          )}

          {/* Attachments */}
          {card.attachments && (
            <span className="flex items-center gap-0.5 text-fg-muted text-xs">
              <IconLink size="sm" className="h-3.5 w-3.5" />
              {card.attachments}
            </span>
          )}

          {/* Due date */}
          {card.dueDate && (
            <Badge size="sm" className="gap-0.5 text-[10px]">
              <IconClock size="sm" className="h-3 w-3" />
              {card.dueDate}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Trello List                                                        */
/* ------------------------------------------------------------------ */

function TrelloListColumn({ list }: { list: TrelloList }) {
  return (
    <div className="bg-surface-base rounded-xl w-68 shrink-0 flex flex-col max-h-full">
      {/* List header */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <Text as="h3" size="sm" weight="semibold">
          {list.title}
        </Text>
        <button className="text-fg-muted hover:text-fg-default transition-colors p-0.5 rounded hover:bg-white/10">
          <IconMoreHorizontal size="sm" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2 px-2 pb-2 overflow-y-auto flex-1">
        {list.cards.map((card) => (
          <TrelloCard key={card.id} card={card} />
        ))}
      </div>

      {/* Add card button */}
      <div className="px-2 pb-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-fg-muted hover:text-fg-default"
        >
          <IconPlus size="sm" className="h-4 w-4" />
          Add a card
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TrelloDemo                                                         */
/* ------------------------------------------------------------------ */

export function TrelloDemo() {
  return (
    <div className="h-full bg-surface-inset flex flex-col overflow-hidden">
      <BoardHeader />
      <div className="flex gap-3 overflow-x-auto p-3 flex-1 items-start">
        {TRELLO_BOARD.map((list) => (
          <TrelloListColumn key={list.id} list={list} />
        ))}
        {/* Add list button */}
        <button className="bg-white/10 hover:bg-white/15 transition-colors rounded-xl w-68 shrink-0 px-4 py-3 text-sm text-fg-muted text-left flex items-center gap-2">
          <IconPlus size="sm" className="h-4 w-4" />
          Add another list
        </button>
      </div>
    </div>
  );
}

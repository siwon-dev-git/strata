import { useState } from 'react';

import type { NotionBlock, NotionPage } from '@/__fixtures__/strata-data';
import {
  NOTION_BLOCKS,
  NOTION_BREADCRUMB,
  NOTION_PAGES,
} from '@/__fixtures__/strata-data';
import { Sidebar, TopBar } from '@/components/layout';
import {
  Button,
  Divider,
  IconCheck,
  IconChevronRight,
  IconMoreHorizontal,
  IconPlus,
  IconSearch,
  Input,
  Text,
} from '@/components/primitives';

// -- Sidebar page tree --------------------------------------------------------

function PageItem({
  page,
  depth,
  activePage,
  expandedPages,
  onSelect,
  onToggle,
}: {
  page: NotionPage;
  depth: number;
  activePage: string;
  expandedPages: Set<string>;
  onSelect: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const hasChildren = page.children && page.children.length > 0;
  const isExpanded = expandedPages.has(page.id);
  const isActive = activePage === page.id;

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onSelect(page.id);
          if (hasChildren) onToggle(page.id);
        }}
        className={`flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors ${
          isActive
            ? 'bg-interactive-subtle text-fg-default font-medium'
            : 'text-fg-muted hover:bg-surface-raised hover:text-fg-default'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {hasChildren && (
          <span
            className={`shrink-0 transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`}
          >
            <IconChevronRight size="sm" />
          </span>
        )}
        <span className="shrink-0 text-sm">{page.icon}</span>
        <span className="truncate">{page.title}</span>
      </button>

      {hasChildren && isExpanded && (
        <div>
          {page.children!.map((child) => (
            <PageItem
              key={child.id}
              page={child}
              depth={depth + 1}
              activePage={activePage}
              expandedPages={expandedPages}
              onSelect={onSelect}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </>
  );
}

// -- Block renderer -----------------------------------------------------------

function BlockRenderer({
  block,
  expandedToggles,
  onToggleBlock,
}: {
  block: NotionBlock;
  expandedToggles: Set<string>;
  onToggleBlock: (id: string) => void;
}) {
  switch (block.type) {
    case 'heading1':
      return (
        <Text as="h1" size="xl" weight="bold" className="mt-8 mb-2 text-2xl">
          {block.content}
        </Text>
      );

    case 'heading2':
      return (
        <Text as="h2" size="lg" weight="semibold" className="mt-6 mb-2 text-xl">
          {block.content}
        </Text>
      );

    case 'heading3':
      return (
        <Text as="h3" size="base" weight="semibold" className="mt-4 mb-1">
          {block.content}
        </Text>
      );

    case 'paragraph':
      return (
        <Text as="p" size="sm" className="leading-relaxed text-fg-default mb-1">
          {block.content}
        </Text>
      );

    case 'callout':
      return (
        <div className="my-3 rounded-md border-l-4 border-interactive bg-surface-inset p-4">
          <Text as="p" size="sm" className="leading-relaxed">
            {block.content}
          </Text>
        </div>
      );

    case 'code':
      return (
        <div className="my-3 overflow-auto rounded-md bg-surface-inset p-4">
          {block.language && (
            <Text
              as="span"
              size="xs"
              color="subtle"
              className="mb-2 block uppercase tracking-wide"
            >
              {block.language}
            </Text>
          )}
          <pre className="font-mono text-xs leading-relaxed text-fg-default">
            <code>{block.content}</code>
          </pre>
        </div>
      );

    case 'toggle': {
      const isOpen = expandedToggles.has(block.id);
      return (
        <div className="my-2">
          <button
            type="button"
            onClick={() => onToggleBlock(block.id)}
            className="flex w-full items-center gap-2 rounded-md px-1 py-1 text-left hover:bg-surface-raised transition-colors"
          >
            <span
              className={`shrink-0 transition-transform duration-150 ${isOpen ? 'rotate-90' : ''}`}
            >
              <IconChevronRight size="sm" />
            </span>
            <Text as="span" size="sm" weight="medium">
              {block.content}
            </Text>
          </button>
          {isOpen && block.children && (
            <div className="ml-6 mt-1 space-y-0.5">
              {block.children.map((child) => (
                <BlockRenderer
                  key={child.id}
                  block={child}
                  expandedToggles={expandedToggles}
                  onToggleBlock={onToggleBlock}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    case 'bulleted-list':
      return (
        <div className="flex items-start gap-2 py-0.5">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fg-muted" />
          <Text as="span" size="sm" className="leading-relaxed">
            {block.content}
          </Text>
        </div>
      );

    case 'todo':
      return (
        <div className="flex items-center gap-2 py-0.5">
          <button
            type="button"
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
              block.checked
                ? 'border-interactive bg-interactive text-white'
                : 'border-border-default hover:border-interactive'
            }`}
          >
            {block.checked && <IconCheck size="sm" className="h-3 w-3" />}
          </button>
          <Text
            as="span"
            size="sm"
            className={block.checked ? 'line-through text-fg-muted' : ''}
          >
            {block.content}
          </Text>
        </div>
      );

    case 'divider':
      return <Divider className="my-4" />;

    default:
      return null;
  }
}

// -- Main component -----------------------------------------------------------

export function NotionDemo() {
  const [activePage, setActivePage] = useState('p2');
  const [expandedPages, setExpandedPages] = useState<Set<string>>(
    () => new Set(['p1', 'p2']),
  );
  const [expandedToggles, setExpandedToggles] = useState<Set<string>>(
    () => new Set(),
  );

  const togglePage = (id: string) => {
    setExpandedPages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleBlock = (id: string) => {
    setExpandedToggles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Find active page info for header
  const findPage = (
    pages: NotionPage[],
    id: string,
  ): NotionPage | undefined => {
    for (const p of pages) {
      if (p.id === id) return p;
      if (p.children) {
        const found = findPage(p.children, id);
        if (found) return found;
      }
    }
    return undefined;
  };
  const currentPage = findPage(NOTION_PAGES, activePage);

  return (
    <div className="flex h-full">
      {/* ── Sidebar (240px) ──────────────────────────────────────── */}
      <Sidebar className="w-60">
        {/* Search */}
        <div className="px-3 pt-3 pb-2">
          <div className="relative">
            <IconSearch
              size="sm"
              className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-fg-muted"
            />
            <Input
              size="sm"
              placeholder="Search..."
              className="pl-7 rounded-md"
            />
          </div>
        </div>

        {/* Page tree */}
        <div className="flex-1 overflow-y-auto px-2 py-1">
          {NOTION_PAGES.map((page) => (
            <PageItem
              key={page.id}
              page={page}
              depth={0}
              activePage={activePage}
              expandedPages={expandedPages}
              onSelect={setActivePage}
              onToggle={togglePage}
            />
          ))}
        </div>

        <Divider className="mx-3" />

        {/* New page button */}
        <div className="px-3 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-fg-muted"
          >
            <IconPlus size="sm" />
            New Page
          </Button>
        </div>
      </Sidebar>

      {/* ── Content area ─────────────────────────────────────────── */}
      <main className="flex flex-1 flex-col min-w-0">
        {/* Top bar with breadcrumb */}
        <TopBar>
          <div className="flex flex-1 items-center gap-1 min-w-0">
            {NOTION_BREADCRUMB.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1">
                {i > 0 && (
                  <Text as="span" size="xs" color="subtle">
                    /
                  </Text>
                )}
                <Text
                  as="span"
                  size="xs"
                  color={
                    i === NOTION_BREADCRUMB.length - 1 ? 'default' : 'subtle'
                  }
                  weight={
                    i === NOTION_BREADCRUMB.length - 1 ? 'medium' : 'normal'
                  }
                  className="hover:bg-surface-raised rounded px-1 py-0.5 cursor-pointer transition-colors"
                >
                  {crumb}
                </Text>
              </span>
            ))}
          </div>
          <Button variant="ghost" size="sm">
            <IconMoreHorizontal size="sm" />
          </Button>
        </TopBar>

        {/* Page body */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-180 px-16 py-10">
            {/* Page icon + title */}
            {currentPage && (
              <div className="mb-6">
                <span className="text-5xl">{currentPage.icon}</span>
                <Text as="h1" size="xl" weight="bold" className="mt-3 text-3xl">
                  {currentPage.title}
                </Text>
              </div>
            )}

            {/* Blocks */}
            <div className="space-y-0.5">
              {NOTION_BLOCKS.map((block) => (
                <div
                  key={block.id}
                  className="group relative rounded px-1 -mx-1 hover:bg-surface-raised/50 transition-colors"
                >
                  {/* Drag handle (visible on hover) */}
                  <span className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab text-fg-muted">
                    <IconMoreHorizontal size="sm" />
                  </span>
                  <BlockRenderer
                    block={block}
                    expandedToggles={expandedToggles}
                    onToggleBlock={toggleBlock}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

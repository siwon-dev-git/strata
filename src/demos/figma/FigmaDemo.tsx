import { useState } from 'react';
import {
  FIGMA_LAYERS,
  FIGMA_TOOLS,
  type FigmaLayer,
} from '@/__fixtures__/strata-data';
import {
  Text,
  Avatar,
  Badge,
  Divider,
  Input,
  Button,
  IconChevronDown,
  IconChevronRight,
  IconEye,
  IconLock,
  IconGrid,
  IconType,
  IconCircle,
  IconSearch,
  IconEdit,
} from '@/components/primitives';
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/disclosure';

/* ── Layer type icon map ──────────────────────────────────────── */
function LayerIcon({ type }: { type: FigmaLayer['type'] }) {
  switch (type) {
    case 'frame':
      return <IconGrid size="sm" className="h-3.5 w-3.5 shrink-0" />;
    case 'rectangle':
      return (
        <svg
          className="h-3.5 w-3.5 shrink-0"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <rect x="2" y="2" width="10" height="10" rx="1" />
        </svg>
      );
    case 'text':
      return <IconType size="sm" className="h-3.5 w-3.5 shrink-0" />;
    case 'ellipse':
      return <IconCircle size="sm" className="h-3.5 w-3.5 shrink-0" />;
    case 'group':
      return (
        <svg
          className="h-3.5 w-3.5 shrink-0"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <rect x="1" y="1" width="5" height="5" rx="0.5" />
          <rect x="8" y="8" width="5" height="5" rx="0.5" />
        </svg>
      );
  }
}

/* ── Tool icon map ────────────────────────────────────────────── */
function ToolIcon({ id }: { id: string }) {
  switch (id) {
    case 'move':
      return (
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M3 1l10 6.5L8.5 9 7 14z" />
        </svg>
      );
    case 'frame':
      return <IconGrid size="sm" className="h-4 w-4" />;
    case 'rectangle':
      return (
        <svg
          className="h-4 w-4"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <rect x="2" y="2" width="12" height="12" rx="1" />
        </svg>
      );
    case 'ellipse':
      return <IconCircle size="sm" className="h-4 w-4" />;
    case 'text':
      return <IconType size="sm" className="h-4 w-4" />;
    case 'pen':
      return <IconEdit size="sm" className="h-4 w-4" />;
    case 'hand':
      return (
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a1.5 1.5 0 011.5 1.5V6h1a1.5 1.5 0 011.5 1.5V8a1.5 1.5 0 011.5 1.5v3A3.5 3.5 0 0110 16H7a3.5 3.5 0 01-3.5-3.5v-5A1.5 1.5 0 015 6h.5V2.5A1.5 1.5 0 017 1h1z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ── Layer tree item ──────────────────────────────────────────── */
function LayerItem({
  layer,
  depth = 0,
  selectedId,
  onSelect,
}: {
  layer: FigmaLayer;
  depth?: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const hasChildren = layer.children && layer.children.length > 0;
  const isSelected = selectedId === layer.id;

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(layer.id)}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(layer.id)}
        className={`group flex h-7 cursor-pointer items-center gap-1 pr-2 transition-colors ${
          isSelected
            ? 'bg-interactive-subtle text-white'
            : 'text-fg-default hover:bg-white/5'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {/* Expand/collapse arrow */}
        {hasChildren ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
            className="flex h-4 w-4 shrink-0 items-center justify-center text-fg-subtle hover:text-fg-default"
          >
            {open ? (
              <IconChevronDown size="sm" className="h-3 w-3" />
            ) : (
              <IconChevronRight size="sm" className="h-3 w-3" />
            )}
          </button>
        ) : (
          <span className="w-4 shrink-0" />
        )}

        {/* Layer type icon */}
        <span className={isSelected ? 'text-interactive' : 'text-fg-subtle'}>
          <LayerIcon type={layer.type} />
        </span>

        {/* Layer name */}
        <span className="flex-1 truncate text-xs">{layer.name}</span>

        {/* Visibility toggle */}
        <button
          type="button"
          className={`shrink-0 opacity-0 transition-opacity group-hover:opacity-100 ${
            !layer.visible ? 'opacity-100! text-fg-disabled' : 'text-fg-subtle'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <IconEye size="sm" className="h-3 w-3" />
        </button>

        {/* Lock indicator */}
        {layer.locked && (
          <span className="shrink-0 text-fg-disabled">
            <IconLock size="sm" className="h-3 w-3" />
          </span>
        )}
      </div>

      {/* Children */}
      {hasChildren && open && (
        <div>
          {layer.children!.map((child) => (
            <LayerItem
              key={child.id}
              layer={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Collapsible property section ─────────────────────────────── */
function PropertySection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <CollapsibleRoot defaultOpen={defaultOpen}>
      <CollapsibleTrigger className="group flex h-8 w-full items-center justify-between px-4 text-xs font-semibold text-fg-default hover:bg-white/5">
        <span>{title}</span>
        <IconChevronDown
          size="sm"
          className="h-3 w-3 text-fg-subtle transition-transform group-data-[state=closed]:-rotate-90"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-3">{children}</div>
      </CollapsibleContent>
    </CollapsibleRoot>
  );
}

/* ── Small labeled input for properties ───────────────────────── */
function PropInput({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-0.5 ${className ?? ''}`}>
      <Text as="span" size="xs" className="text-fg-subtle">
        {label}
      </Text>
      <Input
        size="sm"
        defaultValue={value}
        className="h-6 rounded bg-white/5 text-xs text-fg-default border-transparent focus:border-interactive focus:ring-interactive"
      />
    </div>
  );
}

/* ── Color swatch + hex input ─────────────────────────────────── */
function ColorInput({
  color,
  hex,
  opacity = '100',
}: {
  color: string;
  hex: string;
  opacity?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-6 w-6 shrink-0 rounded border border-border-default"
        style={{ backgroundColor: color }}
      />
      <Input
        size="sm"
        defaultValue={hex}
        className="h-6 flex-1 rounded bg-white/5 text-xs text-fg-default border-transparent focus:border-interactive focus:ring-interactive"
      />
      <Input
        size="sm"
        defaultValue={`${opacity}%`}
        className="h-6 w-12 rounded bg-white/5 text-xs text-fg-default border-transparent focus:border-interactive focus:ring-interactive"
      />
    </div>
  );
}

/* ── Main Figma Demo ──────────────────────────────────────────── */
export function FigmaDemo() {
  const [activeTool, setActiveTool] = useState('move');
  const [selectedLayer, setSelectedLayer] = useState<string | null>('1-2');

  return (
    <TooltipProvider>
      <div
        className="flex h-full flex-col text-sm"
        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
      >
        {/* ── Menubar ─────────────────────────────────────────────── */}
        <div className="flex h-8 shrink-0 items-center bg-surface-raised border-b border-border-subtle">
          {/* Left: Figma logo + file name */}
          <div className="flex items-center gap-2 px-3">
            {/* Figma logo placeholder */}
            <div className="flex h-5 w-5 items-center justify-center rounded bg-interactive">
              <svg
                className="h-3 w-3 text-white"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M4 0h4a2 2 0 010 4H4a2 2 0 010-4zM4 4h4a2 2 0 010 4H4a2 2 0 010-4zM4 8h2a2 2 0 010 4H4a2 2 0 010-4zM8 4a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
          </div>

          {/* Center: Menu items */}
          <div className="flex items-center gap-0.5">
            {['File', 'Edit', 'View', 'Insert', 'Text'].map((item) => (
              <button
                key={item}
                type="button"
                className="rounded px-2.5 py-1 text-[11px] text-fg-default transition-colors hover:bg-white/10"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Center: File name */}
          <div className="ml-4 flex items-center gap-2">
            <Text as="span" size="xs" className="text-fg-default">
              Strata Landing Page
            </Text>
            <Badge
              variant="default"
              size="sm"
              className="bg-interactive-subtle text-interactive text-[10px]"
            >
              Saved
            </Badge>
          </div>

          {/* Right: Share + Avatar */}
          <div className="ml-auto flex items-center gap-2 pr-3">
            <Button
              variant="solid"
              size="sm"
              className="h-6 rounded-md bg-interactive px-3 text-[11px] font-semibold text-white hover:bg-interactive-hover"
            >
              Share
            </Button>
            <Avatar
              name="You"
              alt="User avatar"
              size="sm"
              className="h-6 w-6"
            />
          </div>
        </div>

        {/* ── Toolbar ─────────────────────────────────────────────── */}
        <div className="flex h-10 shrink-0 items-center gap-1 border-b border-border-subtle bg-surface-raised px-3">
          {FIGMA_TOOLS.map((tool) => (
            <TooltipRoot key={tool.id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setActiveTool(tool.id)}
                  className={`flex h-7 w-7 items-center justify-center rounded transition-colors ${
                    activeTool === tool.id
                      ? 'bg-interactive text-white'
                      : 'text-fg-default hover:bg-white/10'
                  }`}
                >
                  <ToolIcon id={tool.id} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="flex items-center gap-2">
                <span>{tool.name}</span>
                <kbd className="rounded bg-white/10 px-1 text-[10px] text-fg-muted">
                  {tool.shortcut}
                </kbd>
              </TooltipContent>
            </TooltipRoot>
          ))}

          <Divider
            orientation="vertical"
            className="mx-2 h-5 border-border-default"
          />

          {/* Zoom controls */}
          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              className="rounded px-2 py-1 text-[11px] text-fg-default hover:bg-white/10"
            >
              100%
            </button>
          </div>
        </div>

        {/* ── Main content ────────────────────────────────────────── */}
        <div className="flex flex-1 overflow-hidden">
          {/* ── Layers Panel (left) ───────────────────────────────── */}
          <div className="flex w-60 shrink-0 flex-col border-r border-border-subtle bg-surface-raised">
            {/* Layers header */}
            <div className="flex h-9 shrink-0 items-center justify-between border-b border-border-subtle px-3">
              <Text
                as="span"
                size="xs"
                weight="semibold"
                className="text-fg-default"
              >
                Layers
              </Text>
              <button
                type="button"
                className="text-fg-subtle transition-colors hover:text-fg-default"
              >
                <IconSearch size="sm" className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Layer tree */}
            <div className="flex-1 overflow-y-auto py-1">
              {FIGMA_LAYERS.map((layer) => (
                <CollapsibleRoot key={layer.id} defaultOpen>
                  <LayerItem
                    layer={layer}
                    selectedId={selectedLayer}
                    onSelect={setSelectedLayer}
                  />
                </CollapsibleRoot>
              ))}
            </div>

            {/* Pages section at bottom */}
            <div className="border-t border-border-subtle px-3 py-2">
              <Text as="span" size="xs" className="text-fg-subtle">
                Page 1
              </Text>
            </div>
          </div>

          {/* ── Canvas (center) ───────────────────────────────────── */}
          <div
            className="relative flex-1 overflow-hidden bg-surface-inset"
            style={{
              backgroundImage:
                'radial-gradient(circle, #ffffff08 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Mock canvas shapes */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative" style={{ width: 500, height: 380 }}>
                {/* Hero Section frame */}
                <div
                  className="absolute rounded-lg border border-dashed border-border-default"
                  style={{ top: 0, left: 0, width: 500, height: 160 }}
                >
                  {/* Background */}
                  <div className="absolute inset-0 rounded-lg bg-linear-to-r from-[#1a1a2e] to-[#16213e]" />
                  {/* Headline */}
                  <div className="absolute left-8 top-8">
                    <div
                      className={`text-2xl font-bold text-white ${
                        selectedLayer === '1-2'
                          ? 'ring-2 ring-interactive ring-offset-1 ring-offset-transparent'
                          : ''
                      }`}
                    >
                      Build beautiful interfaces
                    </div>
                  </div>
                  {/* Subtitle */}
                  <div className="absolute left-8 top-17">
                    <div className="text-sm text-fg-muted">
                      A modern design system for the web
                    </div>
                  </div>
                  {/* CTA Button */}
                  <div className="absolute left-8 top-25">
                    <div className="rounded-md bg-interactive px-4 py-2 text-xs font-semibold text-white">
                      Get Started
                    </div>
                  </div>
                  {/* Frame label */}
                  <Text
                    as="span"
                    size="xs"
                    className="absolute -top-5 left-0 text-interactive"
                  >
                    Hero Section
                  </Text>
                </div>

                {/* Features Grid frame */}
                <div
                  className="absolute rounded-lg border border-dashed border-border-default"
                  style={{ top: 180, left: 0, width: 500, height: 120 }}
                >
                  <div className="flex h-full items-center justify-center gap-4 p-4">
                    {/* Feature cards */}
                    {[
                      { bg: 'bg-[#1e293b]', label: 'Tokens' },
                      { bg: 'bg-[#1e293b]', label: 'Components' },
                      { bg: 'bg-[#1e293b]', label: 'Patterns' },
                    ].map((card) => (
                      <div
                        key={card.label}
                        className={`flex h-20 w-36 flex-col items-center justify-center rounded-lg ${card.bg} border border-border-subtle`}
                      >
                        <div className="mb-2 h-8 w-8 rounded-full bg-interactive-subtle flex items-center justify-center">
                          <IconCircle
                            size="sm"
                            className="h-4 w-4 text-interactive"
                          />
                        </div>
                        <span className="text-xs text-fg-default">
                          {card.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Text
                    as="span"
                    size="xs"
                    className="absolute -top-5 left-0 text-fg-subtle"
                  >
                    Features Grid
                  </Text>
                </div>

                {/* Footer frame */}
                <div
                  className="absolute rounded-lg border border-dashed border-border-default"
                  style={{ top: 320, left: 0, width: 500, height: 50 }}
                >
                  <div className="flex h-full items-center justify-between px-8">
                    <div className="h-5 w-16 rounded bg-white/10" />
                    <div className="flex gap-4">
                      {['Docs', 'GitHub', 'Twitter'].map((link) => (
                        <span key={link} className="text-xs text-fg-subtle">
                          {link}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Text
                    as="span"
                    size="xs"
                    className="absolute -top-5 left-0 text-fg-subtle"
                  >
                    Footer
                  </Text>
                </div>
              </div>
            </div>

            {/* Zoom indicator at bottom */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded bg-surface-raised px-2 py-1">
              <Text as="span" size="xs" className="text-fg-default">
                100%
              </Text>
            </div>
          </div>

          {/* ── Properties Panel (right) ──────────────────────────── */}
          <div className="flex w-70 shrink-0 flex-col border-l border-border-subtle bg-surface-raised overflow-y-auto">
            {/* Header tabs */}
            <div className="flex h-9 shrink-0 items-center border-b border-border-subtle px-3">
              <button
                type="button"
                className="mr-3 text-xs font-semibold text-fg-default border-b-2 border-interactive pb-1"
              >
                Design
              </button>
              <button
                type="button"
                className="mr-3 text-xs text-fg-subtle pb-1 hover:text-fg-default"
              >
                Prototype
              </button>
              <button
                type="button"
                className="text-xs text-fg-subtle pb-1 hover:text-fg-default"
              >
                Inspect
              </button>
            </div>

            {/* Alignment tools row */}
            <div className="flex items-center justify-between border-b border-border-subtle px-4 py-2">
              {[
                'align-left',
                'align-center',
                'align-right',
                'align-top',
                'align-middle',
                'align-bottom',
              ].map((align) => (
                <button
                  key={align}
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded text-fg-subtle hover:bg-white/5 hover:text-fg-default"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <line x1="1" y1="7" x2="13" y2="7" />
                    <line x1="4" y1="3" x2="4" y2="11" />
                  </svg>
                </button>
              ))}
            </div>

            {/* Position & Size */}
            <PropertySection title="Position">
              <div className="grid grid-cols-2 gap-2">
                <PropInput label="X" value="120" />
                <PropInput label="Y" value="80" />
              </div>
            </PropertySection>

            <Divider className="border-border-subtle" />

            <PropertySection title="Size">
              <div className="grid grid-cols-2 gap-2">
                <PropInput label="W" value="320" />
                <PropInput label="H" value="40" />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <PropInput label="Rotation" value="0" className="flex-1" />
                <PropInput label="Radius" value="4" className="flex-1" />
              </div>
            </PropertySection>

            <Divider className="border-border-subtle" />

            {/* Auto Layout */}
            <PropertySection title="Auto layout">
              <div className="flex items-center gap-2">
                <div className="flex h-6 items-center gap-1 rounded bg-white/5 px-2">
                  <svg
                    className="h-3 w-3 text-fg-subtle"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <line x1="6" y1="1" x2="6" y2="11" />
                    <polyline points="3 4 6 1 9 4" />
                    <polyline points="3 8 6 11 9 8" />
                  </svg>
                  <Text as="span" size="xs" className="text-fg-default">
                    Vertical
                  </Text>
                </div>
                <PropInput label="Gap" value="8" className="flex-1" />
                <PropInput label="Pad" value="16" className="flex-1" />
              </div>
            </PropertySection>

            <Divider className="border-border-subtle" />

            {/* Fill */}
            <PropertySection title="Fill">
              <ColorInput color="#1a1a2e" hex="1A1A2E" />
            </PropertySection>

            <Divider className="border-border-subtle" />

            {/* Stroke */}
            <PropertySection title="Stroke">
              <ColorInput color="#ffffff" hex="FFFFFF" opacity="10" />
              <div className="mt-2 grid grid-cols-2 gap-2">
                <PropInput label="Width" value="1" />
                <div className="flex flex-col gap-0.5">
                  <Text as="span" size="xs" className="text-fg-subtle">
                    Style
                  </Text>
                  <div className="flex h-6 items-center rounded bg-white/5 px-2 text-xs text-fg-default">
                    Solid
                  </div>
                </div>
              </div>
            </PropertySection>

            <Divider className="border-border-subtle" />

            {/* Effects */}
            <PropertySection title="Effects" defaultOpen={false}>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1 rounded border border-dashed border-border-default py-1.5 text-xs text-fg-subtle hover:border-border-strong hover:text-fg-default"
              >
                <span>+</span> Add effect
              </button>
            </PropertySection>

            <Divider className="border-border-subtle" />

            {/* Export */}
            <PropertySection title="Export" defaultOpen={false}>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1 rounded border border-dashed border-border-default py-1.5 text-xs text-fg-subtle hover:border-border-strong hover:text-fg-default"
              >
                <span>+</span> Add export
              </button>
            </PropertySection>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

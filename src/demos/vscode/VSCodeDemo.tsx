import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  VSCODE_FILES,
  VSCODE_TABS,
  VSCODE_CODE,
  type VSCodeFile,
} from '@/__fixtures__/strata-data';
import {
  Text,
  Badge,
  Divider,
  IconSearch,
  IconSettings,
  IconFile,
  IconFolder,
  IconCode,
  IconChevronDown,
  IconChevronRight,
  IconX,
  IconCircle,
} from '@/components/primitives';
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/disclosure';

/* ── Syntax highlighter (simple keyword-based) ────────────────── */
function highlightCode(code: string) {
  const lines = code.split('\n');
  return lines.map((line, lineIndex) => {
    const tokens: { text: string; color: string }[] = [];
    let remaining = line;

    // Process line character by character with regex-based tokenization
    while (remaining.length > 0) {
      // Comments (// ...)
      const commentMatch = remaining.match(/^(\/\/.*)/);
      if (commentMatch) {
        tokens.push({ text: commentMatch[1], color: 'text-[#6a9955]' });
        remaining = remaining.slice(commentMatch[1].length);
        continue;
      }

      // Strings (single or double quoted)
      const stringMatch = remaining.match(/^('[^']*'|"[^"]*"|`[^`]*`)/);
      if (stringMatch) {
        tokens.push({ text: stringMatch[1], color: 'text-[#ce9178]' });
        remaining = remaining.slice(stringMatch[1].length);
        continue;
      }

      // Keywords
      const keywordMatch = remaining.match(
        /^(import|export|from|interface|function|return|const|let|type|extends|implements|class|new|if|else|default|as)\b/,
      );
      if (keywordMatch) {
        tokens.push({ text: keywordMatch[1], color: 'text-[#c586c0]' });
        remaining = remaining.slice(keywordMatch[1].length);
        continue;
      }

      // Types / capitalized identifiers
      const typeMatch = remaining.match(
        /^(React|ReactNode|string|number|boolean|void|undefined|null|ButtonProps)\b/,
      );
      if (typeMatch) {
        tokens.push({ text: typeMatch[1], color: 'text-[#4ec9b0]' });
        remaining = remaining.slice(typeMatch[1].length);
        continue;
      }

      // Function calls / function names
      const funcMatch = remaining.match(/^(cn|Button)\b/);
      if (funcMatch) {
        tokens.push({ text: funcMatch[1], color: 'text-[#dcdcaa]' });
        remaining = remaining.slice(funcMatch[1].length);
        continue;
      }

      // JSX tags
      const jsxMatch = remaining.match(/^(<\/?)(button|div|span)\b/);
      if (jsxMatch) {
        tokens.push({ text: jsxMatch[1], color: 'text-[#808080]' });
        tokens.push({ text: jsxMatch[2], color: 'text-[#569cd6]' });
        remaining = remaining.slice(jsxMatch[0].length);
        continue;
      }

      // Property names before :
      const propMatch = remaining.match(/^(\w+)(\??\s*:)/);
      if (propMatch) {
        tokens.push({ text: propMatch[1], color: 'text-[#9cdcfe]' });
        tokens.push({ text: propMatch[2], color: 'text-[#d4d4d4]' });
        remaining = remaining.slice(propMatch[0].length);
        continue;
      }

      // Default: plain text character
      tokens.push({ text: remaining[0], color: 'text-[#d4d4d4]' });
      remaining = remaining.slice(1);
    }

    return (
      <div key={lineIndex} className="flex">
        <span className="inline-block w-12 shrink-0 select-none pr-4 text-right text-fg-subtle">
          {lineIndex + 1}
        </span>
        <span>
          {tokens.map((token, i) => (
            <span key={i} className={token.color}>
              {token.text}
            </span>
          ))}
        </span>
      </div>
    );
  });
}

/* ── File tree node (recursive with Collapsible) ──────────────── */
function FileTreeNode({
  file,
  depth = 0,
}: {
  file: VSCodeFile;
  depth?: number;
}) {
  const [open, setOpen] = useState(depth < 2);
  const paddingLeft = depth * 16 + 8;

  if (file.type === 'folder' && file.children) {
    return (
      <CollapsibleRoot open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex w-full items-center gap-1 py-[2px] text-[13px] text-fg-default hover:bg-surface-overlay"
            style={{ paddingLeft }}
          >
            {open ? (
              <IconChevronDown
                size="sm"
                className="h-4 w-4 shrink-0 text-fg-default"
              />
            ) : (
              <IconChevronRight
                size="sm"
                className="h-4 w-4 shrink-0 text-fg-default"
              />
            )}
            <IconFolder size="sm" className="h-4 w-4 shrink-0 text-[#dcb67a]" />
            <span className="truncate">{file.name}</span>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {file.children.map((child) => (
            <FileTreeNode key={child.id} file={child} depth={depth + 1} />
          ))}
        </CollapsibleContent>
      </CollapsibleRoot>
    );
  }

  // File icon color based on language
  const iconColor =
    file.language === 'typescriptreact' || file.language === 'typescript'
      ? 'text-[#519aba]'
      : file.language === 'css'
        ? 'text-[#a074c4]'
        : file.language === 'json'
          ? 'text-[#cbcb41]'
          : file.language === 'markdown'
            ? 'text-[#519aba]'
            : 'text-fg-default';

  return (
    <button
      type="button"
      className="flex w-full items-center gap-1 py-[2px] text-[13px] text-fg-default hover:bg-surface-overlay"
      style={{ paddingLeft: paddingLeft + 20 }}
    >
      <IconFile size="sm" className={cn('h-4 w-4 shrink-0', iconColor)} />
      <span className="truncate">{file.name}</span>
    </button>
  );
}

/* ── Activity bar icon button ─────────────────────────────────── */
function ActivityIcon({
  icon,
  label,
  active,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}) {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>
        <button
          type="button"
          className={cn(
            'relative flex h-12 w-full items-center justify-center text-fg-subtle transition-colors hover:text-fg-default',
            active &&
              'text-fg-default before:absolute before:left-0 before:top-1/2 before:h-6 before:-translate-y-1/2 before:w-[2px] before:bg-fg-default',
          )}
        >
          {icon}
          {badge != null && (
            <Badge
              variant="default"
              size="sm"
              className="absolute right-1.5 top-2 min-w-[18px] bg-interactive px-1 text-[10px] font-bold text-white"
            >
              {badge}
            </Badge>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </TooltipRoot>
  );
}

/* ── Inline icons for activity bar ────────────────────────────── */
function IconExplorer() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
    </svg>
  );
}

function IconGitBranch() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  );
}

function IconDebug() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function IconExtensions() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </svg>
  );
}

/* ── Terminal icon ────────────────────────────────────────────── */
function IconTerminal() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

/* ── Main VS Code Demo ────────────────────────────────────────── */
export function VSCodeDemo() {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col text-sm">
        {/* ── Main layout (activity bar + sidebar + editor/panel) ── */}
        <div className="flex flex-1 overflow-hidden">
          {/* ── Activity Bar (48px) ────────────────────────────────── */}
          <div className="flex w-12 shrink-0 flex-col bg-surface-raised">
            <div className="flex flex-1 flex-col">
              <ActivityIcon icon={<IconExplorer />} label="Explorer" active />
              <ActivityIcon icon={<IconSearch size="md" />} label="Search" />
              <ActivityIcon
                icon={<IconGitBranch />}
                label="Source Control"
                badge={3}
              />
              <ActivityIcon icon={<IconDebug />} label="Run and Debug" />
              <ActivityIcon icon={<IconExtensions />} label="Extensions" />
            </div>
            <div className="mb-2">
              <ActivityIcon
                icon={<IconSettings size="md" />}
                label="Settings"
              />
            </div>
          </div>

          {/* ── Sidebar (260px) ────────────────────────────────────── */}
          <div className="flex w-[260px] shrink-0 flex-col bg-surface-raised">
            {/* Explorer header */}
            <div className="flex h-9 items-center px-5">
              <Text
                as="span"
                size="xs"
                weight="bold"
                className="uppercase tracking-widest text-fg-default"
              >
                Explorer
              </Text>
            </div>

            {/* Workspace section */}
            <div className="flex h-6 items-center bg-surface-overlay px-2">
              <IconChevronDown
                size="sm"
                className="h-4 w-4 shrink-0 text-fg-default"
              />
              <Text
                as="span"
                size="xs"
                weight="bold"
                className="ml-0.5 uppercase text-fg-default"
              >
                strata
              </Text>
            </div>

            {/* File tree */}
            <div className="flex-1 overflow-y-auto py-1">
              {VSCODE_FILES.map((file) => (
                <FileTreeNode key={file.id} file={file} />
              ))}
            </div>

            {/* Outline / Timeline collapsed sections */}
            <Divider className="border-border-default" />
            <button
              type="button"
              className="flex h-6 items-center gap-1 bg-surface-overlay px-2"
            >
              <IconChevronRight
                size="sm"
                className="h-4 w-4 shrink-0 text-fg-default"
              />
              <Text
                as="span"
                size="xs"
                weight="bold"
                className="uppercase text-fg-default"
              >
                Outline
              </Text>
            </button>
            <button
              type="button"
              className="flex h-6 items-center gap-1 bg-surface-overlay px-2"
            >
              <IconChevronRight
                size="sm"
                className="h-4 w-4 shrink-0 text-fg-default"
              />
              <Text
                as="span"
                size="xs"
                weight="bold"
                className="uppercase text-fg-default"
              >
                Timeline
              </Text>
            </button>
          </div>

          {/* ── Editor + Panel area ────────────────────────────────── */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* ── Tab bar ──────────────────────────────────────────── */}
            <div className="flex h-[35px] shrink-0 items-end bg-surface-overlay">
              {VSCODE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'group flex h-[35px] items-center gap-1.5 border-r border-border-subtle px-3 text-[13px]',
                    activeTab === tab.id
                      ? 'bg-surface-inset text-white'
                      : 'bg-surface-overlay text-fg-muted hover:bg-surface-overlay',
                  )}
                >
                  {/* File type icon */}
                  <IconCode
                    size="sm"
                    className="h-4 w-4 shrink-0 text-[#519aba]"
                  />
                  <span className="truncate">{tab.name}</span>
                  {tab.modified && (
                    <IconCircle
                      size="sm"
                      className="h-2.5 w-2.5 shrink-0 fill-current text-fg-default"
                    />
                  )}
                  {!tab.modified && (
                    <IconX
                      size="sm"
                      className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* ── Breadcrumb bar ────────────────────────────────────── */}
            <div className="flex h-[22px] items-center gap-1 bg-surface-inset px-3 text-[12px] text-fg-default">
              <span className="text-fg-default">src</span>
              <IconChevronRight size="sm" className="h-3 w-3 text-fg-subtle" />
              <span className="text-fg-default">components</span>
              <IconChevronRight size="sm" className="h-3 w-3 text-fg-subtle" />
              <span className="text-fg-default">Button.tsx</span>
            </div>

            {/* ── Code editor ──────────────────────────────────────── */}
            <div className="flex-1 overflow-auto bg-surface-inset px-4 py-2 font-mono text-[13px] leading-[20px]">
              {highlightCode(VSCODE_CODE)}
            </div>

            {/* ── Panel (bottom) ───────────────────────────────────── */}
            <div className="h-[200px] shrink-0 border-t border-border-default bg-surface-inset">
              <TabsRoot defaultValue="terminal">
                <TabsList className="flex h-[35px] items-center gap-0 border-b border-border-default bg-surface-inset px-2">
                  <TabsTrigger
                    value="problems"
                    className="flex items-center gap-1.5 border-b-2 border-transparent px-3 py-1.5 text-[12px] text-fg-muted transition-colors data-[state=active]:border-fg-default data-[state=active]:text-fg-default"
                  >
                    Problems
                    <Badge
                      variant="default"
                      size="sm"
                      className="bg-surface-overlay px-1 text-[10px] text-fg-default"
                    >
                      0
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger
                    value="output"
                    className="flex items-center gap-1.5 border-b-2 border-transparent px-3 py-1.5 text-[12px] text-fg-muted transition-colors data-[state=active]:border-fg-default data-[state=active]:text-fg-default"
                  >
                    Output
                  </TabsTrigger>
                  <TabsTrigger
                    value="terminal"
                    className="flex items-center gap-1.5 border-b-2 border-transparent px-3 py-1.5 text-[12px] text-fg-muted transition-colors data-[state=active]:border-fg-default data-[state=active]:text-fg-default"
                  >
                    Terminal
                  </TabsTrigger>
                  <TabsTrigger
                    value="debug-console"
                    className="flex items-center gap-1.5 border-b-2 border-transparent px-3 py-1.5 text-[12px] text-fg-muted transition-colors data-[state=active]:border-fg-default data-[state=active]:text-fg-default"
                  >
                    Debug Console
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="problems"
                  className="p-3 text-[13px] text-fg-default"
                >
                  <Text as="p" size="xs" className="text-fg-subtle">
                    No problems have been detected in the workspace.
                  </Text>
                </TabsContent>

                <TabsContent
                  value="output"
                  className="p-3 text-[13px] text-fg-default"
                >
                  <Text as="p" size="xs" className="text-fg-subtle">
                    [Info] TypeScript language server started.
                  </Text>
                </TabsContent>

                <TabsContent
                  value="terminal"
                  className="p-3 font-mono text-[13px]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-fg-default">
                      <IconTerminal />
                      <span className="text-fg-subtle">~/strata</span>
                    </div>
                    <div className="text-fg-default">
                      <span className="text-[#6a9955]">$</span> npm run dev
                    </div>
                    <div className="text-[#569cd6]">
                      VITE v7.0.0 ready in 142ms
                    </div>
                    <div className="text-fg-default">
                      <span className="text-fg-subtle"> ➜</span>{' '}
                      <span className="font-bold">Local:</span>{' '}
                      <span className="text-[#569cd6]">
                        http://localhost:5173/
                      </span>
                    </div>
                    <div className="text-fg-default">
                      <span className="text-fg-subtle"> ➜</span>{' '}
                      <span className="text-fg-subtle">Network:</span>{' '}
                      <span className="text-fg-subtle">
                        use --host to expose
                      </span>
                    </div>
                    <div className="text-fg-default">
                      <span className="text-fg-subtle"> ➜</span> press{' '}
                      <span className="font-bold">h + enter</span> to show help
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="debug-console"
                  className="p-3 text-[13px] text-fg-default"
                >
                  <Text as="p" size="xs" className="text-fg-subtle">
                    No debug session active.
                  </Text>
                </TabsContent>
              </TabsRoot>
            </div>
          </div>
        </div>

        {/* ── Status Bar (22px, full-width) ────────────────────────── */}
        <div className="flex h-[22px] shrink-0 items-center justify-between bg-interactive px-2 text-[12px] text-white">
          {/* Left side */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1 hover:bg-interactive-hover px-1 -mx-1 rounded-sm"
            >
              <IconGitBranch />
              <span>main</span>
            </button>
            <button
              type="button"
              className="flex items-center gap-1 hover:bg-interactive-hover px-1 rounded-sm"
            >
              <IconCircle size="sm" className="h-3 w-3" />
              <span>0</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>0</span>
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hover:bg-interactive-hover px-1 rounded-sm"
            >
              Ln 1, Col 1
            </button>
            <button
              type="button"
              className="hover:bg-interactive-hover px-1 rounded-sm"
            >
              Spaces: 2
            </button>
            <button
              type="button"
              className="hover:bg-interactive-hover px-1 rounded-sm"
            >
              UTF-8
            </button>
            <button
              type="button"
              className="hover:bg-interactive-hover px-1 rounded-sm"
            >
              TypeScript React
            </button>
            <button
              type="button"
              className="hover:bg-interactive-hover px-1 rounded-sm"
            >
              Prettier
            </button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

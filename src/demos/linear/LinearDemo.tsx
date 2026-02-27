import { useState } from 'react';

import type { LinearIssue } from '@/__fixtures__/strata-data';
import { LINEAR_ISSUES, LINEAR_VIEWS } from '@/__fixtures__/strata-data';
import {
  AppShell,
  Sidebar,
  SidebarSection,
  SidebarItem,
  TopBar,
} from '@/components/layout';
import {
  Button,
  Text,
  Divider,
  IconInbox,
  IconList,
  IconCircle,
  IconFilter,
  IconPlus,
  IconUser,
} from '@/components/primitives';

import { IssueList } from './IssueList';
import { IssueDetail } from './IssueDetail';

// -- Sidebar icon map per view label ---------------------------------------

const VIEW_ICONS: Record<string, React.ReactNode> = {
  'My Issues': <IconInbox size="sm" />,
  'All Issues': <IconList size="sm" />,
  Active: <IconCircle size="sm" />,
  Backlog: <IconCircle size="sm" />,
};

// -- Component -------------------------------------------------------------

export function LinearDemo() {
  const [selectedIssue, setSelectedIssue] = useState<LinearIssue>(
    LINEAR_ISSUES[0],
  );

  return (
    <AppShell>
      {/* ── Sidebar (220px) ─────────────────────────────────────────── */}
      <Sidebar className="w-[220px]">
        <SidebarSection title="Workspace">
          {LINEAR_VIEWS.map((view, i) => (
            <SidebarItem
              key={view.label}
              icon={VIEW_ICONS[view.label]}
              label={view.label}
              active={i === 0}
              badge={view.count}
            />
          ))}
        </SidebarSection>

        <Divider className="my-2" />

        <SidebarSection title="Teams">
          <SidebarItem icon={<IconUser size="sm" />} label="Engineering" />
          <SidebarItem icon={<IconUser size="sm" />} label="Design" />
        </SidebarSection>
      </Sidebar>

      {/* ── Main area ───────────────────────────────────────────────── */}
      <main className="flex flex-1 flex-col">
        {/* Top bar */}
        <TopBar>
          <Text as="h1" size="lg" weight="semibold" className="mr-auto">
            Issues
          </Text>
          <Button variant="outline" size="sm">
            <IconFilter size="sm" />
            Filter
          </Button>
          <Button variant="solid" size="sm">
            <IconPlus size="sm" />
            New Issue
          </Button>
        </TopBar>

        {/* Body: issue list + detail */}
        <div className="flex flex-1 overflow-hidden">
          <IssueList
            issues={LINEAR_ISSUES}
            selectedId={selectedIssue.id}
            onSelect={setSelectedIssue}
          />
          <IssueDetail issue={selectedIssue} />
        </div>
      </main>
    </AppShell>
  );
}

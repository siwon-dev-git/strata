import type { LinearIssue } from '@/__fixtures__/strata-data';

import { cn } from '@/lib/utils';
import { Text, Avatar, Badge } from '@/components/primitives';

// -- Badge variant mappings ------------------------------------------------

const STATUS_VARIANT = {
  backlog: 'default',
  todo: 'default',
  'in-progress': 'interactive',
  done: 'success',
  cancelled: 'danger',
} as const satisfies Record<LinearIssue['status'], string>;

const STATUS_LABEL = {
  backlog: 'Backlog',
  todo: 'Todo',
  'in-progress': 'In Progress',
  done: 'Done',
  cancelled: 'Cancelled',
} as const satisfies Record<LinearIssue['status'], string>;

const PRIORITY_VARIANT = {
  urgent: 'danger',
  high: 'warning',
  medium: 'interactive',
  low: 'default',
} as const satisfies Record<LinearIssue['priority'], string>;

// -- Component -------------------------------------------------------------

interface IssueListProps {
  issues: LinearIssue[];
  selectedId: string;
  onSelect: (issue: LinearIssue) => void;
}

export function IssueList({ issues, selectedId, onSelect }: IssueListProps) {
  return (
    <div className="w-[360px] border-r border-border-subtle overflow-y-auto">
      {issues.map((issue) => (
        <button
          key={issue.id}
          type="button"
          onClick={() => onSelect(issue)}
          className={cn(
            'flex flex-col gap-1 w-full px-4 py-3 text-left border-b border-border-subtle hover:bg-surface-raised transition-colors',
            issue.id === selectedId && 'bg-surface-raised',
          )}
        >
          {/* Identifier */}
          <Text as="span" size="xs" color="subtle">
            {issue.identifier}
          </Text>

          {/* Title */}
          <Text as="span" size="sm" color="default" className="truncate">
            {issue.title}
          </Text>

          {/* Bottom row: status + assignee + label */}
          <div className="flex items-center gap-2 mt-0.5">
            <Badge variant={STATUS_VARIANT[issue.status]} size="sm">
              {STATUS_LABEL[issue.status]}
            </Badge>

            <Avatar
              name={issue.assignee.name}
              alt={issue.assignee.name}
              src={issue.assignee.avatar}
              size="sm"
            />

            <Badge variant={PRIORITY_VARIANT[issue.priority]} size="sm">
              {issue.label}
            </Badge>
          </div>
        </button>
      ))}
    </div>
  );
}

import type { LinearIssue } from '@/__fixtures__/strata-data';

import { Stack } from '@/components/layout';
import { Text, Avatar, Badge, Button, Divider } from '@/components/primitives';

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

const PRIORITY_LABEL = {
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
} as const satisfies Record<LinearIssue['priority'], string>;

// -- Component -------------------------------------------------------------

interface IssueDetailProps {
  issue: LinearIssue;
}

export function IssueDetail({ issue }: IssueDetailProps) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <Stack direction="col" gap={6}>
        {/* Header */}
        <Stack direction="col" gap={1}>
          <Text as="span" size="sm" color="muted">
            {issue.identifier}
          </Text>
          <Text as="h2" size="xl" weight="semibold">
            {issue.title}
          </Text>
        </Stack>

        {/* Metadata row */}
        <Stack direction="row" gap={4} align="center">
          <Badge variant={STATUS_VARIANT[issue.status]}>
            {STATUS_LABEL[issue.status]}
          </Badge>
          <Badge variant={PRIORITY_VARIANT[issue.priority]}>
            {PRIORITY_LABEL[issue.priority]}
          </Badge>
          <Badge>{issue.label}</Badge>
        </Stack>

        <Divider />

        {/* Description */}
        <Text as="p" color="muted">
          {issue.description}
        </Text>

        {/* Assignee */}
        <Stack direction="row" gap={2} align="center">
          <Avatar
            name={issue.assignee.name}
            alt={issue.assignee.name}
            src={issue.assignee.avatar}
            size="md"
          />
          <Text as="span" size="sm" weight="medium">
            {issue.assignee.name}
          </Text>
        </Stack>

        {/* Action buttons */}
        <Stack direction="row" gap={3}>
          <Button variant="solid">Update Status</Button>
          <Button variant="outline">Assign</Button>
          <Button variant="ghost">Archive</Button>
        </Stack>
      </Stack>
    </div>
  );
}

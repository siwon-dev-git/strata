'use client';

import { Container } from '@/components/layout/Container/Container';
import { TopBar } from '@/components/layout/TopBar/TopBar';
import { Card, CardHeader, CardBody } from '@/components/primitives/Card/Card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/primitives/Table/Table';
import { Badge } from '@/components/primitives/Badge/Badge';
import { Button } from '@/components/primitives/Button/Button';
import { Heading } from '@/components/primitives/Heading/Heading';
import { Text } from '@/components/primitives/Text/Text';
import {
  IconArrowUp,
  IconArrowDown,
  IconRefresh,
  IconFilter,
  IconDownload,
} from '@/components/primitives/Icon/Icon';

/**
 * DataDashboard Recipe
 *
 * Pattern: TopBar + Container + Card grid + Table
 * Use case: Analytics dashboards, admin panels, data overview pages
 */
export function DataDashboard() {
  return (
    <div className="flex flex-col h-full">
      <TopBar>
        <Heading level={3}>Dashboard</Heading>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm">
            <IconFilter size="sm" />
            Filter
          </Button>
          <Button variant="ghost" size="sm">
            <IconDownload size="sm" />
            Export
          </Button>
          <Button size="sm">
            <IconRefresh size="sm" />
            Refresh
          </Button>
        </div>
      </TopBar>

      <Container className="py-6 space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Total Users" value="12,847" change={+12.5} />
          <MetricCard title="Active Sessions" value="1,234" change={+3.2} />
          <MetricCard title="Revenue" value="$48,290" change={-2.1} />
          <MetricCard title="Conversion" value="3.24%" change={+0.8} />
        </div>

        {/* Recent Activity Table */}
        <Card>
          <CardHeader>
            <Heading level={4}>Recent Activity</Heading>
          </CardHeader>
          <CardBody>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Alice Kim</TableCell>
                  <TableCell>Created project</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <Text as="span" size="sm" color="muted">
                      2 min ago
                    </Text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bob Lee</TableCell>
                  <TableCell>Updated settings</TableCell>
                  <TableCell>
                    <Badge variant="warning">Pending</Badge>
                  </TableCell>
                  <TableCell>
                    <Text as="span" size="sm" color="muted">
                      15 min ago
                    </Text>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Carol Park</TableCell>
                  <TableCell>Deleted item</TableCell>
                  <TableCell>
                    <Badge variant="default">Archived</Badge>
                  </TableCell>
                  <TableCell>
                    <Text as="span" size="sm" color="muted">
                      1 hour ago
                    </Text>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}

function MetricCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: number;
}) {
  const isPositive = change >= 0;
  return (
    <Card>
      <CardBody className="p-4">
        <Text size="sm" color="muted">
          {title}
        </Text>
        <div className="flex items-baseline gap-2 mt-1">
          <Heading level={3}>{value}</Heading>
          <span
            className={`flex items-center text-xs ${isPositive ? 'text-success' : 'text-danger'}`}
          >
            {isPositive ? (
              <IconArrowUp size="sm" />
            ) : (
              <IconArrowDown size="sm" />
            )}
            {Math.abs(change)}%
          </span>
        </div>
      </CardBody>
    </Card>
  );
}

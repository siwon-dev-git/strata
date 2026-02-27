import type { Meta, StoryObj } from '@storybook/react-vite';

import { DataList } from '.';

const meta = {
  title: 'Primitives/DataList',
  component: DataList.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof DataList.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DataList.Root className="w-80">
      <DataList.Item>
        <DataList.Label>Status</DataList.Label>
        <DataList.Value>In Progress</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Assignee</DataList.Label>
        <DataList.Value>Sarah Kim</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Priority</DataList.Label>
        <DataList.Value>High</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Label</DataList.Label>
        <DataList.Value>Frontend</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label>Due Date</DataList.Label>
        <DataList.Value>Mar 15, 2026</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  ),
};

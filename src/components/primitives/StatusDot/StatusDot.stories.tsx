import type { Meta, StoryObj } from '@storybook/react-vite';

import { StatusDot } from './StatusDot';

const meta = {
  title: 'Primitives/StatusDot',
  component: StatusDot,
  tags: ['autodocs'],
} satisfies Meta<typeof StatusDot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'online',
  },
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <StatusDot status="online" />
        <span className="text-sm">Online</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusDot status="idle" />
        <span className="text-sm">Idle</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusDot status="dnd" />
        <span className="text-sm">Do Not Disturb</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusDot status="offline" />
        <span className="text-sm">Offline</span>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {
    status: 'online',
  },
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <StatusDot status="online" size="sm" />
        <span className="text-sm">Small</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusDot status="online" size="md" />
        <span className="text-sm">Medium</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusDot status="online" size="lg" />
        <span className="text-sm">Large</span>
      </div>
    </div>
  ),
};

export const Online: Story = {
  args: { status: 'online' },
};

export const Idle: Story = {
  args: { status: 'idle' },
};

export const DoNotDisturb: Story = {
  args: { status: 'dnd' },
};

export const Offline: Story = {
  args: { status: 'offline' },
};

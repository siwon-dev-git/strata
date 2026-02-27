import type { Meta, StoryObj } from '@storybook/react-vite';

import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: 200,
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: 40,
    height: 40,
  },
};

export const Rect: Story = {
  args: {
    variant: 'rect',
    width: 200,
    height: 120,
  },
};

export const CardPlaceholder: Story = {
  render: () => (
    <div className="flex gap-3 w-80 rounded-lg border border-border-subtle p-4">
      <Skeleton variant="circle" width={40} height={40} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { Separator } from './Separator';

const meta = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-fg-default">Section above</p>
      <Separator />
      <p className="text-sm text-fg-default">Section below</p>
    </div>
  ),
  args: { children: null },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4">
      <span className="text-sm text-fg-default">Left</span>
      <Separator orientation="vertical" />
      <span className="text-sm text-fg-default">Right</span>
    </div>
  ),
  args: { children: null },
};

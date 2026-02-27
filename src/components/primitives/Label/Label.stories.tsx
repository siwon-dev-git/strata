import type { Meta, StoryObj } from '@storybook/react-vite';

import { Label } from './Label';

const meta = {
  title: 'Primitives/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Email address',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email address</Label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="rounded border border-[--border-default] bg-[--bg-surface] px-3 py-1.5 text-sm"
      />
    </div>
  ),
  args: { children: null },
};

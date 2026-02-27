import type { Meta, StoryObj } from '@storybook/react-vite';

import { Kbd } from './Kbd';

const meta = {
  title: 'Primitives/Kbd',
  component: Kbd,
  tags: ['autodocs'],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '⌘C',
  },
  render: () => (
    <div className="flex items-center gap-3">
      <Kbd>⌘C</Kbd>
      <Kbd>⌘V</Kbd>
      <Kbd>Ctrl+Shift+P</Kbd>
    </div>
  ),
};

export const SingleKey: Story = {
  args: {
    children: 'Esc',
  },
};

export const Combination: Story = {
  args: {
    children: '⌘',
  },
  render: () => (
    <span className="text-sm text-fg-muted">
      Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open command palette
    </span>
  ),
};

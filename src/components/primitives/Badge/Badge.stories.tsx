import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Badge } from './Badge';

const meta = {
  title: 'Primitives/Badge',
  component: Badge,
  tags: ['autodocs'],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Badge');
    await expect(badge).toBeInTheDocument();
  },
};

export const AllVariants: Story = {
  args: {
    children: 'Badge',
  },
  render: () => (
    <div className="flex items-center gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="interactive">Interactive</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {
    children: 'Badge',
  },
  render: () => (
    <div className="flex items-center gap-3">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
    </div>
  ),
};

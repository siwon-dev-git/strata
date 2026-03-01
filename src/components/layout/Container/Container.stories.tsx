import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Container } from './Container';
import { Text } from '@/components/primitives';

const meta = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="rounded-md border border-border-default bg-surface-raised p-4">
        <Text>Container with default (lg) max-width.</Text>
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/container with default/i)).toBeVisible();
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: (
      <div className="rounded-md border border-border-default bg-surface-raised p-4">
        <Text>Container with small (640px) max-width.</Text>
      </div>
    ),
  },
};

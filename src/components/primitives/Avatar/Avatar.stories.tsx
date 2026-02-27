import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Avatar } from './Avatar';

const meta = {
  title: 'Primitives/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Jane Doe',
    alt: 'Jane Doe avatar',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const initials = canvas.getByText('JD');
    await expect(initials).toBeInTheDocument();
  },
};

export const WithImage: Story = {
  args: {
    name: 'Jane Doe',
    alt: 'Jane Doe avatar',
    src: 'https://i.pravatar.cc/150?u=jane',
  },
};

export const AllSizes: Story = {
  args: {
    name: 'User',
    alt: 'User avatar',
  },
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar name="Small User" alt="Small" size="sm" />
      <Avatar name="Medium User" alt="Medium" size="md" />
      <Avatar name="Large User" alt="Large" size="lg" />
    </div>
  ),
};

export const Group: Story = {
  args: {
    name: 'User',
    alt: 'User avatar',
  },
  render: () => (
    <div className="flex items-center -space-x-2">
      <Avatar name="Alice Smith" alt="Alice" />
      <Avatar name="Bob Jones" alt="Bob" />
      <Avatar name="Carol White" alt="Carol" />
    </div>
  ),
};

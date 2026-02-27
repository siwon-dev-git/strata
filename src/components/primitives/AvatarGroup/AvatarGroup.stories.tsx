import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { AvatarGroup } from './AvatarGroup';
import { Avatar } from '../Avatar/Avatar';

const meta = {
  title: 'Primitives/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <AvatarGroup>
      <Avatar name="Alice Smith" alt="Alice" />
      <Avatar name="Bob Jones" alt="Bob" />
      <Avatar name="Carol White" alt="Carol" />
      <Avatar name="David Brown" alt="David" />
      <Avatar name="Eve Davis" alt="Eve" />
    </AvatarGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('AS')).toBeInTheDocument();
    await expect(canvas.getByText('BJ')).toBeInTheDocument();
    await expect(canvas.getByText('CW')).toBeInTheDocument();
    await expect(canvas.getByText('DB')).toBeInTheDocument();
    await expect(canvas.getByText('ED')).toBeInTheDocument();
  },
};

export const WithMax: Story = {
  args: { children: null },
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="Alice Smith" alt="Alice" />
      <Avatar name="Bob Jones" alt="Bob" />
      <Avatar name="Carol White" alt="Carol" />
      <Avatar name="David Brown" alt="David" />
      <Avatar name="Eve Davis" alt="Eve" />
    </AvatarGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('AS')).toBeInTheDocument();
    await expect(canvas.getByText('BJ')).toBeInTheDocument();
    await expect(canvas.getByText('CW')).toBeInTheDocument();
    await expect(canvas.getByText('+2')).toBeInTheDocument();
  },
};

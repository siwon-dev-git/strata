import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Primitives/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const Small: Story = {
  args: {
    value: 45,
    size: 'sm',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <ProgressBar value={0} />
      <ProgressBar value={25} />
      <ProgressBar value={50} />
      <ProgressBar value={75} />
      <ProgressBar value={100} />
    </div>
  ),
};

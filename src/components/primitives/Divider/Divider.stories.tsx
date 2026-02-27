import type { Meta, StoryObj } from '@storybook/react-vite';

import { Divider } from './Divider';
import { Text } from '../Text/Text';

const meta = {
  title: 'Primitives/Divider',
  component: Divider,
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Text size="sm">Above</Text>
        <div className="my-3">
          <Story />
        </div>
        <Text size="sm">Below</Text>
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className="flex h-8 items-center gap-3">
        <Text size="sm">Left</Text>
        <Story />
        <Text size="sm">Right</Text>
      </div>
    ),
  ],
};

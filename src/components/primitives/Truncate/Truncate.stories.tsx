import type { Meta, StoryObj } from '@storybook/react-vite';

import { Truncate } from './Truncate';

const meta = {
  title: 'Primitives/Truncate',
  component: Truncate,
  tags: ['autodocs'],
} satisfies Meta<typeof Truncate>;

export default meta;
type Story = StoryObj<typeof meta>;

const LONG_TEXT =
  'Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values in order to maintain a scalable and consistent visual system for UI development.';

export const Default: Story = {
  args: {
    children: LONG_TEXT,
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

export const MultiLine: Story = {
  args: {
    children: LONG_TEXT,
    maxLines: 3,
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
};

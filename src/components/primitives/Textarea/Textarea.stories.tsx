import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';

import { Textarea } from './Textarea';

const meta = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText('Enter your message...');
    await expect(textarea).toBeInTheDocument();
    await userEvent.type(textarea, 'Hello world');
    await expect(textarea).toHaveValue('Hello world');
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Required field',
    error: true,
    defaultValue: 'Invalid content',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Textarea size="sm" placeholder="Small textarea" />
      <Textarea size="md" placeholder="Medium textarea" />
      <Textarea size="lg" placeholder="Large textarea" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
};

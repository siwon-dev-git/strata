import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';

import { IconSearch } from '../Icon/Icon';

import { Input, InputGroup } from './Input';

const meta = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Enter text...');
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, 'Hello world');
    await expect(input).toHaveValue('Hello world');
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Invalid input',
    error: true,
    defaultValue: 'bad-email',
  },
};

export const WithPrefix: Story = {
  render: () => (
    <InputGroup prefix={<IconSearch size="sm" />}>
      <Input placeholder="Search..." className="pl-9" />
    </InputGroup>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-xs">
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

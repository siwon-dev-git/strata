import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from './Popover';
import { Button, Text, Input } from '@/components/primitives';

const meta = {
  title: 'Disclosure/Popover',
  component: PopoverContent,
  tags: ['autodocs'],
} satisfies Meta<typeof PopoverContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Text weight="semibold" size="sm">
          Settings
        </Text>
        <Text size="xs" color="muted" className="mt-1">
          Adjust your preferences.
        </Text>
        <div className="mt-3 space-y-2">
          <Input placeholder="Display name" />
          <Input placeholder="Email" />
        </div>
        <PopoverClose />
      </PopoverContent>
    </PopoverRoot>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { TopBar } from './TopBar';
import { Text, Button, IconBell, IconSearch } from '@/components/primitives';

const meta = {
  title: 'Layout/TopBar',
  component: TopBar,
  tags: ['autodocs'],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Text weight="semibold" size="sm">
          Dashboard
        </Text>
        <div className="flex-1" />
        <Button variant="ghost" size="sm">
          <IconSearch size="sm" />
        </Button>
        <Button variant="ghost" size="sm">
          <IconBell size="sm" />
        </Button>
      </>
    ),
  },
};

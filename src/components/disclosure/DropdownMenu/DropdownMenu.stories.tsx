import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';

import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './DropdownMenu';
import {
  Button,
  IconSettings,
  IconUser,
  IconMail,
} from '@/components/primitives';

const meta = {
  title: 'Disclosure/DropdownMenu',
  component: DropdownMenuRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenuRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Notifications</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open menu/i });

    // Click trigger to open menu
    await userEvent.click(trigger);

    // Verify menu content is visible (renders in portal)
    const body = within(document.body);
    const menu = await body.findByRole('menu');
    await expect(menu).toBeVisible();
  },
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        <Button>Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuItem icon={<IconUser />} shortcut="Ctrl+P">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem icon={<IconSettings />} shortcut="Ctrl+,">
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem icon={<IconMail />} shortcut="Ctrl+N">
          Notifications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  ),
};

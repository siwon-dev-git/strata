import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';

import {
  MenubarRoot,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from './Menubar';

const meta = {
  title: 'Disclosure/Menubar',
  component: MenubarRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof MenubarRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('menuitem', { name: /file/i });
    await userEvent.click(trigger);

    const body = within(document.body);
    const menu = await body.findByRole('menu');
    await expect(menu).toBeVisible();
  },
  render: () => (
    <MenubarRoot>
      {/* File menu */}
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="Ctrl+N">New</MenubarItem>
          <MenubarItem shortcut="Ctrl+O">Open</MenubarItem>
          <MenubarItem shortcut="Ctrl+S">Save</MenubarItem>
          <MenubarSeparator />
          <MenubarItem shortcut="Alt+F4">Exit</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Edit menu */}
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="Ctrl+Z">Undo</MenubarItem>
          <MenubarItem shortcut="Ctrl+Y">Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem shortcut="Ctrl+X">Cut</MenubarItem>
          <MenubarItem shortcut="Ctrl+C">Copy</MenubarItem>
          <MenubarItem shortcut="Ctrl+V">Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* View menu */}
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem shortcut="Ctrl++">Zoom In</MenubarItem>
          <MenubarItem shortcut="Ctrl+-">Zoom Out</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </MenubarRoot>
  ),
};

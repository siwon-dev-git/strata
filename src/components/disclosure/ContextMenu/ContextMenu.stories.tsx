import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
} from './ContextMenu';

const meta = {
  title: 'Disclosure/ContextMenu',
  component: ContextMenuRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenuRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ContextMenuRoot>
      <ContextMenuTrigger asChild>
        <div className="flex h-40 w-72 items-center justify-center rounded-md border border-dashed border-[--border-default] text-sm text-[--fg-subtle]">
          Right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuItem shortcut="Ctrl+E">Edit</ContextMenuItem>
        <ContextMenuItem shortcut="Ctrl+C">Copy</ContextMenuItem>
        <ContextMenuItem shortcut="Ctrl+V">Paste</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem shortcut="Del">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuRoot>
  ),
  args: { children: undefined },
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import { ScrollArea } from './ScrollArea';

const meta = {
  title: 'Primitives/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-64 rounded-md border border-[--border-default] p-4">
      <div className="space-y-2">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="rounded px-3 py-2 text-sm text-[--fg-default] hover:bg-[--bg-hover]"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  args: { children: undefined },
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea
      orientation="horizontal"
      className="w-80 rounded-md border border-[--border-default]"
    >
      <div className="flex gap-3 p-4" style={{ width: 1200 }}>
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="flex h-20 w-24 shrink-0 items-center justify-center rounded-md bg-[--bg-subtle] text-sm text-[--fg-default]"
          >
            Card {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
  args: { children: undefined },
};

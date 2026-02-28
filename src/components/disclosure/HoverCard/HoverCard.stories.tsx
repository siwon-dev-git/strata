import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';

import { HoverCardRoot, HoverCardTrigger, HoverCardContent } from './HoverCard';
import { Avatar } from '@/components/primitives';

const meta = {
  title: 'Disclosure/HoverCard',
  component: HoverCardRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof HoverCardRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <HoverCardRoot>
        <HoverCardTrigger asChild>
          <a href="#" className="text-fg-accent underline text-sm font-medium">
            @johndoe
          </a>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex gap-3">
            <Avatar name="John Doe" alt="John Doe" size="md" />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-fg-default">John Doe</p>
              <p className="text-xs text-fg-muted">
                Software Engineer. Building great UI components.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCardRoot>
    </div>
  ),
  args: { children: null },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('@johndoe');
    await expect(trigger).toBeInTheDocument();

    await userEvent.hover(trigger);
    const body = within(document.body);
    const card = await body.findByText('John Doe');
    await expect(card).toBeVisible();
  },
};

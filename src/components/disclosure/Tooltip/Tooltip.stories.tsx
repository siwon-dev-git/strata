import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactRenderer } from '@storybook/react-vite';
import type { DecoratorFunction } from 'storybook/internal/types';
import { expect, within, userEvent } from 'storybook/test';

import { TooltipProvider, SimpleTooltip } from './Tooltip';
import { Button } from '@/components/primitives';

const withTooltipProvider: DecoratorFunction<ReactRenderer> = (Story) => (
  <TooltipProvider>
    <Story />
  </TooltipProvider>
);

const meta = {
  title: 'Disclosure/Tooltip',
  component: SimpleTooltip,
  tags: ['autodocs'],
  decorators: [withTooltipProvider],
} satisfies Meta<typeof SimpleTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'Helpful tooltip text',
    children: <Button>Hover me</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /hover me/i });

    // Hover the trigger
    await userEvent.hover(trigger);

    // Verify tooltip appears
    const body = within(document.body);
    const tooltip = await body.findByRole('tooltip');
    await expect(tooltip).toHaveTextContent('Helpful tooltip text');

    // Unhover
    await userEvent.unhover(trigger);
  },
};

export const AllSides: Story = {
  args: {
    content: 'Tooltip',
    children: <Button>Hover</Button>,
  },
  render: () => (
    <div className="flex items-center justify-center gap-8 p-20">
      <SimpleTooltip content="Top tooltip" side="top">
        <Button variant="outline">Top</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Bottom tooltip" side="bottom">
        <Button variant="outline">Bottom</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Left tooltip" side="left">
        <Button variant="outline">Left</Button>
      </SimpleTooltip>
      <SimpleTooltip content="Right tooltip" side="right">
        <Button variant="outline">Right</Button>
      </SimpleTooltip>
    </div>
  ),
};

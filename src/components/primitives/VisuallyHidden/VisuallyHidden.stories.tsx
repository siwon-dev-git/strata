import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { VisuallyHidden } from './VisuallyHidden';

const meta = {
  title: 'Primitives/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This text is only for screen readers',
  },
  render: (args) => (
    <div>
      <p className="text-fg-muted text-sm mb-2">
        The text below is visually hidden but accessible to screen readers:
      </p>
      <VisuallyHidden {...args} />
      <p className="text-fg-subtle text-xs mt-2">
        (Inspect the DOM to see the hidden span element)
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hidden = canvas.getByText('This text is only for screen readers');
    await expect(hidden).toBeInTheDocument();
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Code } from './Code';

const meta = {
  title: 'Primitives/Code',
  component: Code,
  tags: ['autodocs'],
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'npm install',
  },
  render: (args) => (
    <p className="text-fg-default text-base">
      Run <Code {...args} /> to install dependencies.
    </p>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const code = canvas.getByText('npm install');
    await expect(code).toBeInTheDocument();
  },
};

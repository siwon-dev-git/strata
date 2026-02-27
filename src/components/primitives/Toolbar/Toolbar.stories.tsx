import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  ToolbarRoot,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from './Toolbar';

const meta = {
  title: 'Primitives/Toolbar',
  component: ToolbarRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof ToolbarRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: () => (
    <ToolbarRoot>
      <ToolbarToggleGroup type="multiple">
        <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
        <ToolbarToggleItem value="italic">Italic</ToolbarToggleItem>
        <ToolbarToggleItem value="underline">Underline</ToolbarToggleItem>
      </ToolbarToggleGroup>
      <ToolbarSeparator />
      <ToolbarToggleGroup type="single">
        <ToolbarToggleItem value="left">Align Left</ToolbarToggleItem>
        <ToolbarToggleItem value="center">Align Center</ToolbarToggleItem>
        <ToolbarToggleItem value="right">Align Right</ToolbarToggleItem>
      </ToolbarToggleGroup>
    </ToolbarRoot>
  ),
};

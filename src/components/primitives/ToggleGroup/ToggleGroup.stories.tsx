import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toggle, ToggleGroupRoot, ToggleGroupItem } from './ToggleGroup';

const meta = {
  title: 'Primitives/ToggleGroup',
  component: ToggleGroupRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof ToggleGroupRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToggleGroupRoot type="single" defaultValue="list">
      <ToggleGroupItem value="list">List</ToggleGroupItem>
      <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      <ToggleGroupItem value="board">Board</ToggleGroupItem>
    </ToggleGroupRoot>
  ),
  args: { type: 'single', children: undefined },
};

export const Outline: Story = {
  render: () => (
    <ToggleGroupRoot type="single" defaultValue="grid">
      <ToggleGroupItem value="list" variant="outline">
        List
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" variant="outline">
        Grid
      </ToggleGroupItem>
      <ToggleGroupItem value="board" variant="outline">
        Board
      </ToggleGroupItem>
    </ToggleGroupRoot>
  ),
  args: { type: 'single', children: undefined },
};

export const Multiple: Story = {
  render: () => (
    <ToggleGroupRoot type="multiple" defaultValue={['bold', 'italic']}>
      <ToggleGroupItem value="bold" size="sm">
        B
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" size="sm">
        I
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" size="sm">
        U
      </ToggleGroupItem>
    </ToggleGroupRoot>
  ),
  args: { type: 'multiple', children: undefined },
};

export const SingleToggle: Story = {
  render: () => <Toggle>Mute</Toggle>,
  args: { type: 'single', children: undefined },
};

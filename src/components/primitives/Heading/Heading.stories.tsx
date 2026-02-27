import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Heading } from './Heading';

const meta = {
  title: 'Primitives/Heading',
  component: Heading,
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    level: 2,
    children: 'Section Heading',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = canvas.getByText('Section Heading');
    await expect(heading).toBeInTheDocument();
    await expect(heading.tagName).toBe('H2');
  },
};

export const AllLevels: Story = {
  args: {
    children: 'Heading',
  },
  render: () => (
    <div className="flex flex-col gap-3">
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Heading Level 1').tagName).toBe('H1');
    await expect(canvas.getByText('Heading Level 6').tagName).toBe('H6');
  },
};

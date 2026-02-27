import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Stack } from './Stack';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

function Box({ children }: { children: string }) {
  return (
    <div className="bg-interactive-subtle p-4 rounded text-sm">{children}</div>
  );
}

export const Vertical: Story = {
  render: () => (
    <Stack direction="col" gap={4}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Stack>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Item 1')).toBeInTheDocument();
    await expect(canvas.getByText('Item 2')).toBeInTheDocument();
    await expect(canvas.getByText('Item 3')).toBeInTheDocument();
  },
};

export const Horizontal: Story = {
  render: () => (
    <Stack direction="row" gap={4}>
      <Box>Left</Box>
      <Box>Center</Box>
      <Box>Right</Box>
    </Stack>
  ),
};

export const WithGap: Story = {
  render: () => (
    <Stack direction="col" gap={8}>
      <Box>Gap 8 - Item 1</Box>
      <Box>Gap 8 - Item 2</Box>
      <Box>Gap 8 - Item 3</Box>
    </Stack>
  ),
};

export const Centered: Story = {
  render: () => (
    <Stack
      direction="col"
      gap={4}
      align="center"
      justify="center"
      className="h-64"
    >
      <Box>Centered 1</Box>
      <Box>Centered 2</Box>
    </Stack>
  ),
};

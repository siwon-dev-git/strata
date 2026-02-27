import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Stack } from '@/components/layout';

import { Text } from './Text';

const meta = {
  title: 'Primitives/Text',
  component: Text,
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText(/quick brown fox/);
    await expect(text).toBeInTheDocument();
    await expect(text.tagName.toLowerCase()).toBe('p');
  },
};

export const Headings: Story = {
  render: () => (
    <Stack direction="col" gap={4}>
      <Text as="h1">Heading 1 (3xl)</Text>
      <Text as="h2">Heading 2 (2xl)</Text>
      <Text as="h3">Heading 3 (xl)</Text>
      <Text as="h4">Heading 4 (lg)</Text>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack direction="col" gap={3}>
      <Text color="default">Default color</Text>
      <Text color="muted">Muted color</Text>
      <Text color="subtle">Subtle color</Text>
      <Text color="interactive">Interactive color</Text>
      <Text color="danger">Danger color</Text>
      <Text color="success">Success color</Text>
    </Stack>
  ),
};

export const CodeText: Story = {
  args: {
    as: 'code',
    children: 'const x = 42;',
  },
};

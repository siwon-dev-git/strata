import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { useState } from 'react';

import { Checkbox } from './Checkbox';
import { Text } from '../Text/Text';

const meta = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-2">
        <Checkbox
          id="terms"
          checked={checked}
          onCheckedChange={(v) => setChecked(v === true)}
        />
        <Text as="label" size="sm" htmlFor="terms">
          Accept terms and conditions
        </Text>
      </div>
    );
  },
};

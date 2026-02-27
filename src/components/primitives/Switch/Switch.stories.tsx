import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Switch } from './Switch';
import { Text } from '../Text/Text';

const meta = {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: false,
  },
};

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center gap-3">
        <Switch checked={checked} onCheckedChange={setChecked} id="dark-mode" />
        <Text as="label" size="sm" htmlFor="dark-mode">
          Dark mode {checked ? 'on' : 'off'}
        </Text>
      </div>
    );
  },
};

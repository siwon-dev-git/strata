import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Slider } from './Slider';
import { Text } from '../Text/Text';

const meta = {
  title: 'Primitives/Slider',
  component: Slider,
  tags: ['autodocs'],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState([30]);
    return (
      <div className="w-64 space-y-2">
        <Slider value={value} onValueChange={setValue} max={100} step={1} />
        <Text size="xs" color="muted">
          Value: {value[0]}
        </Text>
      </div>
    );
  },
};

export const Range: Story = {
  args: {
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [40],
    disabled: true,
  },
};

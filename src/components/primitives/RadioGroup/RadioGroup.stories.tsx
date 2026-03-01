import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';
import { useState } from 'react';

import { RadioGroupRoot, RadioGroupItem } from './RadioGroup';
import { Text } from '../Text/Text';

const meta = {
  title: 'Primitives/RadioGroup',
  component: RadioGroupRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroupRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 'option-1',
    children: (
      <>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="option-1" id="r1" />
          <Text as="label" size="sm" htmlFor="r1">
            Option 1
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="option-2" id="r2" />
          <Text as="label" size="sm" htmlFor="r2">
            Option 2
          </Text>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="option-3" id="r3" />
          <Text as="label" size="sm" htmlFor="r3">
            Option 3
          </Text>
        </div>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole('radio');
    await expect(radios).toHaveLength(3);

    await userEvent.click(canvas.getByLabelText('Option 2'));
    await expect(canvas.getByLabelText('Option 2')).toBeChecked();
  },
};

export const Controlled: Story = {
  args: {
    children: null,
  },
  render: () => {
    const [value, setValue] = useState('light');
    return (
      <div className="space-y-3">
        <RadioGroupRoot value={value} onValueChange={setValue}>
          {['light', 'dark', 'system'].map((v) => (
            <div key={v} className="flex items-center gap-2">
              <RadioGroupItem value={v} id={`theme-${v}`} />
              <Text
                as="label"
                size="sm"
                htmlFor={`theme-${v}`}
                className="capitalize"
              >
                {v}
              </Text>
            </div>
          ))}
        </RadioGroupRoot>
        <Text size="xs" color="muted">
          Selected: {value}
        </Text>
      </div>
    );
  },
};

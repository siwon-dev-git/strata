import type { Meta, StoryObj } from '@storybook/react-vite';

import { FormField } from './FormField';
import { Input } from '../Input/Input';
import { Checkbox } from '../Checkbox/Checkbox';

const meta = {
  title: 'Primitives/FormField',
  component: FormField,
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    description: 'We will never share your email.',
    htmlFor: 'email',
    children: <Input id="email" placeholder="you@example.com" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    required: true,
    htmlFor: 'password',
    children: (
      <Input id="password" type="password" placeholder="Enter password" />
    ),
  },
};

export const WithError: Story = {
  args: {
    label: 'Username',
    error: 'Username is already taken.',
    htmlFor: 'username',
    children: <Input id="username" defaultValue="admin" />,
  },
};

export const WithCheckbox: Story = {
  args: {
    label: 'Preferences',
    children: null,
  },
  render: () => (
    <FormField label="Preferences">
      <div className="flex items-center gap-2">
        <Checkbox id="newsletter" />
        <label htmlFor="newsletter" className="text-sm text-fg-default">
          Subscribe to newsletter
        </label>
      </div>
    </FormField>
  ),
};

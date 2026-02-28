import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '.';
import { FormField } from '@/components/primitives/FormField/FormField';

const meta = {
  title: 'Primitives/Select',
  component: SelectTrigger,
  tags: ['autodocs'],
} satisfies Meta<typeof SelectTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SelectRoot>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </SelectRoot>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger className="w-56">
        <Select.Value placeholder="Select a framework" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Frontend</Select.Label>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Backend</Select.Label>
          <Select.Item value="node">Node.js</Select.Item>
          <Select.Item value="deno">Deno</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  ),
};

export const Disabled: Story = {
  render: () => (
    <SelectRoot disabled>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
      </SelectContent>
    </SelectRoot>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField label="Country" error="Please select a country" required>
      {(ids) => (
        <SelectRoot>
          <SelectTrigger
            className="w-48 border-[--input-border-error]"
            aria-describedby={ids.describedBy}
            aria-invalid
          >
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kr">South Korea</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="jp">Japan</SelectItem>
          </SelectContent>
        </SelectRoot>
      )}
    </FormField>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <SelectRoot>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Choose a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="free">Free</SelectItem>
        <SelectItem value="pro">Pro</SelectItem>
        <SelectItem value="enterprise" disabled>
          Enterprise (Coming soon)
        </SelectItem>
      </SelectContent>
    </SelectRoot>
  ),
};

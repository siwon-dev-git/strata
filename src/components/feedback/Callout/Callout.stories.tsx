import type { Meta, StoryObj } from '@storybook/react-vite';

import { Callout } from './Callout';

const meta = {
  title: 'Feedback/Callout',
  component: Callout,
  tags: ['autodocs'],
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Note',
    children: 'This is an informational callout with important context.',
  },
};

export const AllVariants: Story = {
  args: { children: 'Callout' },
  render: () => (
    <div className="flex flex-col gap-4 w-[480px]">
      <Callout variant="info" title="Information">
        Strata uses a 3-layer token architecture for maximum flexibility.
      </Callout>
      <Callout variant="success" title="Success">
        All components passed accessibility audits with WCAG AA compliance.
      </Callout>
      <Callout variant="warning" title="Warning">
        This API is deprecated and will be removed in the next major version.
      </Callout>
      <Callout variant="danger" title="Breaking Change">
        The color token format has changed from hex to OKLch.
      </Callout>
    </div>
  ),
};

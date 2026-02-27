import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational alert message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Your session will expire in 5 minutes.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Error',
    children: 'Failed to save changes. Please try again.',
  },
};

export const AllVariants: Story = {
  args: {
    children: 'Alert',
  },
  render: () => (
    <div className="flex flex-col gap-3 w-96">
      <Alert variant="info" title="Info">
        Informational message.
      </Alert>
      <Alert variant="success" title="Success">
        Operation completed.
      </Alert>
      <Alert variant="warning" title="Warning">
        Proceed with caution.
      </Alert>
      <Alert variant="danger" title="Error">
        Something went wrong.
      </Alert>
    </div>
  ),
};

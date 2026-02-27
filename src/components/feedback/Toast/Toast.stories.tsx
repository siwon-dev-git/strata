import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from './Toast';
import { Button } from '@/components/primitives';

const meta = {
  title: 'Feedback/Toast',
  component: ToastRoot,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
        <ToastViewport />
      </ToastProvider>
    ),
  ],
} satisfies Meta<typeof ToastRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Toast</Button>
        <ToastRoot open={open} onOpenChange={setOpen}>
          <ToastTitle>Changes saved</ToastTitle>
          <ToastDescription>Your settings have been updated.</ToastDescription>
          <ToastClose />
        </ToastRoot>
      </>
    );
  },
};

export const WithAction: Story = {
  args: {
    children: null,
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Show Toast</Button>
        <ToastRoot open={open} onOpenChange={setOpen}>
          <ToastTitle>File deleted</ToastTitle>
          <ToastDescription>The file has been moved to trash.</ToastDescription>
          <ToastAction altText="Undo delete">Undo</ToastAction>
          <ToastClose />
        </ToastRoot>
      </>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './AlertDialog';
import { Button } from '@/components/primitives';

const meta = {
  title: 'Disclosure/AlertDialog',
  component: AlertDialogRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialogRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: null },
  render: (args) => (
    <AlertDialogRoot {...args}>
      <AlertDialogTrigger asChild>
        <Button variant="danger">Delete item</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete item?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the item
          from your account.
        </AlertDialogDescription>
        <div className="flex justify-end gap-3 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Yes, delete</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogRoot>
  ),
};

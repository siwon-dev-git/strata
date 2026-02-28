import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within, userEvent } from 'storybook/test';

import {
  DialogRoot,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './Dialog';
import { Button } from '@/components/primitives';

const meta = {
  title: 'Disclosure/Dialog',
  component: DialogRoot,
  tags: ['autodocs'],
} satisfies Meta<typeof DialogRoot>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              X
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            This is a dialog description. It provides additional context about
            the dialog content.
          </DialogDescription>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open dialog/i });

    // Click trigger to open dialog
    await userEvent.click(trigger);

    // Verify dialog is visible (dialog renders in a portal, so use screen)
    const body = within(document.body);
    const dialog = await body.findByRole('dialog');
    await expect(dialog).toBeVisible();

    // Click close button
    const closeButton = within(dialog).getByRole('button', { name: /x/i });
    await userEvent.click(closeButton);

    // Verify dialog is gone
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
  },
};

export const WithFooter: Story = {
  render: () => (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Are you sure you want to proceed? This action cannot be undone.
          </DialogDescription>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button variant="solid">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  ),
};

export const ScrollOverflow: Story = {
  render: () => (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button>Open Long Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              X
            </Button>
          </DialogClose>
        </DialogHeader>
        <DialogBody>
          <div className="max-h-60 overflow-y-auto space-y-4 text-sm text-fg-muted">
            {Array.from({ length: 10 }, (_, i) => (
              <p key={i}>
                Section {i + 1}: Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </p>
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Decline</Button>
          </DialogClose>
          <Button variant="solid">Accept</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  ),
};

export const DisabledTrigger: Story = {
  render: () => (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button disabled>Cannot Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Unreachable</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>This dialog should not open.</DialogDescription>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /cannot open/i });

    await expect(trigger).toBeDisabled();
    await userEvent.click(trigger);

    const body = within(document.body);
    await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
  },
};

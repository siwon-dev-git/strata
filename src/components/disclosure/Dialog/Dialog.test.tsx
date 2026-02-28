import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  SimpleDialog,
} from './Dialog';

describe('Dialog', () => {
  it('renders trigger button', () => {
    render(
      <DialogRoot>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </DialogRoot>,
    );
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it('shows dialog content when defaultOpen', () => {
    render(
      <DialogRoot defaultOpen>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
        </DialogContent>
      </DialogRoot>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('does not show dialog content when closed', () => {
    render(
      <DialogRoot open={false}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Hidden Title</DialogTitle>
        </DialogContent>
      </DialogRoot>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // ── Action failure scenarios ──────────────────────────────────────

  it('calls onOpenChange when closed via Escape key', async () => {
    const onOpenChange = vi.fn();
    render(
      <DialogRoot defaultOpen onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </DialogRoot>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders SimpleDialog with all sections', () => {
    render(
      <SimpleDialog
        open
        title="Confirm"
        description="Are you sure?"
        footer={<button>OK</button>}
      >
        <p>Body content</p>
      </SimpleDialog>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });
});

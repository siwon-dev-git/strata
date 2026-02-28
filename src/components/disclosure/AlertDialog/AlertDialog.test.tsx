import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './AlertDialog';

describe('AlertDialog', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders trigger content', () => {
    render(
      <AlertDialogRoot>
        <AlertDialogTrigger>Delete item</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete item?</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialogRoot>,
    );
    expect(
      screen.getByRole('button', { name: 'Delete item' }),
    ).toBeInTheDocument();
  });

  it('opens content when trigger clicked', async () => {
    render(
      <AlertDialogRoot>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialogRoot>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });

  // ── Content ───────────────────────────────────────────────────────

  it('renders AlertDialogTitle and AlertDialogDescription', () => {
    render(
      <AlertDialogRoot defaultOpen>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This cannot be undone.
          </AlertDialogDescription>
        </AlertDialogContent>
      </AlertDialogRoot>,
    );
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
  });

  // ── Actions ───────────────────────────────────────────────────────

  it('AlertDialogAction renders as button', () => {
    render(
      <AlertDialogRoot defaultOpen>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogAction>Confirm Delete</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialogRoot>,
    );
    expect(
      screen.getByRole('button', { name: 'Confirm Delete' }),
    ).toBeInTheDocument();
  });

  it('AlertDialogCancel renders as button', () => {
    render(
      <AlertDialogRoot defaultOpen>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialogRoot>,
    );
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  // ── ARIA ──────────────────────────────────────────────────────────

  it('has alertdialog role when open', () => {
    render(
      <AlertDialogRoot defaultOpen>
        <AlertDialogTrigger>Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Confirm</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialogRoot>,
    );
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });
});

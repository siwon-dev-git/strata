import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
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
});

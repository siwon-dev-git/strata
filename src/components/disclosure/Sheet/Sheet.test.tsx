import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  SheetRoot,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetDescription,
} from './Sheet';

describe('Sheet', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders trigger content', () => {
    render(
      <SheetRoot>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </SheetRoot>,
    );
    expect(
      screen.getByRole('button', { name: 'Open Sheet' }),
    ).toBeInTheDocument();
  });

  it('opens content when trigger clicked', async () => {
    render(
      <SheetRoot>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet Title</SheetTitle>
        </SheetContent>
      </SheetRoot>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('renders SheetTitle', () => {
    render(
      <SheetRoot defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>My Sheet</SheetTitle>
        </SheetContent>
      </SheetRoot>,
    );
    expect(screen.getByText('My Sheet')).toBeInTheDocument();
  });

  it('renders SheetDescription', () => {
    render(
      <SheetRoot defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
          <SheetDescription>Description text</SheetDescription>
        </SheetContent>
      </SheetRoot>,
    );
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  // ── Sections ──────────────────────────────────────────────────────

  it('renders SheetHeader, SheetBody, SheetFooter', () => {
    render(
      <SheetRoot defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
          <SheetHeader>Header content</SheetHeader>
          <SheetBody>Body content</SheetBody>
          <SheetFooter>Footer content</SheetFooter>
        </SheetContent>
      </SheetRoot>,
    );
    expect(screen.getByText('Header content')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  // ── ARIA ──────────────────────────────────────────────────────────

  it('close button has "Close" accessible name via sr-only', () => {
    render(
      <SheetRoot defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </SheetRoot>,
    );
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  // ── Props ─────────────────────────────────────────────────────────

  it('side prop applies correct classes for left side', () => {
    render(
      <SheetRoot defaultOpen>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="left">
          <SheetTitle>Title</SheetTitle>
        </SheetContent>
      </SheetRoot>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('left-0');
  });
});

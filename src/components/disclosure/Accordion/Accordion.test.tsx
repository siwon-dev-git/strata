import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './Accordion';

describe('Accordion', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders accordion items', () => {
    render(
      <AccordionRoot type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );
    expect(screen.getByText('Trigger 1')).toBeInTheDocument();
    expect(screen.getByText('Trigger 2')).toBeInTheDocument();
  });

  // ── Happy-path ────────────────────────────────────────────────────

  it('expands when trigger clicked', async () => {
    render(
      <AccordionRoot type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    // Content should not be visible initially
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

    // Click trigger to expand
    await userEvent.click(screen.getByRole('button', { name: /trigger 1/i }));

    // Content should now be visible
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('collapses when clicking expanded trigger', async () => {
    render(
      <AccordionRoot type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    const trigger = screen.getByRole('button', { name: /trigger 1/i });

    // Expand
    await userEvent.click(trigger);
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    // Collapse
    await userEvent.click(trigger);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('multiple type allows multiple open items', async () => {
    render(
      <AccordionRoot type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    await userEvent.click(screen.getByRole('button', { name: /trigger 1/i }));
    await userEvent.click(screen.getByRole('button', { name: /trigger 2/i }));

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  // ── Keyboard ──────────────────────────────────────────────────────

  it('Space toggles item', async () => {
    render(
      <AccordionRoot type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    const trigger = screen.getByRole('button', { name: /trigger 1/i });
    trigger.focus();

    await userEvent.keyboard(' ');
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    await userEvent.keyboard(' ');
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('Enter toggles item', async () => {
    render(
      <AccordionRoot type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    const trigger = screen.getByRole('button', { name: /trigger 1/i });
    trigger.focus();

    await userEvent.keyboard('{Enter}');
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    await userEvent.keyboard('{Enter}');
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  // ── ARIA ──────────────────────────────────────────────────────────

  it('trigger has aria-expanded attribute', async () => {
    render(
      <AccordionRoot type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </AccordionRoot>,
    );

    const trigger = screen.getByRole('button', { name: /trigger 1/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});

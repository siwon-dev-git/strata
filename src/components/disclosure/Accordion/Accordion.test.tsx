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
});

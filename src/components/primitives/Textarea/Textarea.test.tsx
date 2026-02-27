import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a textarea element', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text').tagName).toBe('TEXTAREA');
  });

  it('supports error state with aria-invalid', () => {
    render(<Textarea error placeholder="Error field" />);
    const textarea = screen.getByPlaceholderText('Error field');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when error is false', () => {
    render(<Textarea placeholder="Normal field" />);
    const textarea = screen.getByPlaceholderText('Normal field');
    expect(textarea).not.toHaveAttribute('aria-invalid');
  });

  it('applies size classes', () => {
    const { rerender } = render(<Textarea size="sm" placeholder="sm" />);
    expect(screen.getByPlaceholderText('sm').className).toContain('text-xs');

    rerender(<Textarea size="md" placeholder="md" />);
    expect(screen.getByPlaceholderText('md').className).toContain('text-sm');

    rerender(<Textarea size="lg" placeholder="lg" />);
    expect(screen.getByPlaceholderText('lg').className).toContain('text-base');
  });
});

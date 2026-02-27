import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Kbd } from './Kbd';

describe('Kbd', () => {
  it('renders kbd element with children', () => {
    render(<Kbd>⌘C</Kbd>);
    const el = screen.getByText('⌘C');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('KBD');
  });

  it('applies custom className', () => {
    render(<Kbd className="custom-class">Esc</Kbd>);
    const el = screen.getByText('Esc');
    expect(el.className).toContain('custom-class');
  });

  it('forwards ref and additional props', () => {
    render(<Kbd data-testid="kbd-test">K</Kbd>);
    expect(screen.getByTestId('kbd-test')).toBeInTheDocument();
  });
});

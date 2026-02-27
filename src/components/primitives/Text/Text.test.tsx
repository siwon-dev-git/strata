import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  it('renders as paragraph by default', () => {
    render(<Text>Hello world</Text>);
    const el = screen.getByText('Hello world');
    expect(el.tagName).toBe('P');
  });

  it('renders as specified tag', () => {
    render(<Text as="h1">Heading</Text>);
    expect(screen.getByText('Heading').tagName).toBe('H1');
  });

  it('renders code with mono font', () => {
    render(<Text as="code">const x = 1</Text>);
    const el = screen.getByText('const x = 1');
    expect(el.tagName).toBe('CODE');
    expect(el).toHaveClass('font-mono');
  });

  it('applies color variant', () => {
    render(<Text color="muted">Muted text</Text>);
    expect(screen.getByText('Muted text')).toHaveClass('text-fg-muted');
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Code } from './Code';

describe('Code', () => {
  it('renders code element with children', () => {
    render(<Code>console.log</Code>);
    const el = screen.getByText('console.log');
    expect(el).toBeInTheDocument();
    expect(el.tagName).toBe('CODE');
  });

  it('applies mono font styling', () => {
    render(<Code>npm install</Code>);
    const el = screen.getByText('npm install');
    expect(el.className).toContain('font-mono');
  });

  it('merges custom className', () => {
    render(<Code className="custom-class">test</Code>);
    const el = screen.getByText('test');
    expect(el.className).toContain('custom-class');
  });
});

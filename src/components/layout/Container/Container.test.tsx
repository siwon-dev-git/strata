import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Container } from './Container';

describe('Container', () => {
  // ── Rendering ─────────────────────────────────────────────────────

  it('renders without crashing', () => {
    const { container } = render(<Container />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    render(<Container>Page content</Container>);
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  // ── Default props ─────────────────────────────────────────────────

  it('applies default lg size class', () => {
    const { container } = render(<Container />);
    expect(container.firstChild).toHaveClass('max-w-[1024px]');
  });

  it('applies default centering and padding classes', () => {
    const { container } = render(<Container />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('mx-auto');
    expect(el).toHaveClass('px-4');
  });

  // ── Size prop ─────────────────────────────────────────────────────

  it('applies sm size class', () => {
    const { container } = render(<Container size="sm" />);
    expect(container.firstChild).toHaveClass('max-w-[640px]');
  });

  it('applies md size class', () => {
    const { container } = render(<Container size="md" />);
    expect(container.firstChild).toHaveClass('max-w-[768px]');
  });

  it('applies lg size class', () => {
    const { container } = render(<Container size="lg" />);
    expect(container.firstChild).toHaveClass('max-w-[1024px]');
  });

  it('applies xl size class', () => {
    const { container } = render(<Container size="xl" />);
    expect(container.firstChild).toHaveClass('max-w-[1280px]');
  });

  it('applies max-w-none for full size', () => {
    const { container } = render(<Container size="full" />);
    expect(container.firstChild).toHaveClass('max-w-none');
  });

  // ── Custom className ──────────────────────────────────────────────

  it('applies custom className', () => {
    const { container } = render(<Container className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('preserves default classes when custom className is provided', () => {
    const { container } = render(<Container size="sm" className="extra" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass('mx-auto');
    expect(el).toHaveClass('px-4');
    expect(el).toHaveClass('max-w-[640px]');
    expect(el).toHaveClass('extra');
  });

  // ── Semantic element ──────────────────────────────────────────────

  it('renders as a div element', () => {
    const { container } = render(<Container />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});

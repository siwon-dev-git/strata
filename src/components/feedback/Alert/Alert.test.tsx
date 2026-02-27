import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Alert } from './Alert';

describe('Alert', () => {
  it('renders with role alert', () => {
    render(<Alert>Message</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('displays title and children', () => {
    render(<Alert title="Warning">Something happened.</Alert>);
    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('Something happened.')).toBeInTheDocument();
  });

  it('shows dismiss button when onDismiss provided', () => {
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss}>Dismiss me</Alert>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button clicked', async () => {
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss}>Dismiss me</Alert>);
    await userEvent.click(screen.getByRole('button'));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('applies danger variant class', () => {
    render(<Alert variant="danger">Error</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert.className).toContain('danger');
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  ToastProvider,
  ToastViewport,
  ToastRoot,
  ToastTitle,
  ToastDescription,
} from './Toast';

describe('Toast', () => {
  it('renders provider and viewport without crashing', () => {
    const { container } = render(
      <ToastProvider>
        <ToastViewport data-testid="toast-viewport" />
      </ToastProvider>,
    );
    expect(container).toBeTruthy();
  });

  it('renders toast content when open', () => {
    render(
      <ToastProvider>
        <ToastRoot open>
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Operation completed</ToastDescription>
        </ToastRoot>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Operation completed')).toBeInTheDocument();
  });
});

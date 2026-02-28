import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StrataServerProvider } from './StrataServerProvider';

describe('StrataServerProvider', () => {
  it('renders children', () => {
    render(
      <StrataServerProvider>
        <span data-testid="child">Hello</span>
      </StrataServerProvider>,
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('applies default data attributes', () => {
    const { container } = render(
      <StrataServerProvider>
        <span>content</span>
      </StrataServerProvider>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-theme', 'default');
    expect(wrapper).toHaveAttribute('data-density', 'comfortable');
    expect(wrapper).toHaveClass('dark');
  });

  it('applies custom theme, mode, and density', () => {
    const { container } = render(
      <StrataServerProvider theme="blue" mode="light" density="compact">
        <span>content</span>
      </StrataServerProvider>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveAttribute('data-theme', 'blue');
    expect(wrapper).toHaveAttribute('data-density', 'compact');
    expect(wrapper).not.toHaveClass('dark');
  });

  it('merges custom className', () => {
    const { container } = render(
      <StrataServerProvider className="my-custom-class">
        <span>content</span>
      </StrataServerProvider>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass('my-custom-class');
  });

  it('does not include dark class in light mode', () => {
    const { container } = render(
      <StrataServerProvider mode="light">
        <span>content</span>
      </StrataServerProvider>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).not.toHaveClass('dark');
  });
});

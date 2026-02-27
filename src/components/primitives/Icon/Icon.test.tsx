import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';

import { Icon, IconSearch, IconHome } from './Icon';

describe('Icon', () => {
  it('renders SVG element', () => {
    const { container } = render(
      <Icon>
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('is hidden from accessibility tree', () => {
    const { container } = render(
      <Icon>
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    );
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies size class', () => {
    const { container } = render(
      <Icon size="lg">
        <circle cx="12" cy="12" r="10" />
      </Icon>,
    );
    const svg = container.querySelector('svg');
    expect(svg?.getAttribute('class')).toContain('h-6');
  });

  it('renders named icon components', () => {
    const { container: c1 } = render(<IconSearch />);
    expect(c1.querySelector('svg')).toBeInTheDocument();

    const { container: c2 } = render(<IconHome />);
    expect(c2.querySelector('svg')).toBeInTheDocument();
  });
});

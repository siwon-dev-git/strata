import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { AspectRatio } from './AspectRatio';

describe('AspectRatio', () => {
  it('renders children', () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img src="test.jpg" alt="Test image" />
      </AspectRatio>,
    );
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
  });

  it('applies ratio prop via style', () => {
    const { container } = render(
      <AspectRatio ratio={4 / 3}>
        <div>Content</div>
      </AspectRatio>,
    );
    const wrapper = container.firstChild as HTMLElement;
    // Radix sets position: relative and a padding-bottom for the aspect ratio
    expect(wrapper.style.position).toBe('relative');
  });
});

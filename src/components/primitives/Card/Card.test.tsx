import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Card, CardHeader, CardBody, CardFooter } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toHaveTextContent('Content');
  });

  it('applies interactive variant classes', () => {
    render(
      <Card variant="interactive" data-testid="card">
        Click me
      </Card>,
    );
    expect(screen.getByTestId('card').className).toContain('cursor-pointer');
  });

  it('renders sub-components', () => {
    render(
      <Card>
        <CardHeader data-testid="header">H</CardHeader>
        <CardBody data-testid="body">B</CardBody>
        <CardFooter data-testid="footer">F</CardFooter>
      </Card>,
    );
    expect(screen.getByTestId('header')).toHaveTextContent('H');
    expect(screen.getByTestId('body')).toHaveTextContent('B');
    expect(screen.getByTestId('footer')).toHaveTextContent('F');
  });
});

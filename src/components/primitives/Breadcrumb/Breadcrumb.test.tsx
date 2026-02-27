import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders as navigation with breadcrumb label', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'breadcrumb',
    );
  });

  it('renders links and current page', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Settings</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});

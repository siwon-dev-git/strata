import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from './Pagination';

describe('Pagination', () => {
  it('renders navigation with pagination label', () => {
    render(
      <PaginationRoot>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>,
    );
    expect(
      screen.getByRole('navigation', { name: /pagination/i }),
    ).toBeInTheDocument();
  });

  it('renders page links', () => {
    render(
      <PaginationRoot>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>3</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>,
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('2').closest('button')).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});

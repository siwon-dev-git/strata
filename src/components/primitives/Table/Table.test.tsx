import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './Table';

describe('Table', () => {
  it('renders table element', () => {
    render(<Table data-testid="table">Content</Table>);
    expect(screen.getByTestId('table').tagName).toBe('TABLE');
  });

  it('renders with header and rows', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>Designer</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    render(
      <Table data-testid="table" className="custom-class">
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(screen.getByTestId('table').className).toContain('custom-class');
  });
});

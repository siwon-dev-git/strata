import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './Select';

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    render(
      <SelectRoot>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Bravo</SelectItem>
        </SelectContent>
      </SelectRoot>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows items when defaultOpen', () => {
    render(
      <SelectRoot defaultOpen>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Bravo</SelectItem>
        </SelectContent>
      </SelectRoot>,
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Bravo')).toBeInTheDocument();
  });

  it('renders with a default value', () => {
    render(
      <SelectRoot defaultValue="b">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Bravo</SelectItem>
        </SelectContent>
      </SelectRoot>,
    );
    expect(screen.getByRole('combobox')).toHaveTextContent('Bravo');
  });
});

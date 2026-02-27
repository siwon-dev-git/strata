import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { DataList } from '.';

describe('DataList', () => {
  it('renders a definition list', () => {
    render(
      <DataList.Root data-testid="dl">
        <DataList.Item>
          <DataList.Label>Key</DataList.Label>
          <DataList.Value>Value</DataList.Value>
        </DataList.Item>
      </DataList.Root>,
    );
    const dl = screen.getByTestId('dl');
    expect(dl.tagName).toBe('DL');
  });

  it('renders labels and values', () => {
    render(
      <DataList.Root>
        <DataList.Item>
          <DataList.Label>Status</DataList.Label>
          <DataList.Value>Active</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Priority</DataList.Label>
          <DataList.Value>High</DataList.Value>
        </DataList.Item>
      </DataList.Root>,
    );
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Priority')).toBeInTheDocument();
    expect(screen.getByText('High')).toBeInTheDocument();
  });
});

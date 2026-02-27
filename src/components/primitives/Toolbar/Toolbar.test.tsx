import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  ToolbarRoot,
  ToolbarToggleGroup,
  ToolbarToggleItem,
  ToolbarSeparator,
} from './Toolbar';

describe('Toolbar', () => {
  it('renders toolbar role', () => {
    render(
      <ToolbarRoot>
        <ToolbarToggleGroup type="single">
          <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
        </ToolbarToggleGroup>
      </ToolbarRoot>,
    );
    expect(screen.getByRole('toolbar')).toBeInTheDocument();
  });

  it('renders toolbar buttons', () => {
    render(
      <ToolbarRoot>
        <ToolbarToggleGroup type="multiple">
          <ToolbarToggleItem value="bold">Bold</ToolbarToggleItem>
          <ToolbarToggleItem value="italic">Italic</ToolbarToggleItem>
          <ToolbarToggleItem value="underline">Underline</ToolbarToggleItem>
        </ToolbarToggleGroup>
        <ToolbarSeparator />
        <ToolbarToggleGroup type="single">
          <ToolbarToggleItem value="left">Align Left</ToolbarToggleItem>
          <ToolbarToggleItem value="center">Align Center</ToolbarToggleItem>
          <ToolbarToggleItem value="right">Align Right</ToolbarToggleItem>
        </ToolbarToggleGroup>
      </ToolbarRoot>,
    );
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Italic')).toBeInTheDocument();
    expect(screen.getByText('Underline')).toBeInTheDocument();
    expect(screen.getByText('Align Left')).toBeInTheDocument();
    expect(screen.getByText('Align Center')).toBeInTheDocument();
    expect(screen.getByText('Align Right')).toBeInTheDocument();
  });
});

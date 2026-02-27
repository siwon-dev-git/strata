import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Toggle, ToggleGroupRoot, ToggleGroupItem } from './ToggleGroup';

describe('ToggleGroup', () => {
  it('renders toggle items', () => {
    render(
      <ToggleGroupRoot type="single">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
        <ToggleGroupItem value="board">Board</ToggleGroupItem>
      </ToggleGroupRoot>,
    );
    expect(screen.getByText('List')).toBeInTheDocument();
    expect(screen.getByText('Grid')).toBeInTheDocument();
    expect(screen.getByText('Board')).toBeInTheDocument();
  });

  it('item can be toggled', async () => {
    render(
      <ToggleGroupRoot type="single">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroupRoot>,
    );
    const listItem = screen.getByText('List');
    await userEvent.click(listItem);
    expect(listItem).toHaveAttribute('data-state', 'on');
  });

  it('only one item is active in single mode', async () => {
    render(
      <ToggleGroupRoot type="single">
        <ToggleGroupItem value="list">List</ToggleGroupItem>
        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
      </ToggleGroupRoot>,
    );
    const listItem = screen.getByText('List');
    const gridItem = screen.getByText('Grid');

    await userEvent.click(listItem);
    expect(listItem).toHaveAttribute('data-state', 'on');
    expect(gridItem).toHaveAttribute('data-state', 'off');

    await userEvent.click(gridItem);
    expect(listItem).toHaveAttribute('data-state', 'off');
    expect(gridItem).toHaveAttribute('data-state', 'on');
  });
});

describe('Toggle', () => {
  it('renders children', () => {
    render(<Toggle>Mute</Toggle>);
    expect(screen.getByText('Mute')).toBeInTheDocument();
  });

  it('toggles on click', async () => {
    render(<Toggle>Bold</Toggle>);
    const toggle = screen.getByText('Bold');
    expect(toggle).toHaveAttribute('data-state', 'off');

    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('data-state', 'on');
  });
});

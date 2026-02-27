import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RadioGroupRoot, RadioGroupItem } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders radio buttons', () => {
    render(
      <RadioGroupRoot>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroupRoot>,
    );
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('respects defaultValue', () => {
    render(
      <RadioGroupRoot defaultValue="b">
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroupRoot>,
    );
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toBeChecked();
  });

  it('calls onValueChange when selected', async () => {
    const onChange = vi.fn();
    render(
      <RadioGroupRoot onValueChange={onChange}>
        <RadioGroupItem value="a" />
        <RadioGroupItem value="b" />
      </RadioGroupRoot>,
    );
    await userEvent.click(screen.getAllByRole('radio')[1]);
    expect(onChange).toHaveBeenCalledWith('b');
  });
});

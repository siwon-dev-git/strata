import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
} from './AlertDialog';

describe('AlertDialog', () => {
  it('renders trigger content', () => {
    render(
      <AlertDialogRoot>
        <AlertDialogTrigger>Delete item</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Delete item?</AlertDialogTitle>
        </AlertDialogContent>
      </AlertDialogRoot>,
    );
    expect(
      screen.getByRole('button', { name: 'Delete item' }),
    ).toBeInTheDocument();
  });
});

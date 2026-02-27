import type { ComponentPropsWithRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';

export function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ref,
  ...props
}: ComponentPropsWithRef<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      ref={ref}
      orientation={orientation}
      decorative={decorative}
      className={cn(
        'shrink-0 bg-[--border-subtle]',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  );
}

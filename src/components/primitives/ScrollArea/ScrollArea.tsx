import type { ComponentPropsWithRef, ReactNode } from 'react';
import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import { cn } from '@/lib/utils';

/* ----- Root -------------------------------------------------------------- */

interface ScrollAreaRootProps extends ComponentPropsWithRef<
  typeof RadixScrollArea.Root
> {
  children: ReactNode;
}

export function ScrollAreaRoot({
  className,
  children,
  ref,
  ...props
}: ScrollAreaRootProps) {
  return (
    <RadixScrollArea.Root
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      {children}
    </RadixScrollArea.Root>
  );
}

/* ----- Viewport ---------------------------------------------------------- */

interface ScrollAreaViewportProps extends ComponentPropsWithRef<
  typeof RadixScrollArea.Viewport
> {
  children: ReactNode;
}

export function ScrollAreaViewport({
  className,
  children,
  ref,
  ...props
}: ScrollAreaViewportProps) {
  return (
    <RadixScrollArea.Viewport
      ref={ref}
      className={cn('h-full w-full rounded-[inherit]', className)}
      {...props}
    >
      {children}
    </RadixScrollArea.Viewport>
  );
}

/* ----- Scrollbar --------------------------------------------------------- */

type ScrollAreaScrollbarProps = ComponentPropsWithRef<
  typeof RadixScrollArea.Scrollbar
>;

export function ScrollAreaScrollbar({
  className,
  orientation = 'vertical',
  ref,
  ...props
}: ScrollAreaScrollbarProps) {
  return (
    <RadixScrollArea.Scrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        'flex touch-none select-none bg-[--scrollarea-track] transition-colors',
        orientation === 'vertical' &&
          'h-full w-2 border-l border-l-transparent p-px',
        orientation === 'horizontal' &&
          'w-full h-2 flex-col border-t border-t-transparent p-px',
        className,
      )}
      {...props}
    />
  );
}

/* ----- Thumb ------------------------------------------------------------- */

type ScrollAreaThumbProps = ComponentPropsWithRef<typeof RadixScrollArea.Thumb>;

export function ScrollAreaThumb({
  className,
  ref,
  ...props
}: ScrollAreaThumbProps) {
  return (
    <RadixScrollArea.Thumb
      ref={ref}
      className={cn(
        'relative flex-1 rounded-full bg-[--scrollarea-thumb] transition-colors',
        'hover:bg-[--scrollarea-thumb-hover]',
        className,
      )}
      {...props}
    />
  );
}

/* ----- Convenience component --------------------------------------------- */

interface ScrollAreaProps extends ComponentPropsWithRef<
  typeof RadixScrollArea.Root
> {
  children: ReactNode;
  orientation?: 'vertical' | 'horizontal' | 'both';
}

export function ScrollArea({
  className,
  children,
  orientation = 'vertical',
  ref,
  ...props
}: ScrollAreaProps) {
  return (
    <ScrollAreaRoot ref={ref} className={className} {...props}>
      <ScrollAreaViewport>{children}</ScrollAreaViewport>
      {(orientation === 'vertical' || orientation === 'both') && (
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      )}
      {(orientation === 'horizontal' || orientation === 'both') && (
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      )}
      <RadixScrollArea.Corner />
    </ScrollAreaRoot>
  );
}

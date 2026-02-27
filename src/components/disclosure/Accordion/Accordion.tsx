import type { ComponentPropsWithRef } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';

/* ----- Root — pass-through ----------------------------------------------- */

export const AccordionRoot = AccordionPrimitive.Root;

/* ----- Item -------------------------------------------------------------- */

export function AccordionItem({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn('border-b border-border-subtle', className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  );
}

/* ----- Trigger ----------------------------------------------------------- */

export function AccordionTrigger({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex w-full items-center justify-between py-3 text-sm font-medium transition-colors hover:text-fg-default',
          className,
        )}
        {...props}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/* ----- Content ----------------------------------------------------------- */

export function AccordionContent({
  className,
  children,
  ref,
  ...props
}: ComponentPropsWithRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        'overflow-hidden text-sm',
        'data-[state=open]:animate-[accordion-down_200ms] data-[state=closed]:animate-[accordion-up_200ms]',
        className,
      )}
      {...props}
    >
      <div className="pb-3">{children}</div>
    </AccordionPrimitive.Content>
  );
}

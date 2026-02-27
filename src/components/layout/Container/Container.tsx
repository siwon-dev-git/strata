import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ContainerProps {
  size?: ContainerSize;
  className?: string;
  children?: ReactNode;
}

const sizeMap: Record<ContainerSize, string> = {
  sm: 'max-w-[640px]',
  md: 'max-w-[768px]',
  lg: 'max-w-[1024px]',
  xl: 'max-w-[1280px]',
  full: 'max-w-none',
};

export function Container({
  size = 'lg',
  className,
  children,
}: ContainerProps) {
  return (
    <div className={cn('mx-auto px-4', sizeMap[size], className)}>
      {children}
    </div>
  );
}

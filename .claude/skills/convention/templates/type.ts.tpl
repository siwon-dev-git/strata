// {ComponentName}.type.ts
// Tier 2+ — shared props interfaces and context types

import type { ComponentPropsWithRef } from 'react';

export interface {ComponentName}RootProps
  extends ComponentPropsWithRef<'{element}'> {
  // custom props
}

// Add sub-component props as needed:
// export interface {ComponentName}ContentProps ...
// export interface {ComponentName}ItemProps ...

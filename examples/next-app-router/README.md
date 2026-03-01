# Strata + Next.js App Router Example

This example demonstrates how to use Strata with Next.js 15 App Router (RSC).

## Quick Start

```bash
npx create-next-app@latest my-app
cd my-app
pnpm add @siwon-dev-npm/strata
```

## Setup

### 1. Import Strata styles

In `app/layout.tsx`:

```tsx
import '@siwon-dev-npm/strata/styles';
// or for token-only usage:
// import '@siwon-dev-npm/strata/tokens';
```

### 2. Server Component (RSC) layout

```tsx
// app/layout.tsx — Server Component (no 'use client')
import { StrataServerProvider } from '@siwon-dev-npm/strata';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StrataServerProvider theme="default" mode="dark" density="comfortable">
          {children}
        </StrataServerProvider>
      </body>
    </html>
  );
}
```

### 3. Client Component with interactivity

```tsx
// app/page.tsx
'use client';

import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
} from '@siwon-dev-npm/strata';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Heading level={3}>Welcome to Strata</Heading>
        </CardHeader>
        <CardBody className="space-y-4">
          <Text color="muted">Get started by editing this page.</Text>
          <Input placeholder="Enter your name" />
          <Button>Get Started</Button>
        </CardBody>
      </Card>
    </div>
  );
}
```

### 4. Theme switching

```tsx
// components/ThemeSwitcher.tsx
'use client';

import { StrataProvider, Button } from '@siwon-dev-npm/strata';

export function ThemeSwitcher({ children }: { children: React.ReactNode }) {
  return (
    <StrataProvider defaultTheme="default" defaultMode="dark">
      {children}
    </StrataProvider>
  );
}
```

### 5. Custom theme with createTheme

```tsx
import { createTheme, injectTheme } from '@siwon-dev-npm/strata';

// Generate a custom theme
const brandCSS = createTheme('brand', {
  'color-accent': 'oklch(0.65 0.25 280)',
  'surface-base': 'oklch(0.08 0.01 280)',
});

// Inject at runtime
const cleanup = injectTheme('brand', {
  'color-accent': 'oklch(0.65 0.25 280)',
});
```

## Dark Mode

Strata uses the `dark` class on the root element. With StrataServerProvider or StrataProvider, this is handled automatically.

## Tree-shaking

Strata supports tree-shaking out of the box. Only import what you use:

```tsx
// Good — only Button is bundled
import { Button } from '@siwon-dev-npm/strata';

// Individual icon imports for minimal bundle
import { IconHome, IconSearch } from '@siwon-dev-npm/strata';
```

## Icons

```tsx
import { IconHome, IconSearch, IconSettings } from '@siwon-dev-npm/strata';

// Or import from the icons subpath:
import { IconHome } from '@siwon-dev-npm/strata/icons';
```

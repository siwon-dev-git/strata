# Strata + Vite + React Example

This example demonstrates how to use Strata with Vite and React.

## Quick Start

```bash
pnpm create vite my-app --template react-ts
cd my-app
pnpm add @siwon-dev-npm/strata
```

## Setup

### 1. Import Strata styles

In `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@siwon-dev-npm/strata/styles';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

### 2. Wrap with StrataProvider

```tsx
// src/App.tsx
import {
  StrataProvider,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
} from '@siwon-dev-npm/strata';

function App() {
  return (
    <StrataProvider
      defaultTheme="default"
      defaultMode="dark"
      defaultDensity="comfortable"
    >
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Heading level={3}>Strata + Vite</Heading>
          </CardHeader>
          <CardBody className="space-y-4">
            <Text color="muted">Edit src/App.tsx to get started.</Text>
            <Input placeholder="Enter your name" />
            <Button>Click me</Button>
          </CardBody>
        </Card>
      </div>
    </StrataProvider>
  );
}

export default App;
```

### 3. Dark mode toggle

```tsx
import { useTheme, Button, IconMoon, IconSun } from '@siwon-dev-npm/strata';

function DarkModeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {mode === 'dark' ? <IconSun /> : <IconMoon />}
    </Button>
  );
}
```

### 4. Using recipes

Strata includes pre-built page recipes:

```tsx
import {
  SettingsPage,
  DataDashboard,
  AuthFlow,
} from '@siwon-dev-npm/strata/recipes';

// Use directly or as reference for your own pages
function App() {
  return <SettingsPage />;
}
```

### 5. Custom theme

```tsx
import { createTheme, injectTheme } from '@siwon-dev-npm/strata';

// Create a brand theme
const cleanup = injectTheme('brand', {
  'color-accent': 'oklch(0.6 0.22 150)', // Green accent
  'surface-base': 'oklch(0.06 0.004 250)', // Deep dark
});

// Apply via data-theme attribute
document.documentElement.setAttribute('data-theme', 'brand');
```

## Intent-based Theming

```tsx
import { resolveIntent } from '@siwon-dev-npm/strata';

const result = resolveIntent('playful', 'dark');
// result.tokenOverrides contains CSS custom property overrides
// result.attributes contains data-density, etc.
```

## Tailwind CSS v4

Strata tokens work seamlessly with Tailwind CSS v4:

```tsx
// Use Strata semantic tokens in Tailwind classes
<div className="bg-surface-base text-fg-default border-border-subtle">
  <p className="text-fg-muted">Styled with Strata tokens</p>
</div>
```

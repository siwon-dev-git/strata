import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StrataProvider } from '@/components/providers';
import { App } from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StrataProvider>
      <App />
    </StrataProvider>
  </StrictMode>,
);

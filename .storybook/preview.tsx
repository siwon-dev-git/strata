import type { Preview } from '@storybook/react-vite';
import type { ThemeName, ThemeMode } from '../src/themes';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
  },
  globalTypes: {
    theme: {
      description: 'Design system theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'default', title: 'Default' },
          { value: 'blue', title: 'Blue' },
          { value: 'green', title: 'Green' },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: 'Color mode',
      toolbar: {
        title: 'Mode',
        icon: 'moon',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'default',
    mode: 'dark',
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals.theme ?? 'default') as ThemeName;
      const mode = (context.globals.mode ?? 'dark') as ThemeMode;
      return (
        <div
          data-theme={theme}
          className={`${mode === 'dark' ? 'dark' : ''} bg-surface-base text-fg-default min-h-screen p-6`}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;

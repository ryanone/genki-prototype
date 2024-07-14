import { createContext } from 'react';

export type Theme = 'dark' | 'light' | null | undefined;

type ThemeContextValue = {
  theme: Theme;
  setTheme: (value: Theme) => void;
};

const ThemeContext = createContext({
  theme: 'light',
  setTheme: (value: Theme) => { console.error('ThemeContext: `setTheme()` not implemented: %o', value); },
} as ThemeContextValue);

export default ThemeContext;

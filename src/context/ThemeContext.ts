import { createContext } from 'react';

export type Theme = 'dark'|'light'|null|undefined;

type ThemeContextValue = {
  value: Theme;
  setTheme: (value: Theme) => void;
}

const ThemeContext = createContext({
  value: 'light',
  setTheme: (value: Theme) => { console.error('ThemeContext: `setTheme()` not implemented: %o', value) }
} as ThemeContextValue);

export default ThemeContext;
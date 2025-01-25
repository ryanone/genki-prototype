import { createContext } from 'react';
import { type ThemeName } from '@/styles/theme.css';

export type OptionalThemeName = ThemeName | null | undefined;

type ThemeContextValue = {
  setTheme: (value: OptionalThemeName) => void;
  theme: OptionalThemeName;
};

const ThemeContext = createContext({
  theme: 'light',
  setTheme: (value: OptionalThemeName) => {
    console.error('ThemeContext: `setTheme()` not implemented: %o', value);
  },
} as ThemeContextValue);

export default ThemeContext;

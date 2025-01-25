import { createContext } from 'react';
import { lightThemeClass, type ThemeClass } from '@/styles/theme.css';

export type OptionalThemeClass = ThemeClass | null | undefined;

type ThemeContextValue = {
  setTheme: (value: OptionalThemeClass) => void;
  theme: OptionalThemeClass;
};

const ThemeContext = createContext({
  theme: lightThemeClass,
  setTheme: (value: OptionalThemeClass) => {
    console.error('ThemeContext: `setTheme()` not implemented: %o', value);
  },
} as ThemeContextValue);

export default ThemeContext;

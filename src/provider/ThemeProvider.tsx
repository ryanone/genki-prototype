import { useEffect, useMemo, useState, type ReactNode } from 'react';
import ThemeContext, { type Theme as ThemeType } from '@/context/ThemeContext';

const THEME_KEY = 'theme';
const DARK = 'dark';
const LIGHT = 'light';

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>();

  useEffect(() => {
    const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const darkMediaListener = (e: MediaQueryListEvent) =>
      e.matches && setTheme(DARK);
    const lightMedia = window.matchMedia('(prefers-color-scheme: light)');
    const lightMediaListener = (e: MediaQueryListEvent) =>
      e.matches && setTheme(LIGHT);

    const initialTheme = localStorage.getItem(THEME_KEY) as ThemeType;
    if (initialTheme) {
      setTheme(initialTheme);
    } else {
      if (lightMedia.matches) {
        setTheme(LIGHT);
      } else if (darkMedia.matches) {
        setTheme(DARK);
      }
      darkMedia.addEventListener('change', darkMediaListener);
      lightMedia.addEventListener('change', lightMediaListener);
    }

    return () => {
      darkMedia.removeEventListener('change', darkMediaListener);
      lightMedia.removeEventListener('change', lightMediaListener);
    };
  }, []);

  useEffect(() => {
    if (theme) {
      const oldTheme = theme === DARK ? LIGHT : DARK;
      if (document.documentElement.classList.contains(oldTheme)) {
        document.documentElement.classList.replace(oldTheme, theme);
      } else {
        document.documentElement.classList.add(theme);
      }
    } else {
      document.documentElement.classList.remove(DARK, LIGHT);
    }
  }, [theme]);

  const providerValue = useMemo(
    () => ({
      theme,
      setTheme: (t: ThemeType) => {
        if (t) {
          localStorage.setItem(THEME_KEY, t);
        } else {
          localStorage.removeItem(THEME_KEY);
        }
        setTheme(t);
      },
    }),
    [theme],
  );
  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
}

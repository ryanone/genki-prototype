import { useEffect, useMemo, useState, type ReactNode } from 'react';
import ThemeContext, { type OptionalThemeClass } from '@/context/ThemeContext';
import { themes } from '@/styles/theme.css';

const THEME_KEY = 'theme';

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<OptionalThemeClass>();

  useEffect(() => {
    const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const darkMediaListener = (e: MediaQueryListEvent) =>
      e.matches && setTheme(themes.dark);
    const lightMedia = window.matchMedia('(prefers-color-scheme: light)');
    const lightMediaListener = (e: MediaQueryListEvent) =>
      e.matches && setTheme(themes.light);

    const initialTheme = localStorage.getItem(THEME_KEY) as OptionalThemeClass;
    if (initialTheme) {
      setTheme(initialTheme);
    } else {
      if (lightMedia.matches) {
        setTheme(themes.light);
      } else if (darkMedia.matches) {
        setTheme(themes.dark);
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
      const oldTheme = theme === themes.dark ? themes.light : themes.dark;
      if (document.documentElement.classList.contains(oldTheme)) {
        document.documentElement.classList.replace(oldTheme, theme);
      } else {
        document.documentElement.classList.add(theme);
      }
    } else {
      document.documentElement.classList.remove(themes.dark, themes.light);
      document.documentElement.classList.add(themes.dark);
    }
  }, [theme]);

  const providerValue = useMemo(
    () => ({
      theme,
      setTheme: (t: OptionalThemeClass) => {
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

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import ThemeContext, { type OptionalThemeName } from '@/context/ThemeContext';
import { themes, type ThemeName } from '@/styles/theme.css';

const THEME_KEY = 'theme';

const DARK = 'dark';
const LIGHT = 'light';

type ThemeProviderProps = {
  children: ReactNode;
};

function getThemeClass(name: ThemeName) {
  return themes[name];
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<OptionalThemeName>();

  useEffect(() => {
    const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const darkMediaListener = (e: MediaQueryListEvent) =>
      e.matches && setTheme(DARK);
    const lightMedia = window.matchMedia('(prefers-color-scheme: light)');
    const lightMediaListener = (e: MediaQueryListEvent) =>
      e.matches && setTheme(LIGHT);

    const initialTheme = localStorage.getItem(THEME_KEY) as OptionalThemeName;
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
      const oldThemeClass = getThemeClass(oldTheme);
      const newThemeClass = getThemeClass(theme);
      if (document.documentElement.classList.contains(oldThemeClass)) {
        document.documentElement.classList.replace(
          oldThemeClass,
          newThemeClass,
        );
      } else {
        document.documentElement.classList.add(newThemeClass);
      }
    } else {
      const darkThemeClass = getThemeClass(DARK);
      const lightThemeClass = getThemeClass(LIGHT);
      document.documentElement.classList.remove(
        darkThemeClass,
        lightThemeClass,
      );
      document.documentElement.classList.add(darkThemeClass);
    }
  }, [theme]);

  const providerValue = useMemo(
    () => ({
      theme,
      setTheme: (t: OptionalThemeName) => {
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

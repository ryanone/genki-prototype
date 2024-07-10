import ThemeContext, { type Theme as ThemeType } from '@/context/ThemeContext';
import { useEffect, useState, type ReactNode } from 'react';

const THEME_KEY = 'theme';
const DARK = 'dark';
const LIGHT = 'light';

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>();
  const handleSetTheme = (theme: ThemeType) => {
    if (theme) {
      localStorage.setItem(THEME_KEY, theme);
    } else {
      localStorage.removeItem(THEME_KEY);
    }
    setTheme(theme);
  }

  useEffect(() => {
    const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const darkMediaListener = (e: MediaQueryListEvent) => {
      e.matches && setTheme(DARK);
    }
    const lightMedia = window.matchMedia('(prefers-color-scheme: light)');
    const lightMediaListener = (e: MediaQueryListEvent) => {
      e.matches && setTheme(LIGHT);
    }

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
    }
  }, []);

  useEffect(() => {
    console.log('updating theme: %o', theme)
    if (theme === LIGHT) {
      if (document.documentElement.classList.contains(DARK)) {
        document.documentElement.classList.replace(DARK, LIGHT);
      } else {
        document.documentElement.classList.add(LIGHT);
      }
    } else if (theme === DARK) {
      if (document.documentElement.classList.contains(LIGHT)) {
        document.documentElement.classList.replace(LIGHT, DARK);
      } else {
        document.documentElement.classList.add(DARK);
      }
    } else {
      document.documentElement.classList.remove(DARK, LIGHT);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
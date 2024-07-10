import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import ThemeContext, { type Theme as ThemeType } from '@/context/ThemeContext';
import { useEffect, useState } from 'react';
import styles from './Root.module.css';

const THEME_KEY = 'theme';

export default function Root() {
  const [theme, setTheme] = useState<ThemeType>();
  const handleSetTheme = (theme: ThemeType) => {
    if (theme) {
      localStorage.setItem(THEME_KEY, theme);
    } else {
      localStorage.removeItem(THEME_KEY);
    }
    setTheme(theme);
  }
  const classes = [styles.root];
  if (theme === 'light') {
    classes.push(styles.light);
  } else if (theme === 'dark') {
    classes.push(styles.dark);
  }

  useEffect(() => {
    const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
    const darkMediaListener = (e: MediaQueryListEvent) => {
      e.matches && setTheme('dark');
    }
    const lightMedia = window.matchMedia('(prefers-color-scheme: light)');
    const lightMediaListener = (e: MediaQueryListEvent) => {
      e.matches && setTheme('light');
    }

    const initialTheme = localStorage.getItem('theme') as ThemeType;
    if (initialTheme) {
      setTheme(initialTheme);
    } else {
      if (lightMedia.matches) {
        setTheme('light');
      } else if (darkMedia.matches) {
        setTheme('dark');
      }
      darkMedia.addEventListener('change', darkMediaListener);
      lightMedia.addEventListener('change', lightMediaListener);
    }

    return () => {
      darkMedia.removeEventListener('change', darkMediaListener);
      lightMedia.removeEventListener('change', lightMediaListener);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ value: theme, setTheme: handleSetTheme }}>
      {
        theme &&
        <div className={classes.join(' ')}>
          <main className={styles.main}><Outlet/></main>
          <Footer/>
        </div>
      }
    </ThemeContext.Provider>
  )
}
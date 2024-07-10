import ThemeContext from '@/context/ThemeContext';
import { useContext } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const { value, setTheme } = useContext(ThemeContext);
  const handleToggleThemeClick = () => {
    setTheme(value === 'dark' ? 'light' : 'dark');
  }

  return (
    <footer className={styles.footer}>
      <ul className={styles.links}>
        <li><a href="#">Dummy link</a></li>
      </ul>
      <div className={styles.actions}>
        <button onClick={handleToggleThemeClick}>Toggle theme</button>
      </div>
      <div className={styles.copyright}>
        Created by John Doe and the GitHub Community
      </div>
    </footer>
  )
}
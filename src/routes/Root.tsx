import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';
import ThemeProvider from '@/provider/ThemeProvider';
import styles from './Root.module.css';

export default function Root() {
  return (
    <ThemeProvider>
      {
        <div className={styles.root}>
          <main className={styles.main}><Outlet/></main>
          <Footer/>
        </div>
      }
    </ThemeProvider>
  );
}

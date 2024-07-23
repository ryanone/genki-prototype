import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer';
import MultipleChoiceSettingsProvider from '@/provider/MultipleChoiceSettingsProvider';
import ThemeProvider from '@/provider/ThemeProvider';
import styles from './Root.module.css';

export default function Root() {
  return (
    <MultipleChoiceSettingsProvider>
      <ThemeProvider>
        <div className={styles.root}>
          <main className={styles.main}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </MultipleChoiceSettingsProvider>
  );
}

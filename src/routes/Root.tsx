import { Outlet } from 'react-router';
import Footer from '@/components/Footer';
import MultipleChoiceSettingsProvider from '@/provider/MultipleChoiceSettingsProvider';
import ShowFuriganaProvider from '@/provider/ShowFuriganaProvider';
import ThemeProvider from '@/provider/ThemeProvider';
import styles from './Root.module.css';

export default function Root() {
  return (
    <MultipleChoiceSettingsProvider>
      <ShowFuriganaProvider>
        <ThemeProvider>
          <div className={styles.root}>
            <main className={styles.main}>
              <Outlet />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </ShowFuriganaProvider>
    </MultipleChoiceSettingsProvider>
  );
}

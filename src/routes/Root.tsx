import { Outlet } from 'react-router';
import Footer from '@/components/Footer';
import MultipleChoiceSettingsProvider from '@/provider/MultipleChoiceSettingsProvider';
import ShowFuriganaProvider from '@/provider/ShowFuriganaProvider';
import ThemeProvider from '@/provider/ThemeProvider';
import * as styles from './Root.css';

export default function Root() {
  return (
    <MultipleChoiceSettingsProvider>
      <ShowFuriganaProvider>
        <ThemeProvider>
          <div className={styles.rootClass}>
            <main className={styles.mainClass}>
              <Outlet />
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </ShowFuriganaProvider>
    </MultipleChoiceSettingsProvider>
  );
}

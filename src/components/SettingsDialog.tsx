import {
  useContext, useEffect, useRef, type MouseEvent,
} from 'react';
import ThemeContext, { type Theme } from '@/context/ThemeContext';
import styles from './SettingsDialog.module.css';
import commonStyles from '@/styles/common.module.css';

type SettingsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (isOpen && ref.current) {
      ref.current.showModal();
    }
  }, [isOpen]);

  const handleDarkModeChange = (value: Theme) => {
    setTheme(value);
  };

  const handleCloseClick = (e: MouseEvent) => {
    e.preventDefault();
    ref.current?.close();
    onClose();
  };

  return (
    isOpen
    && (
    <dialog className={commonStyles.dialog} ref={ref}>
      <div className={commonStyles.dialogHeader}>Settings</div>
      <div className={commonStyles.dialogContent}>
        <div className={styles.heading}>
          Display
        </div>
        <dl className={styles.settings}>
          <dt className={styles.settingName}>Dark mode</dt>
          <dd className={styles.settingContent}>
            <ul className={styles.darkModeList}>
              <li>
                { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
                <label className={styles.darkModeLabel}>
                  <input
                    className={styles.darkModeRadio}
                    type="radio"
                    name="darkMode"
                    value=""
                    defaultChecked={!theme}
                    onClick={() => handleDarkModeChange(null)}
                  />
                  Device settings
                </label>
              </li>
              <li>
                { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
                <label className={styles.darkModeLabel}>
                  <input
                    className={styles.darkModeRadio}
                    type="radio"
                    name="darkMode"
                    value="light"
                    defaultChecked={theme === 'light'}
                    onClick={() => handleDarkModeChange('light')}
                  />
                  Off
                </label>
              </li>
              <li>
                { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
                <label className={styles.darkModeLabel}>
                  <input
                    className={styles.darkModeRadio}
                    type="radio"
                    name="darkMode"
                    value="dark"
                    defaultChecked={theme === 'dark'}
                    onClick={() => handleDarkModeChange('dark')}
                  />
                  Dark
                </label>
              </li>
            </ul>
          </dd>
        </dl>
      </div>
      <form className={commonStyles.dialogActions}>
        <button onClick={handleCloseClick} className={commonStyles.button} type="button">Close</button>
      </form>
    </dialog>
    )
  );
}

import { useContext } from 'react';
import Dialog from '@/components/Dialog';
import DialogActions from '@/components/Dialog/Actions';
import DialogContent from '@/components/Dialog/Content';
import DialogHeader from '@/components/Dialog/Header';
import ThemeContext, { type Theme } from '@/context/ThemeContext';
import styles from './SettingsDialog.module.css';

type SettingsDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsDialog({
  isOpen,
  onClose,
}: SettingsDialogProps) {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleDarkModeChange = (value: Theme) => {
    setTheme(value);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    isOpen && (
      <Dialog isOpen={isOpen}>
        <DialogHeader>Settings</DialogHeader>
        <DialogContent>
          <div className={styles.heading}>Display</div>
          <dl className={styles.settings}>
            <dt className={styles.settingName}>Dark mode</dt>
            <dd className={styles.settingContent}>
              <ul className={styles.darkModeList}>
                <li>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
        </DialogContent>
        <DialogActions onClose={handleClose} />
      </Dialog>
    )
  );
}

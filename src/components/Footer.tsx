import { FaGear } from 'react-icons/fa6';
import { useState } from 'react';
import SettingsDialog from '@/components/SettingsDialog';
import styles from './Footer.module.css';

export default function Footer() {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const handleSettingsDialogClose = () => {
    setShowSettingsDialog(false);
  };

  return (
    <footer className={styles.footer}>
      <ul className={styles.links}>
        <li><a href="https://sethclydesdale.github.io">Dummy link</a></li>
      </ul>
      <div className={styles.copyright}>
        Created by John Doe and the GitHub Community
      </div>
      <div className={styles.actions}>
        <button
          className={styles.settingsButton}
          onClick={() => setShowSettingsDialog(true)}
          type="button"
        >
          <FaGear className={styles.settingsIcon} aria-label="Settings" />
        </button>
        <SettingsDialog isOpen={showSettingsDialog} onClose={handleSettingsDialogClose} />
      </div>
    </footer>
  );
}

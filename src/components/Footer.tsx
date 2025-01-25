import { FaGear } from 'react-icons/fa6';
import { useState } from 'react';
import SettingsDialog from '@/components/SettingsDialog';
import * as styles from './Footer.css';

export default function Footer() {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const handleSettingsDialogClose = () => {
    setShowSettingsDialog(false);
  };

  return (
    <footer className={styles.footerClass}>
      <ul className={styles.linksClass}>
        <li>
          <a href="https://sethclydesdale.github.io">Dummy link</a>
        </li>
      </ul>
      <div className={styles.copyrightClass}>
        Created by John Doe and the GitHub Community
      </div>
      <div className={styles.actionsClass}>
        <button
          className={styles.settingsButtonClass}
          onClick={() => setShowSettingsDialog(true)}
          type="button"
        >
          <FaGear className={styles.settingsIconClass} aria-label="Settings" />
        </button>
        <SettingsDialog
          isOpen={showSettingsDialog}
          onClose={handleSettingsDialogClose}
        />
      </div>
    </footer>
  );
}

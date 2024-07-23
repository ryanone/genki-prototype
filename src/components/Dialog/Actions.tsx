import { type MouseEvent, type ReactNode } from 'react';
import styles from './Actions.module.css';
import commonStyles from '@/styles/common.module.css';

type DialogActionsProps = {
  children?: ReactNode;
  onClose: () => void;
};

export default function DialogActions({
  children,
  onClose,
}: DialogActionsProps) {
  const handleCloseClick = (e: MouseEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className={styles.actions}>
      {children}
      <button
        onClick={handleCloseClick}
        className={commonStyles.button}
        type="button"
      >
        Close
      </button>
    </div>
  );
}

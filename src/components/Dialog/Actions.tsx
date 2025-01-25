import { type MouseEvent, type ReactNode } from 'react';
import * as styles from './Actions.css';
import * as commonStyles from '@/styles/common.css';

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
    <div className={styles.actionsClass}>
      {children}
      <button
        onClick={handleCloseClick}
        className={commonStyles.primaryButtonClass}
        type="button"
        formMethod="dialog"
      >
        Close
      </button>
    </div>
  );
}

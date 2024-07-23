import { useEffect, useRef, type ReactNode } from 'react';
import styles from './Dialog.module.css';

type DialogProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Dialog({ children, isOpen, onClose }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElt = ref.current;
    function handleDialogClick(e: MouseEvent) {
      const rect = dialogElt?.getBoundingClientRect();
      if (rect) {
        const isInDialog =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        if (!isInDialog) {
          dialogElt?.close();
          onClose();
        }
      }
    }
    if (isOpen) {
      dialogElt?.showModal();
    } else {
      dialogElt?.close();
    }
    dialogElt?.addEventListener('click', handleDialogClick);

    return () => {
      dialogElt?.removeEventListener('click', handleDialogClick);
    };
  }, [isOpen, onClose]);

  return (
    <dialog className={styles.dialog} ref={ref}>
      <form className={styles.form} method="dialog">
        {children}
      </form>
    </dialog>
  );
}

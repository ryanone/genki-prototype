import { useEffect, useRef, type ReactNode } from 'react';
import styles from './Dialog.module.css';

type DialogProps = {
  children: ReactNode;
  isOpen: boolean;
};

export default function Dialog({ children, isOpen }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog className={styles.dialog} ref={ref}>
      <form className={styles.form} method="dialog">
        {children}
      </form>
    </dialog>
  );
}

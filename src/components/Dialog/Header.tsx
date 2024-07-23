import { type ReactNode } from 'react';
import styles from './Header.module.css';

type DialogHeaderProps = {
  children: ReactNode;
};

export default function DialogHeader({ children }: DialogHeaderProps) {
  return <div className={styles.header}>{children}</div>;
}

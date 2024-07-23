import { type ReactNode } from 'react';
import styles from './Content.module.css';

type DialogContentProps = {
  children: ReactNode;
};

export default function DialogContent({ children }: DialogContentProps) {
  return <div className={styles.content}>{children}</div>;
}

import { type ReactNode } from 'react';
import * as styles from './Content.css';

type DialogContentProps = {
  children: ReactNode;
};

export default function DialogContent({ children }: DialogContentProps) {
  return <div className={styles.contentClass}>{children}</div>;
}

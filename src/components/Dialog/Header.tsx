import { type ReactNode } from 'react';
import * as styles from './Header.css';

type DialogHeaderProps = {
  children: ReactNode;
};

export default function DialogHeader({ children }: DialogHeaderProps) {
  return <div className={styles.headerClass}>{children}</div>;
}

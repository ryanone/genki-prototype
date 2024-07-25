import { FaCircleInfo } from 'react-icons/fa6';
import { ReactNode } from 'react';
import styles from './Instructions.module.css';

type InstructionsProps = {
  children: ReactNode;
};

export default function Instructions({ children }: InstructionsProps) {
  return (
    <div className={styles.instructions}>
      <FaCircleInfo className={styles.icon} role="presentation" />
      {children}
    </div>
  );
}

import { FaCircleInfo } from 'react-icons/fa6';
import { ReactNode } from 'react';
import * as styles from './Instructions.css';

type InstructionsProps = {
  children: ReactNode;
};

export default function Instructions({ children }: InstructionsProps) {
  return (
    <div className={styles.instructionsClass}>
      <FaCircleInfo className={styles.iconClass} role="presentation" />
      {children}
    </div>
  );
}

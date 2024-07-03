import styles from './ProgressBar.module.css';

type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const completionStyles: Record<string, string> = {
    'width': `${(current/total) * 100}%`,
  };

  return (
    <div className={styles.progressBar}>
      <div className={styles.completion} style={completionStyles}></div>
      <div className={styles.status}>{current}/{total}</div>
    </div>
  )
}
import * as styles from './ProgressBar.css';

type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const completionStyles: Record<string, string> = {
    width: `${(current / total) * 100}%`,
  };

  return (
    <div
      className={styles.progressBarClass}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemax={total}
    >
      <div
        className={styles.completionClass}
        style={completionStyles}
        role="presentation"
      />
      <div className={styles.statusClass}>
        {current}/{total}
      </div>
    </div>
  );
}

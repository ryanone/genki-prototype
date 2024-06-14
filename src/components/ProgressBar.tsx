import './ProgressBar.css';

type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const completionStyles: Record<string, string> = {
    'width': `${(current/total) * 100}%`,
  };

  return (
    <div className="progressbar">
      <div className="progressbar__completion" style={completionStyles}></div>
      <div className="progressbar__status">{current}/{total}</div>
    </div>
  )
}
import { type Choice } from '@/data/exercise';
import styles from './ChoiceButton.module.css';

export interface ChoiceItem extends Choice {
  result?: 'SELECTED_CORRECT' | 'UNSELECTED_CORRECT' | 'INCORRECT' | undefined;
}

type ChoiceButtonProps = {
  data: ChoiceItem;
  isDisabled?: boolean;
  onClick?: (id: string) => void;
};

export default function ChoiceButton({
  data,
  isDisabled,
  onClick,
}: ChoiceButtonProps) {
  const classes = [styles.button];
  let ariaLabel = '';
  if (data.result === 'SELECTED_CORRECT') {
    classes.push(styles.selectedCorrect);
    ariaLabel = 'Correct answer chosen';
  } else if (data.result === 'UNSELECTED_CORRECT') {
    classes.push(styles.unselectedCorrect);
    ariaLabel = 'This is the correct answer';
  } else if (data.result === 'INCORRECT') {
    classes.push(styles.incorrect);
    ariaLabel = 'Incorrect answer chosen';
  }

  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
  };

  return (
    <button
      className={classes.join(' ')}
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={isDisabled ?? false}
      type="button"
    >
      {data.content}
    </button>
  );
}

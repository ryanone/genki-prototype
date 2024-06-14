import { type Choice } from '@/data/exercise';
import './ChoiceButton.css';

export interface ChoiceItem extends Choice {
  result?: 'SELECTED_CORRECT'|'UNSELECTED_CORRECT'|'INCORRECT'|undefined;
}

type ChoiceButtonProps = {
  data: ChoiceItem;
  isDisabled?: boolean;
  onClick?: (id: string) => void;
}

export default function ChoiceButton({ data, isDisabled, onClick }: ChoiceButtonProps) {
  const classes = ['choicebutton'];
  let ariaLabel = '';
  if (data.result === 'SELECTED_CORRECT') {
    classes.push('choicebutton--selected-correct');
    ariaLabel = 'Correct answer chosen';
  } else if (data.result === 'UNSELECTED_CORRECT') {
    classes.push('choicebutton--unselected-correct');
    ariaLabel = 'This is the correct answer';
  } else if (data.result === 'INCORRECT') {
    classes.push('choicebutton--incorrect');
    ariaLabel = 'Incorrect answer chosen';
  }

  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
  }

  return (
    <button className={classes.join(' ')} onClick={handleClick} aria-label={ariaLabel} disabled={isDisabled ?? false}>
      {data.content}
    </button>
  )
}
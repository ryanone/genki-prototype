import { type Choice } from '@/data/exercise';
import './ChoiceButton.css';

export interface ChoiceItem extends Choice {
  result?: 'SELECTED_CORRECT'|'UNSELECTED_CORRECT'|'INCORRECT'|undefined;
}

type ChoiceButtonProps = {
  data: ChoiceItem;
  isDisabled?: boolean;
  onClick: (id: string) => void;
}

export default function ChoiceButton({ data, isDisabled, onClick }: ChoiceButtonProps) {
  const classes = ['choicebutton'];
  if (data.result === 'SELECTED_CORRECT') {
    classes.push('choicebutton--selected-correct');
  } else if (data.result === 'UNSELECTED_CORRECT') {
    classes.push('choicebutton--unselected-correct');
  } else if (data.result === 'INCORRECT') {
    classes.push('choicebutton--incorrect');
  }

  return (
    <button className={classes.join(' ')} onClick={() => onClick(data.id)} role="button" disabled={isDisabled ?? false}>
      {data.content}
    </button>
  )
}
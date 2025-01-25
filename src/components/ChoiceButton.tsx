import type { ChoiceData } from '@/features/multipleChoice/slice';
import { choiceButton, ChoiceButtonVariant } from './ChoiceButton.css';

type ChoiceButtonProps = {
  data: ChoiceData;
  isDisabled?: boolean;
  onClick?: (id: string) => void;
};

export default function ChoiceButton({
  data,
  isDisabled,
  onClick,
}: ChoiceButtonProps) {
  let ariaLabel = '';
  let choiceButtonVariant: ChoiceButtonVariant;
  if (data.result === 'SELECTED_CORRECT') {
    choiceButtonVariant = { mode: 'selectedCorrect' };
    ariaLabel = 'Correct answer chosen';
  } else if (data.result === 'UNSELECTED_CORRECT') {
    choiceButtonVariant = { mode: 'unselectedCorrect' };
    ariaLabel = 'This is the correct answer';
  } else if (data.result === 'INCORRECT') {
    choiceButtonVariant = { mode: 'incorrect' };
    ariaLabel = 'Incorrect answer chosen';
  }

  const handleClick = () => {
    if (onClick) {
      onClick(data.id);
    }
  };

  return (
    <button
      className={choiceButton(choiceButtonVariant)}
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={isDisabled ?? false}
      type="button"
    >
      {data.content}
    </button>
  );
}

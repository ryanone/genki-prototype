import ChoiceButton from '@/components/ChoiceButton';
import { type ChoiceData } from '@/features/multipleChoice/slice';
import * as styles from './ChoiceList.css';

type ChoiceListProps = {
  choices: ChoiceData[];
  isDisabled?: boolean;
  onChoiceSelect?: (id: string) => void;
};

export default function ChoiceList({
  choices,
  isDisabled,
  onChoiceSelect,
}: ChoiceListProps) {
  return (
    <ol className={styles.choiceListClass}>
      {choices.map((choice) => (
        <ChoiceButton
          key={choice.id}
          data={choice}
          isDisabled={isDisabled}
          onClick={onChoiceSelect}
        />
      ))}
    </ol>
  );
}

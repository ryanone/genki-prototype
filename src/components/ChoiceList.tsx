import ChoiceButton from '@/components/ChoiceButton';
import { type ChoiceItem } from '@/components/ChoiceButton';
import styles from './ChoiceList.module.css';

type ChoiceListProps = {
  choices: ChoiceItem[];
  isDisabled?: boolean;
  onChoiceSelect?: (id: string) => void;
};

export default function ChoiceList({
  choices,
  isDisabled,
  onChoiceSelect,
}: ChoiceListProps) {
  return (
    <ol className={styles.list}>
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

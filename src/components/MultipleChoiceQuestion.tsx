import ChoiceList from '@/components/ChoiceList';
import { type ChoiceItem } from '@/components/ChoiceButton';
import { type Question } from '@/data/exercise';
import styles from './MultipleChoiceQuestion.module.css';

type MultipleChoiceQuestionProps = {
  choices: ChoiceItem[];
  index: number;
  isDisabled?: boolean;
  onChoiceSelect?: (id: string) => void;
  question: Question;
};

export default function MultipleChoiceQuestion({
  choices,
  index,
  isDisabled,
  question,
  onChoiceSelect,
}: MultipleChoiceQuestionProps) {
  return (
    <div className={styles.multipleChoiceQuestion}>
      <div className={styles.content}>
        {`${index + 1}. ${question.content}`}
      </div>
      <div className={styles.choicesContainer}>
        <ChoiceList
          choices={choices}
          isDisabled={isDisabled}
          onChoiceSelect={onChoiceSelect}
        />
      </div>
    </div>
  );
}

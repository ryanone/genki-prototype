import { type ReactNode } from 'react';
import ChoiceList from '@/components/ChoiceList';
import { type ChoiceData } from '@/features/multipleChoice/slice';
import styles from './MultipleChoiceQuestion.module.css';

type MultipleChoiceQuestionProps = {
  choices: ChoiceData[];
  index: number;
  isDisabled?: boolean;
  onChoiceSelect?: (id: string) => void;
  questionContent: ReactNode;
};

export default function MultipleChoiceQuestion({
  choices,
  index,
  isDisabled,
  questionContent,
  onChoiceSelect,
}: MultipleChoiceQuestionProps) {
  return (
    <div className={styles.multipleChoiceQuestion}>
      <div className={styles.index}>{index + 1})</div>
      <div className={styles.content}>{questionContent}</div>
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

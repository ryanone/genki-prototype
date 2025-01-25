import { type ReactNode } from 'react';
import ChoiceList from '@/components/ChoiceList';
import { type ChoiceData } from '@/features/multipleChoice/slice';
import * as styles from './MultipleChoiceQuestion.css';

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
    <div className={styles.multipleChoiceQuestionClass}>
      <div className={styles.indexClass}>{index + 1})</div>
      <div className={styles.contentClass}>{questionContent}</div>
      <div className={styles.choicesContainerClass}>
        <ChoiceList
          choices={choices}
          isDisabled={isDisabled}
          onChoiceSelect={onChoiceSelect}
        />
      </div>
    </div>
  );
}

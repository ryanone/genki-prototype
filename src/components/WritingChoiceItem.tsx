import { useId, useState, type FormEvent } from 'react';
import { type Question } from '@/data/exercise';
import type { WritingChoiceResult } from '@/features/writingChoice/slice';
import * as commonStyles from '@/styles/common.css';
import { input, type InputVariant } from './WritingChoiceItem.css';
import * as styles from './WritingChoiceItem.css';

type WritingChoiceItemProps = {
  answerContent?: string;
  index: number;
  onChoiceChange: (question: Question, value: string) => void;
  question: Question;
  result?: WritingChoiceResult;
};

export default function WritingChoiceItem({
  answerContent,
  index,
  onChoiceChange,
  question,
  result,
}: WritingChoiceItemProps) {
  const inputId = useId();
  const describedById = useId();
  const [value, setValue] = useState('');
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onChoiceChange(question, e.currentTarget.value);
  };
  let inputVariant: InputVariant;
  const isDisabled = !!result;
  const isCorrect = result === 'CORRECT';
  const isIncorrect = result === 'INCORRECT';
  if (isIncorrect) {
    inputVariant = { mode: 'incorrect' };
  } else if (isCorrect) {
    inputVariant = { mode: 'correct' };
  }

  return (
    <div className={styles.writingChoiceItemClass}>
      <div>{index}.</div>
      <div className={styles.inputContainerClass}>
        <span className={styles.inputLineClass}>
          (
          <input
            type="text"
            className={`${input(inputVariant)} ${commonStyles.inputClass}`}
            id={inputId}
            value={value}
            disabled={!!isDisabled}
            onChange={handleInputChange}
            aria-describedby={describedById}
          />
          )
        </span>
        {isIncorrect && answerContent && (
          <>
            <div className={styles.answerContentClass} aria-hidden="true">
              {answerContent}
            </div>
            <div className={commonStyles.hiddenClass}>
              The correct answer is {answerContent}
            </div>
          </>
        )}
        {isCorrect && (
          <div className={commonStyles.hiddenClass}>
            This answer is correct.
          </div>
        )}
      </div>
      <label htmlFor={inputId}>{question.content}</label>
    </div>
  );
}

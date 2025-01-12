import { useId, useState, type FormEvent } from 'react';
import { type Question } from '@/data/exercise';
import type { WritingChoiceResult } from '@/features/writingChoice/slice';
import commonStyles from '@/styles/common.module.css';
import styles from './WritingChoiceItem.module.css';

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
  const inputClasses = [styles.input, commonStyles.input];
  const isDisabled = !!result;
  const isCorrect = result === 'CORRECT';
  const isIncorrect = result === 'INCORRECT';
  if (isIncorrect) {
    inputClasses.push(styles.incorrect);
  } else if (isCorrect) {
    inputClasses.push(styles.correct);
  }

  return (
    <div className={styles.writingChoiceItem}>
      <div>{index}.</div>
      <div className={styles.inputContainer}>
        <span className={styles.inputLine}>
          (
          <input
            type="text"
            className={inputClasses.join(' ')}
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
            <div className={styles.answerContent} aria-hidden="true">
              {answerContent}
            </div>
            <div className={commonStyles.hidden}>
              The correct answer is {answerContent}
            </div>
          </>
        )}
        {isCorrect && (
          <div className={commonStyles.hidden}>This answer is correct.</div>
        )}
      </div>
      <label htmlFor={inputId}>{question.content}</label>
    </div>
  );
}

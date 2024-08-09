import { useId, useState, type FormEvent } from 'react';
import commonStyles from '@/styles/common.module.css';
import styles from './ShortAnswerInput.module.css';

type ShortAnswerInputProps = {
  answerContent?: string | undefined;
  defaultValue?: string | undefined;
  onChange: (value: string) => void;
  result?: 'CORRECT' | 'INCORRECT';
  width?: number | undefined;
};

export default function ShortAnswerInput({
  answerContent,
  defaultValue,
  onChange,
  result,
  width,
}: ShortAnswerInputProps) {
  const inputId = useId();
  const [value, setValue] = useState(defaultValue ?? '');
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onChange(e.currentTarget.value);
  };
  const inputClasses = [styles.input];
  let showAnswer = false;
  let showCorrectAnswerConfirmation = false;
  const isDisabled = !!result;
  if (result === 'CORRECT') {
    inputClasses.push(styles.correct);
    showCorrectAnswerConfirmation = true;
  } else if (result === 'INCORRECT') {
    showAnswer = true;
    inputClasses.push(styles.incorrect);
  }

  const style: Record<string, string> = {};
  if (width) {
    style['--width'] = `${width}px`;
  }

  return (
    <span className={styles.shortAnswerInput}>
      <input
        id={inputId}
        type="text"
        className={inputClasses.join(' ')}
        disabled={!!isDisabled}
        value={value}
        onChange={handleInputChange}
        style={style}
      />
      {showAnswer && (
        <>
          <div className={styles.answerContent} aria-hidden="true">
            {answerContent ?? ''}
          </div>
          {answerContent && (
            <div className={commonStyles.hidden}>
              The correct answer is {answerContent}
            </div>
          )}
        </>
      )}
      {showCorrectAnswerConfirmation && (
        <div className={commonStyles.hidden}>This answer is correct.</div>
      )}
    </span>
  );
}

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
  const isDisabled = !!result;
  const isCorrect = result === 'CORRECT';
  const isIncorrect = result === 'INCORRECT';
  if (isCorrect) {
    inputClasses.push(styles.correct);
  } else if (result === 'INCORRECT') {
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
      {isIncorrect && answerContent && (
        <>
          <div className={styles.answerContent} aria-hidden="true">
            {answerContent ?? ''}
          </div>
          <div className={commonStyles.hidden}>
            The correct answer is {answerContent}
          </div>
        </>
      )}
      {isCorrect && (
        <div className={commonStyles.hidden}>This answer is correct.</div>
      )}
    </span>
  );
}

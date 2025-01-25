import { useId, useState, type FormEvent } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as commonStyles from '@/styles/common.css';
import { input, widthVar, type InputVariant } from './ShortAnswerInput.css';
import * as styles from './ShortAnswerInput.css';

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
  const isDisabled = !!result;
  const isCorrect = result === 'CORRECT';
  const isIncorrect = result === 'INCORRECT';
  let inputVariant: InputVariant;
  if (isCorrect) {
    inputVariant = { mode: 'correct' };
  } else if (isIncorrect) {
    inputVariant = { mode: 'incorrect' };
  }

  return (
    <span className={styles.shortAnswerInputClass}>
      <input
        id={inputId}
        type="text"
        className={input(inputVariant)}
        disabled={!!isDisabled}
        value={value}
        onChange={handleInputChange}
        style={assignInlineVars({
          [widthVar]: width ? `${width}px` : undefined,
        })}
      />
      {isIncorrect && answerContent && (
        <>
          <div className={styles.answerContentClass} aria-hidden="true">
            {answerContent ?? ''}
          </div>
          <div className={commonStyles.hiddenClass}>
            The correct answer is {answerContent}
          </div>
        </>
      )}
      {isCorrect && (
        <div className={commonStyles.hiddenClass}>This answer is correct.</div>
      )}
    </span>
  );
}

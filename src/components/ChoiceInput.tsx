import { useId, useState, type FormEvent } from 'react';
import commonStyles from '@/styles/common.module.css';
import styles from './ChoiceInput.module.css';

type ChoiceInputProps = {
  correctValue?: string | undefined;
  defaultValue?: string | undefined;
  isDisabled?: boolean;
  onChange: (questionContent: string, value: string) => void;
  questionContent: string;
  result?: 'CORRECT' | 'INCORRECT' | undefined;
};

export default function ChoiceInput({
  correctValue,
  defaultValue,
  isDisabled,
  onChange,
  questionContent,
  result,
}: ChoiceInputProps) {
  const inputId = useId();
  const describedById = useId();
  const [value, setValue] = useState(defaultValue ?? '');
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onChange(questionContent, e.currentTarget.value);
  };

  const inputClasses = [styles.input];
  let description;
  if (result === 'CORRECT') {
    inputClasses.push(styles.correct);
    description = 'The input value is correct';
  } else if (result === 'INCORRECT') {
    inputClasses.push(styles.incorrect);
    description = 'The input value is incorrect';
  }

  return (
    <div className={styles.choiceInput}>
      {description && (
        <span
          id={describedById}
          className={commonStyles.hidden}
          data-testid="choice-input-result"
        >
          {description}
        </span>
      )}
      <label className={styles.label} htmlFor={inputId}>
        {questionContent}
      </label>
      <input
        type="text"
        className={inputClasses.join(' ')}
        id={inputId}
        onChange={handleInputChange}
        disabled={!!isDisabled}
        value={value}
        aria-describedby={describedById}
      />
      {result && (
        <div className={styles.correctAnswer}>
          {result === 'INCORRECT' ? correctValue : ''}
        </div>
      )}
    </div>
  );
}

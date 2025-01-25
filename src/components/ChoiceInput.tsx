import { useId, useState, type FormEvent } from 'react';
import * as commonStyles from '@/styles/common.css';
import {
  choiceInputClass,
  correctAnswerClass,
  input,
  labelClass,
  ChoiceInputVariant,
} from '@/components/ChoiceInput.css';

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

  let description;
  let inputVariant: ChoiceInputVariant;
  if (result === 'CORRECT') {
    inputVariant = { mode: 'correct' };
    description = 'The input value is correct';
  } else if (result === 'INCORRECT') {
    inputVariant = { mode: 'incorrect' };
    description = 'The input value is incorrect';
  }

  return (
    <div className={choiceInputClass}>
      {description && (
        <span
          id={describedById}
          className={commonStyles.hiddenClass}
          data-testid="choice-input-result"
        >
          {description}
        </span>
      )}
      <label className={labelClass} htmlFor={inputId}>
        {questionContent}
      </label>
      <input
        type="text"
        className={input(inputVariant)}
        id={inputId}
        onChange={handleInputChange}
        disabled={!!isDisabled}
        value={value}
        aria-describedby={describedById}
      />
      {result && (
        <div className={correctAnswerClass}>
          {result === 'INCORRECT' ? correctValue : ''}
        </div>
      )}
    </div>
  );
}

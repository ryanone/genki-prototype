import { forwardRef, useId, useState, type FormEvent } from 'react';
import { FaStar } from 'react-icons/fa6';
import type { WritingInputResult } from '@/features/writingPractice/slice';
import * as commonStyles from '@/styles/common.css';
import {
  iconClass,
  input,
  writingInputClass,
  type InputVariant,
} from './WritingInput.css';

type WritingInputProps = {
  defaultValue?: string | undefined;
  index: number;
  isDisabled?: boolean;
  onChange: (value: string, index: number) => void;
  placeholder?: string;
  result?: WritingInputResult;
};

export type Ref = HTMLInputElement;

const WritingInput = forwardRef<Ref, WritingInputProps>(function WritingInput(
  {
    defaultValue,
    index,
    isDisabled,
    onChange,
    placeholder,
    result,
  }: WritingInputProps,
  ref,
) {
  const inputId = useId();
  const describedById = useId();
  const [value, setValue] = useState(defaultValue ?? '');
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onChange(e.currentTarget.value, index);
  };

  let inputVariant: InputVariant;
  let description;
  const isCorrect = result === 'CORRECT';
  if (result === 'INCORRECT') {
    inputVariant = { mode: 'incorrect' };
    description = 'The input value is incorrect';
  } else if (isCorrect) {
    description = 'The input value is correct';
  }

  return (
    <div className={writingInputClass}>
      {description && (
        <span
          id={describedById}
          className={commonStyles.hiddenClass}
          data-testid="writing-input-result"
        >
          {description}
        </span>
      )}
      <label className={commonStyles.hiddenClass} htmlFor={inputId}>
        {placeholder ? `Enter ${placeholder}` : 'Enter value'}
      </label>
      <input
        className={input(inputVariant)}
        id={inputId}
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        ref={ref}
        value={value}
        disabled={!!isDisabled}
        aria-describedby={describedById}
      />
      {isCorrect && <FaStar role="presentation" className={iconClass} />}
    </div>
  );
});

export default WritingInput;

import { forwardRef, useId, useState, type FormEvent } from 'react';
import { FaStar } from 'react-icons/fa6';
import type { WritingInputResult } from '@/features/writingPractice/writingPracticeSlice';
import commonStyles from '@/styles/common.module.css';
import styles from './WritingInput.module.css';

type WritingInputProps = {
  index: number;
  isDisabled?: boolean;
  onChange: (value: string, index: number) => void;
  placeholder?: string;
  result?: WritingInputResult;
};

export type Ref = HTMLInputElement;

const WritingInput = forwardRef<Ref, WritingInputProps>(function WritingInput(
  { index, isDisabled, onChange, placeholder, result }: WritingInputProps,
  ref,
) {
  const inputId = useId();
  const describedById = useId();
  const [value, setValue] = useState('');
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onChange(e.currentTarget.value, index);
  };

  const inputClasses = [styles.input];
  let description;
  const isCorrect = result === 'CORRECT';
  if (result === 'INCORRECT') {
    inputClasses.push(styles.incorrect);
    description = 'The input value is incorrect';
  } else if (isCorrect) {
    description = 'The input value is correct';
  }

  return (
    <div className={styles.writingInput}>
      {description && (
        <span id={describedById} className={commonStyles.hidden}>
          {description}
        </span>
      )}
      <label className={commonStyles.hidden} htmlFor={inputId}>
        {placeholder ? `Enter ${placeholder}` : 'Enter value'}
      </label>
      <input
        className={inputClasses.join(' ')}
        id={inputId}
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        ref={ref}
        value={value}
        disabled={!!isDisabled}
        aria-describedby={describedById}
      />
      {isCorrect && <FaStar role="presentation" className={styles.icon} />}
    </div>
  );
});

export default WritingInput;

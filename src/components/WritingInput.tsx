import { useId, useState, type FormEvent } from 'react';
import { FaStar } from 'react-icons/fa6';
import commonStyles from '@/styles/common.module.css';
import styles from './WritingInput.module.css';

type WritingInputProps = {
  isDisabled?: boolean;
  onChange: (value: string) => void;
  placeholder?: string;
  result?: 'CORRECT' | 'INCORRECT';
};

export default function WritingInput({
  isDisabled,
  onChange,
  placeholder,
  result,
}: WritingInputProps) {
  const inputId = useId();
  const describedById = useId();
  const [value, setValue] = useState('');
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onChange(e.currentTarget.value);
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
        value={value}
        disabled={!!isDisabled}
        aria-describedby={describedById}
      />
      {isCorrect && <FaStar role="presentation" className={styles.icon} />}
    </div>
  );
}

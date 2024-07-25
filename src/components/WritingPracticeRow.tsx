import { forwardRef, useRef } from 'react';
import WritingExample from '@/components/WritingExample';
import WritingInput from '@/components/WritingInput';
import type { Ref as WritingInputRefType } from '@/components/WritingInput';
import type { Choice } from '@/data/exercise';

type WritingPracticeRowProps = {
  choice: Choice;
  numExamples: number;
  numRepetitions: number;
  onRowComplete: (rowNumber: number) => void;
  rowNumber: number;
};

const WritingPracticeRow = forwardRef<
  WritingInputRefType,
  WritingPracticeRowProps
>(function WritingPracticeRow(
  {
    choice,
    numExamples,
    numRepetitions,
    onRowComplete,
    rowNumber,
  }: WritingPracticeRowProps,
  ref,
) {
  const inputRefs = useRef<WritingInputRefType[]>([]);

  const handleInputChange = (value: string, index: number) => {
    if (value === choice.content) {
      if (index < numRepetitions - 1) {
        inputRefs.current[index + 1].focus();
      } else {
        onRowComplete(rowNumber);
      }
    }
  };

  return (
    <>
      <WritingExample content={choice.content} />
      {Array.from({ length: numRepetitions }).map((_, i) =>
        i === 0 ? (
          <WritingInput
            index={i}
            // eslint-disable-next-line react/no-array-index-key
            key={`${choice.id}-${i}`}
            placeholder={i < numExamples ? choice.content : ''}
            ref={ref}
            onChange={handleInputChange}
          />
        ) : (
          <WritingInput
            index={i}
            // eslint-disable-next-line react/no-array-index-key
            key={`${choice.id}-${i}`}
            placeholder={i < numExamples ? choice.content : ''}
            ref={(el) => {
              if (el) {
                inputRefs.current[i] = el;
              }
            }}
            onChange={handleInputChange}
          />
        ),
      )}
    </>
  );
});

export default WritingPracticeRow;

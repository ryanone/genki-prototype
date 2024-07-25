import { forwardRef, useRef } from 'react';
import WritingExample from '@/components/WritingExample';
import WritingInput from '@/components/WritingInput';
import useAppSelector from '@/hooks/useAppSelector';
import type { Ref as WritingInputRefType } from '@/components/WritingInput';
import type { Choice } from '@/data/exercise';

type WritingPracticeRowProps = {
  choice: Choice;
  numExamples: number;
  numRepetitions: number;
  onInputChange: (choiceId: string, column: number, value: string) => void;
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
    onInputChange,
    onRowComplete,
    rowNumber,
  }: WritingPracticeRowProps,
  ref,
) {
  const inputRefs = useRef<WritingInputRefType[]>([]);
  const row = useAppSelector((state) => state.writingPractice.rows[rowNumber]);
  const isFinished = useAppSelector(
    (state) => state.writingPractice.isFinished,
  );

  const handleInputChange = (value: string, index: number) => {
    if (value === choice.content) {
      if (index < numRepetitions - 1) {
        inputRefs.current[index + 1].focus();
      } else {
        onRowComplete(rowNumber);
      }
    }
    onInputChange(choice.id, index, value);
  };

  return (
    <>
      <WritingExample content={choice.content} />
      {Array.from({ length: numRepetitions }).map((_, i) =>
        i === 0 ? (
          <WritingInput
            defaultValue={row.answers[i].content}
            index={i}
            isDisabled={isFinished}
            // eslint-disable-next-line react/no-array-index-key
            key={`${choice.id}-${i}`}
            placeholder={i < numExamples ? choice.content : ''}
            ref={ref}
            result={row.answers[i].result}
            onChange={handleInputChange}
          />
        ) : (
          <WritingInput
            defaultValue={row.answers[i].content}
            index={i}
            isDisabled={isFinished}
            // eslint-disable-next-line react/no-array-index-key
            key={`${choice.id}-${i}`}
            placeholder={i < numExamples ? choice.content : ''}
            ref={(el) => {
              if (el) {
                inputRefs.current[i] = el;
              }
            }}
            result={row.answers[i].result}
            onChange={handleInputChange}
          />
        ),
      )}
    </>
  );
});

export default WritingPracticeRow;

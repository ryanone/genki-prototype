import { forwardRef, useContext, useRef } from 'react';
import ShowFuriganaContext from '@/context/ShowFuriganaContext';
import WritingExample from '@/components/WritingExample';
import WritingInput from '@/components/WritingInput';
import useAppSelector from '@/hooks/useAppSelector';
import type { Ref as WritingInputRefType } from '@/components/WritingInput';
import type { Question } from '@/data/exercise';

type WritingPracticeRowProps = {
  numExamples: number;
  numRepetitions: number;
  onInputChange: (choiceId: string, column: number, value: string) => void;
  onRowComplete: (rowNumber: number) => void;
  question: Question;
  rowNumber: number;
};

const WritingPracticeRow = forwardRef<
  WritingInputRefType,
  WritingPracticeRowProps
>(function WritingPracticeRow(
  {
    numExamples,
    numRepetitions,
    onInputChange,
    onRowComplete,
    question,
    rowNumber,
  }: WritingPracticeRowProps,
  ref,
) {
  const inputRefs = useRef<WritingInputRefType[]>([]);
  const { showFurigana } = useContext(ShowFuriganaContext);
  const row = useAppSelector((state) => state.writingPractice.rows[rowNumber]);
  const isFinished = useAppSelector(
    (state) => state.writingPractice.isFinished,
  );

  const handleInputChange = (value: string, index: number) => {
    if (value === question.content) {
      if (index < numRepetitions - 1) {
        inputRefs.current[index + 1].focus();
      } else {
        onRowComplete(rowNumber);
      }
    }
    onInputChange(question.content, index, value);
  };

  return (
    <>
      <WritingExample
        alt={question.alt}
        content={question.content}
        showAlt={showFurigana}
      />
      {Array.from({ length: numRepetitions }).map((_, i) =>
        i === 0 ? (
          <WritingInput
            defaultValue={row.answers[i].content}
            index={i}
            isDisabled={isFinished}
            // eslint-disable-next-line react/no-array-index-key
            key={`${question.content}-${i}`}
            placeholder={i < numExamples ? question.content : ''}
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
            key={`${question.content}-${i}`}
            placeholder={i < numExamples ? question.content : ''}
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

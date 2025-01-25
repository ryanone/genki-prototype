import { useState, type ReactNode } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  restart,
  review,
  selectAnswers,
  selectResults,
  setAnswer,
} from '@/features/writingChoice/slice';
import CheckAnswersDialog from '@/components/CheckAnswersDialog';
import ExerciseResults from '@/components/ExerciseResults';
import Instructions from '@/components/Instructions';
import Timer from '@/components/Timer';
import WritingChoiceItem from '@/components/WritingChoiceItem';
import WritingChoicesList from '@/components/WritingChoicesList';
import useAppSelector from '@/hooks/useAppSelector';
import useAppDispatch from '@/hooks/useAppDispatch';
import { type Question } from '@/data/exercise';
import {
  actionsClass,
  answersClass,
  checkAnswersButtonClass,
  contentClass,
  numColumnsVar,
  numRowsVar,
  questionsFlowVar,
  writingChoiceClass,
} from './WritingChoice.css';

export default function WritingChoice() {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [checkAnswersDialogContent, setCheckAnswersDialogContent] = useState<
    ReactNode | undefined
  >();
  const dispatch = useAppDispatch();
  const results = useAppSelector(selectResults);
  const isFinished = useAppSelector((state) => state.writingChoice.isFinished);
  const choices = useAppSelector((state) => state.writingChoice.choices);
  const meta = useAppSelector((state) => state.writingChoice.meta!);
  const answers = useAppSelector(selectAnswers);
  const numColumns = meta.numColumns ?? 2;
  const numRows = Math.ceil(answers.length / numColumns);
  const answersStyles = assignInlineVars({
    [numColumnsVar]: `${numColumns}`,
    [numRowsVar]: `${numRows}`,
    [questionsFlowVar]: meta.questionsFlow === 'HORIZONTAL' ? 'row' : 'column',
  });
  const handleCheckAnswersClick = () => {
    setCheckAnswersDialogContent(
      <p>Checking your answers will end the quiz. Do you want to continue?</p>,
    );
  };
  const handleWritingChoiceChange = (question: Question, value: string) => {
    dispatch(
      setAnswer({
        question,
        answer: value,
      }),
    );
  };
  const handleRestart = () => {
    dispatch(restart());
  };
  const handleReviewCancel = () => {
    setCheckAnswersDialogContent(undefined);
  };
  const handleReviewConfirm = () => {
    dispatch(review());
    setCheckAnswersDialogContent(undefined);
  };

  return (
    <div className={writingChoiceClass}>
      {isFinished && results && (
        <ExerciseResults
          exerciseType="WRITING_CHOICE"
          numSolved={results.numSolved}
          numWrong={results.numWrong}
          timeElapsed={timeElapsed}
          onRestart={handleRestart}
        />
      )}
      <Instructions>{meta.instructions}</Instructions>
      <div className={contentClass}>
        <div className={answersClass} style={answersStyles}>
          {answers.map((a, i) => (
            <WritingChoiceItem
              key={a.question.content}
              answerContent={a.answerContent}
              index={i + 1}
              onChoiceChange={handleWritingChoiceChange}
              question={a.question}
              result={a.result}
            />
          ))}
        </div>
        <WritingChoicesList choices={choices} />
      </div>
      <div className={actionsClass}>
        {!isFinished && (
          <button
            onClick={handleCheckAnswersClick}
            className={checkAnswersButtonClass}
            type="button"
          >
            <FaCheck role="presentation" />
            Check Answers
          </button>
        )}
      </div>
      <Timer isRunning={!isFinished} onStop={setTimeElapsed} />
      <CheckAnswersDialog
        content={checkAnswersDialogContent}
        isOpen={!!checkAnswersDialogContent}
        onCancel={handleReviewCancel}
        onConfirm={handleReviewConfirm}
      />
    </div>
  );
}

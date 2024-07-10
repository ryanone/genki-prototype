import { CiGrid2H, CiGrid2V } from 'react-icons/ci';
import { FaArrowsRotate, FaBook, FaCircleInfo } from 'react-icons/fa6';
import { useCallback, useEffect, useRef, useState } from 'react';
import DropTarget from '@/components/DropTarget';
import DraggableItem from '@/components/DraggableItem';
import ExerciseResults from '@/components/ExerciseResults';
import ReviewDialog from '@/components/ReviewDialog';
import Timer from '@/components/Timer';
import { createLayoutConfiguration } from '@/utils/dragDrop';
import { randomizeArray } from '@/utils/randomize';
import type { Choice, Exercise, Question } from '@/data/exercise';
import styles from './DragDrop.module.css';
import commonStyles from '@/styles/common.module.css';

type DragDropProps = {
  data: Exercise;
}

type Answer = {
  question: Question;
  selectedChoiceId?: string;
  numGuesses?: number;
  result?: 'CORRECT'|'INCORRECT';
}

export default function DragDrop({ data }: DragDropProps) {
  const config = createLayoutConfiguration(data);
  const {
    dropTargetLayout,
    instructions,
    maxTrackLen,
    questionsFlow,
    questionsTrackConfig,
    questionsStyles,
    randomizeQuestions
  } = config;
  const selectedChoiceId = useRef<string|undefined>(undefined);
  const timeElapsed = useRef(0);
  const questions = useRef(randomizeQuestions ? randomizeArray(data.questions) as Question[] : data.questions);
  const [isReviewConfirmed, setIsReviewConfirmed] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(config.isHorizontal);
  const [answers, setAnswers] = useState<Answer[]>(questions.current.map(question => ({ question })));
  const [choices, setChoices] = useState(randomizeArray(data.choices) as Choice[]);

  const correctChoiceIds = new Set(Array.from(answers.values()).filter((val) => val.result === 'CORRECT').map((val) => val.selectedChoiceId));
  const remainingChoices = choices.filter(choice => !correctChoiceIds.has(choice.id));
  const rootClasses = [styles.dragDrop, isHorizontal ? styles.horizontal : styles.vertical];

  const handleDropTargetDrop = (questionId: string) => {
    // If there's a selected choice, update the entry in the `answers` list
    if (selectedChoiceId.current) {
      const index = answers.findIndex(a => a.question.content === questionId);
      const answer = answers[index];
      if (answer) {
        answer.numGuesses = answer.numGuesses === undefined ? 1 : answer.numGuesses + 1;
        answer.selectedChoiceId = selectedChoiceId.current;
        answer.result = answer.selectedChoiceId === answer.question.choices.correctId ?
          'CORRECT' : 'INCORRECT';
        setAnswers(a => {
          return [
            ...a.slice(0, index),
            { ...answer },
            ...a.slice(index + 1)
          ]
        });
      }
    }
    selectedChoiceId.current = undefined;
  }
  const handleChoiceSelect = (id: string) => {
    selectedChoiceId.current = id;
  }
  const handleChoiceUnselect = useCallback(() => {
    selectedChoiceId.current = undefined;
  }, []);
  const handleReviewClick = () => {
    setShowReviewDialog(true);
  }
  const handleReviewCancel = () => {
    setShowReviewDialog(false);
  }
  const handleReviewConfirm = () => {
    setShowReviewDialog(false);
    setIsReviewConfirmed(true);
    setAnswers(answers.map(a => {
      if (!a.result) {
        a.selectedChoiceId = a.question.choices.correctId;
      }
      return a;
    }))
  }
  const handleRestart = () => {
    selectedChoiceId.current = undefined;
    questions.current = randomizeQuestions ? randomizeArray(data.questions) as Question[] : data.questions;
    setAnswers(questions.current.map(question => ({ question })));
    setChoices(randomizeArray(data.choices) as Choice[]);
    setShowReviewDialog(false);
    setIsReviewConfirmed(false);
  }
  const isFinished = isReviewConfirmed || !remainingChoices.length;
  const canChangeLayout = !isFinished && data.meta?.DRAG_DROP?.supportedLayouts?.length && data.meta?.DRAG_DROP?.supportedLayouts?.length > 1;
  const isTimerRunning = !isFinished && !showReviewDialog;
  const numSolved = isFinished && remainingChoices.length === 0 ? answers.length : 0;
  const numWrong = isFinished && remainingChoices.length === 0 ?
    answers.filter(a => a.numGuesses && a.numGuesses > 1).length : 0;

  useEffect(() => {
    // If not clicking on another choice, or a drop zone, set the selected choice to undefined
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.attributes.getNamedItem('data-drop-target-zone')?.value !== 'true' &&
          target.attributes.getNamedItem('data-draggable-item')?.value !== 'true') {
        handleChoiceUnselect();
      }
    }
    document.body.addEventListener('click', handleDocumentClick)

    return () => {
      document.body.removeEventListener('click', handleDocumentClick)
    }
  }, [handleChoiceUnselect]);


  let trackRemaining = questionsTrackConfig?.shift();
  let currTrackLen = 0;
  return (
    <div className={rootClasses.join(' ')}>
      {
        isFinished && remainingChoices.length === 0 ?
          <ExerciseResults numSolved={numSolved} numWrong={numWrong} timeElapsed={timeElapsed.current} onRestart={handleRestart} /> :
          undefined
      }
      {instructions && <div className={styles.instructions}><FaCircleInfo className={styles.instructionsIcon} role="presentation"/>{instructions}</div>}
      <div className={styles.main}>
        <div className={styles.questions} style={questionsStyles}>
          {
            answers.map(a => {
              const val1 = {
                content: a.question.content,
                id: a.question.content,
              };
              let numIncorrectGuesses, result, val2;
              if (a.selectedChoiceId) {
                val2 = choices.find(c => c.id === a.selectedChoiceId);
                result = a.result;
                numIncorrectGuesses = isFinished && a.numGuesses && a.numGuesses > 1 ? a.numGuesses - 1 : undefined;
              }

              const style: Record<string, string> = {};
              if (questionsTrackConfig && trackRemaining !== undefined) {
                currTrackLen++;
                trackRemaining--;
                if (trackRemaining === 0) {
                  const spanLen = maxTrackLen - currTrackLen + 1;
                  const trackStyle = questionsFlow === 'HORIZONTAL' ? 'gridColStart' : 'gridRowStart';
                  style[trackStyle] = `span ${spanLen}`;

                  currTrackLen = 0;
                  trackRemaining = questionsTrackConfig.shift();
                }
              }

              return <DropTarget key={val1.id} layout={dropTargetLayout} result={result} numIncorrectGuesses={numIncorrectGuesses} style={style} val1={val1} val2={val2} onDrop={handleDropTargetDrop} />
            })
          }
        </div>
        <div className={styles.choices}>
          {
            remainingChoices.map(choice => <DraggableItem key={choice.id} val={choice} onSelect={handleChoiceSelect} onUnselect={handleChoiceUnselect}/>)
          }
        </div>
      </div>
      <div className={styles.actions}>
        {
          isFinished ?
            <button className={`${styles.button} ${commonStyles.button}`} onClick={handleRestart}><FaArrowsRotate className={commonStyles.buttonIcon} role="presentation"/>Restart</button> :
            <button className={`${styles.button} ${commonStyles.button}`} onClick={handleReviewClick}><FaBook className={commonStyles.buttonIcon} role="presentation"/>Review</button>
        }
        {
          canChangeLayout && <button className={`${styles.button} ${commonStyles.button}`} onClick={() => setIsHorizontal(ih => !ih)}>
            {
              isHorizontal ?
                (<><CiGrid2V className={commonStyles.buttonIcon} role="presentation"/>Vertical Mode</>) :
                (<><CiGrid2H className={commonStyles.buttonIcon} role="presentation"/>Horizontal Mode</>)
            }</button>
        }
      </div>
      <Timer isRunning={isTimerRunning} onTick={(numSeconds) => timeElapsed.current = numSeconds}/>
      <ReviewDialog isOpen={showReviewDialog} onConfirm={handleReviewConfirm} onCancel={handleReviewCancel}/>
    </div>
  )
}
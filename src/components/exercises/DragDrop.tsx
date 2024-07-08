import { CiGrid2H, CiGrid2V } from 'react-icons/ci';
import { FaBook, FaInfoCircle } from 'react-icons/fa';
import { useCallback, useEffect, useRef, useState } from 'react';
import DropTarget from '@/components/DropTarget';
import DraggableItem from '@/components/DraggableItem';
import ExerciseResults from '@/components/ExerciseResults';
import { FaArrowsRotate } from 'react-icons/fa6';
import ReviewDialog from '@/components/ReviewDialog';
import Timer from '@/components/Timer';
import { randomizeArray } from '@/utils/randomize';
import type { Choice, DragDropFlow, Exercise } from '@/data/exercise';
import './DragDrop.css';

type DragDropProps = {
  data: Exercise;
}

type Answer = {
  id: string;
  result: 'CORRECT'|'INCORRECT'|undefined;
  numGuesses: number;
}

type LayoutConfiguration = {
  dropTargetFlow: DragDropFlow;
  instructions: string|undefined;
  isHorizontal: boolean;
  maxTrackLen: number;
  questionsFlow: DragDropFlow;
  questionsTrackConfig: number[]|undefined;
  questionsStyles: Record<string, string>;
}

function getLayoutConfiguration(data: Exercise): LayoutConfiguration {
  /*
  Get the supported layouts
  If 1 or more
    Set to the first element (horizontal by default)
  Else
    Set the layout to HORIZONTAL

  If horizontal
    Set display: grid
    Get flow value and set grid-auto-flow
    Get num cols by checking configuration.length
    Get num rows by getting max value in configuration
    Questions should be rendered based on questionLayout value
  If vertical
    Set display: flex, flex-direction: column
    Render items
    Questions should be rendered in horizontal mode
  */
  const questionsStyles: Record<string, string> = {};
  const meta = data.meta?.DRAG_DROP;
  let isHorizontal = false;
  let dropTargetFlow: DragDropFlow = 'HORIZONTAL';
  let questionsFlow: DragDropFlow = 'HORIZONTAL';
  let maxTrackLen = Number.MIN_VALUE;
  let questionsTrackConfig: number[]|undefined;
  let crossAxisLen: number|undefined;
  let instructions: string|undefined;
  if (meta) {
    if (meta.supportedLayouts?.length >= 1) {
      isHorizontal = meta.supportedLayouts[0] === 'HORIZONTAL';
      // isMultipleLayoutsSupported = meta.supportedLayouts.length > 1;
    }
    if (isHorizontal && meta.HORIZONTAL) {
      dropTargetFlow = meta.HORIZONTAL.questionFlow ?? 'VERTICAL';
      questionsFlow = meta.HORIZONTAL.questionsFlow ?? 'HORIZONTAL';
      if (meta.HORIZONTAL.configuration) {
        questionsTrackConfig = [...meta.HORIZONTAL.configuration];
        questionsTrackConfig.forEach(val => maxTrackLen = Math.max(maxTrackLen, val));
        crossAxisLen = questionsTrackConfig.length;
      }
    }
    instructions = meta.instructions;
  }
  if (questionsFlow === 'HORIZONTAL') {
    questionsStyles['--grid-auto-flow'] = 'row';
    if (crossAxisLen) {
      questionsStyles['gridTemplateColumns'] = `repeat(${crossAxisLen}, 1fr)`;
    }
  } else {
    questionsStyles['--grid-auto-flow'] = 'column';
    if (crossAxisLen) {
      questionsStyles['gridTemplateColumns'] = `repeat(${crossAxisLen}, min-content)`;
    }
    if (maxTrackLen > 0) {
      questionsStyles['gridTemplateRows'] = `repeat(${maxTrackLen}, min-content)`;
    }
  }

  return {
    dropTargetFlow,
    instructions,
    isHorizontal,
    maxTrackLen,
    questionsFlow,
    questionsTrackConfig,
    questionsStyles
  };
}

export default function DragDrop({ data }: DragDropProps) {
  const selectedChoiceId = useRef<string>();
  const timeElapsed = useRef(0);
  const [answers, setAnswers] = useState<Map<string, Answer>>(new Map());
  const [isReviewConfirmed, setIsReviewConfirmed] = useState(false);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [choices, setChoices] = useState(randomizeArray(data.choices) as Choice[]);
  const correctChoiceIds = Array.from(answers).filter(([, val]) => val.result === 'CORRECT').map(([, val]) => val.id);
  const remainingChoices = choices.filter(choice => !correctChoiceIds.includes(choice.id));
  const canChangeLayout = data.meta?.DRAG_DROP?.supportedLayouts?.length && data.meta?.DRAG_DROP?.supportedLayouts?.length > 1;
  const [isHorizontal, setIsHorizontal] = useState(data.meta?.DRAG_DROP?.supportedLayouts?.[0] === 'HORIZONTAL');
  const rootClasses = ['dragdrop', isHorizontal ? 'dragdrop--horizontal' : 'dragdrop--vertical'];
  const {
    dropTargetFlow,
    instructions,
    maxTrackLen,
    questionsFlow,
    questionsTrackConfig,
    questionsStyles
  } = getLayoutConfiguration(data);

  const handleDropTargetDrop = (questionId: string) => {
    // If there's a selected choice, update the entry in the `answers` map based on `questionId`
    if (selectedChoiceId.current) {
      let result;
      const question = data.questions.find(q => q.content === questionId);
      if (question) {
        result = question.choices.correctId === selectedChoiceId.current ? 'CORRECT' : 'INCORRECT';
      }
      const answer = {
        id: selectedChoiceId.current,
        result,
        numGuesses: answers.has(questionId) ? answers.get(questionId)?.numGuesses as number + 1 : 1
      } as Answer;
      answers.set(questionId, answer);
      setAnswers(new Map(answers));
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
    data.questions.forEach(question => {
      if (!answers.has(question.content)) {
        answers.set(question.content, {
          id: question.choices.correctId,
          result: undefined,
          numGuesses: 0,
        });
      }
    });
    setAnswers(new Map(answers));
  }
  const handleRestart = () => {
    selectedChoiceId.current = undefined;
    setAnswers(new Map());
    setChoices(randomizeArray(data.choices) as Choice[]);
    setShowReviewDialog(false);
    setIsReviewConfirmed(false);
  }
  const isFinished = isReviewConfirmed || !remainingChoices.length;
  const isTimerRunning = !isFinished && !showReviewDialog;
  const numSolved = isFinished && remainingChoices.length === 0 ? answers.size : 0;
  const numWrong = isFinished && remainingChoices.length === 0 ?
    Array.from(answers.values()).filter(a => a.numGuesses > 1).length : 0;


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
        isFinished && remainingChoices.length === 0?
          <ExerciseResults numSolved={numSolved} numWrong={numWrong} timeElapsed={timeElapsed.current} onRestart={handleRestart} /> :
          <></>
      }
      {instructions && <div className="dragdrop__instructions"><FaInfoCircle className="dragdrop__instructions-icon" role="presentation"/>{instructions}</div>}
      <div className="dragdrop__main">
        <div className="dragdrop__questions" style={questionsStyles}>
          {
            data.questions.map(question => {
              const val1 = {
                content: question.content,
                id: question.content,
              }
              const answer = answers.get(val1.id);
              let val2;
              let result;
              let numIncorrectGuesses;
              if (answer) {
                val2 = data.choices.find(choice => choice.id === answer.id);
                result = answer.result;
                numIncorrectGuesses = isFinished && answer.numGuesses > 1 ? answer.numGuesses - 1 : undefined;
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
              return <DropTarget key={val1.id} layout={dropTargetFlow} result={result} numIncorrectGuesses={numIncorrectGuesses} style={style} val1={val1} val2={val2} onDrop={handleDropTargetDrop} />
            })
          }
        </div>
        <div className="dragdrop__choices">
          {
            remainingChoices.map(choice => <DraggableItem key={choice.id} val={choice} onSelect={handleChoiceSelect} onUnselect={handleChoiceUnselect}/>)
          }
        </div>
      </div>
      <div className="dragdrop__actions">
        {
          isFinished ?
            <button className="dragdrop__button" onClick={handleRestart}><FaArrowsRotate className="dragdrop__button-icon" role="presentation"/>Restart</button> :
            <button className="dragdrop__button" onClick={handleReviewClick}><FaBook className="dragdrop__button-icon" role="presentation"/>Review</button>
        }
        {
          canChangeLayout && <button className="dragdrop__button" onClick={() => setIsHorizontal(ih => !ih)}>
            {
              isHorizontal ?
                (<><CiGrid2V className="dragdrop__button-icon" role="presentation"/>Vertical Mode</>) :
                (<><CiGrid2H className="dragdrop__button-icon" role="presentation"/>Horizontal Mode</>)
            }</button>
        }
      </div>
      <Timer isRunning={isTimerRunning} onTick={(numSeconds) => timeElapsed.current = numSeconds}/>
      <ReviewDialog isOpen={showReviewDialog} onConfirm={handleReviewConfirm} onCancel={handleReviewCancel}/>
    </div>
  )
}
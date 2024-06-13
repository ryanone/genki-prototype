import DropTarget from '@/components/DropTarget';
import DraggableItem from '@/components/DraggableItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { DragDropFlow, Exercise } from '@/data/exercise';
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
  maxTrackLen: number;
  questionsFlow: DragDropFlow;
  questionsTrackConfig: number[]|undefined;
  rootClasses: string[];
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
  const rootClasses = ['dragdrop'];
  const questionsStyles: Record<string, string> = {};
  const meta = data.meta?.DRAG_DROP;
  let isHorizontal = false;
  let dropTargetFlow: DragDropFlow = 'HORIZONTAL';
  let questionsFlow: DragDropFlow = 'HORIZONTAL';
  let maxTrackLen = Number.MIN_VALUE;
  let questionsTrackConfig: number[]|undefined;
  let crossAxisLen: number|undefined;
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
  }
  if (isHorizontal) {
    rootClasses.push('dragdrop--horizontal');
  } else {
    rootClasses.push('dragdrop--vertical');
  }
  if (questionsFlow === 'HORIZONTAL') {
    questionsStyles['--grid-auto-flow'] = 'row';
  } else {
    questionsStyles['--grid-auto-flow'] = 'column';
    if (crossAxisLen) {
      questionsStyles['gridTemplateColumns'] = `repeat(${crossAxisLen}, 1fr)`;
    }
    if (maxTrackLen > 0) {
      questionsStyles['gridTemplateRows'] = `repeat(${maxTrackLen}, 1fr)`;
    }
  }

  return {
    dropTargetFlow,
    maxTrackLen,
    questionsFlow,
    questionsTrackConfig,
    rootClasses,
    questionsStyles
  };
}

export default function DragDrop({ data }: DragDropProps) {
  const selectedChoiceId = useRef<string>();
  const [answers, setAnswers] = useState<Map<string, Answer>>(new Map());
  const correctChoices = Array.from(answers).filter(([_, val]) => val.result === 'CORRECT').map(([, val]) => val.id);
  const remainingChoices = data.choices.filter(choice => !correctChoices.includes(choice.id));
  const {
    dropTargetFlow,
    maxTrackLen,
    questionsFlow,
    questionsTrackConfig,
    rootClasses,
    questionsStyles
  } = getLayoutConfiguration(data);

  const handleDropTargetDrop = (questionId: string) => {
    if (selectedChoiceId.current) {
      let result;
      const question = data.questions.find(q => q.id === questionId);
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
      selectedChoiceId.current = undefined;
    }
  }
  const handleChoiceSelect = (id: string) => {
    selectedChoiceId.current = id;
  }
  const handleChoiceUnselect = useCallback(() => {
    selectedChoiceId.current = undefined;
  }, []);

  useEffect(() => {
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
      <div className="dragdrop__questions" style={questionsStyles}>
        {
          data.questions.map(question => {
            const val1 = {
              content: question.content,
              id: question.id,
            }
            const answer = answers.get(val1.id);
            let val2;
            let result;
            if (answer) {
              val2 = data.choices.find(choice => choice.id === answer.id);
              result = answer.result;
            }
            const styles: Record<string, string> = {};
            if (questionsTrackConfig && trackRemaining !== undefined) {
              currTrackLen++;
              trackRemaining--;
              if (trackRemaining === 0) {
                const spanLen = maxTrackLen - currTrackLen + 1;
                const trackStyle = questionsFlow === 'HORIZONTAL' ? 'gridColStart' : 'gridRowStart';
                styles[trackStyle] = `span ${spanLen}`;

                currTrackLen = 0;
                trackRemaining = questionsTrackConfig.shift();
              }
            }
            return <DropTarget key={val1.id} layout={dropTargetFlow} result={result} styles={styles} val1={val1} val2={val2} onDrop={handleDropTargetDrop} />
          })
        }
      </div>
      <div className="dragdrop__choices">
        {
          remainingChoices.map(choice => <DraggableItem key={choice.id} val={choice} onSelect={handleChoiceSelect} onUnselect={handleChoiceUnselect}/>)
        }
      </div>
    </div>
  )
}
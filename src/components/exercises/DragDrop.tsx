import DropTarget from '@/components/DropTarget';
import DraggableItem from '@/components/DraggableItem';
import { useRef } from 'react';
import type { DragDropFlow, Exercise } from '@/data/exercise';
import './DragDrop.css';

type DragDropProps = {
  data: Exercise;
}

export default function DragDrop({ data }: DragDropProps) {
  // const [selectedChoiceId, setSelectedChoiceId] = useState<string|undefined>();
  const selectedChoiceId = useRef<string>();
  const classes = ['dragdrop'];
  const meta = data.meta?.DRAG_DROP;
  let isHorizontal = false;
  let dropTargetFlow: DragDropFlow = 'HORIZONTAL';
  let questionsFlow: DragDropFlow = 'HORIZONTAL';
  let maxTrackLen = Number.MIN_VALUE;
  let questionsLayoutConfig: number[]|undefined;
  let crossAxisLen: number|undefined;
  if (meta) {
    if (meta.supportedLayouts?.length >= 1) {
      isHorizontal = meta.supportedLayouts[0] === 'HORIZONTAL';
      // isMultipleLayoutsSupported = meta.supportedLayouts.length > 1;
    }
    if (isHorizontal && meta.HORIZONTAL) {
      dropTargetFlow = meta.HORIZONTAL.questionFlow ?? 'VERTICAL';
      questionsFlow = meta.HORIZONTAL.questionsFlow ?? 'HORIZONTAL';
      questionsLayoutConfig = meta.HORIZONTAL.configuration;
      questionsLayoutConfig.forEach(val => maxTrackLen = Math.max(maxTrackLen, val));
      crossAxisLen = questionsLayoutConfig.length;
    }
  }
  if (isHorizontal) {
    classes.push('dragdrop--horizontal');
  } else {
    classes.push('dragdrop--vertical');
  }
  const questionsStyles: Record<string, unknown> = {};
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
  const handleDropTargetDrop = (questionId: string) => {
    console.log('handleDropTargetDrop(): %o', questionId);
  }
  const handleChoiceSelect = (id: string) => {
    selectedChoiceId.current = id;
  }
  const handleChoiceUnselect = () => {
    selectedChoiceId.current = undefined;
  }

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

  let trackRemaining = questionsLayoutConfig?.shift();
  let currTrackLen = 0;
  return (
    <div className={classes.join(' ')}>
      <div className="dragdrop__questions" style={questionsStyles}>
        {
          data.questions.map(question => {
            const val1 = {
              content: question.content,
              id: question.choices.correctId,
            }
            const styles: Record<string, string> = {};
            if (questionsLayoutConfig && trackRemaining !== undefined) {
              currTrackLen++;
              trackRemaining--;
              if (trackRemaining === 0) {
                const spanLen = maxTrackLen - currTrackLen + 1;
                const trackStyle = questionsFlow === 'HORIZONTAL' ? 'gridColStart' : 'gridRowStart';
                styles[trackStyle] = `span ${spanLen}`;

                currTrackLen = 0;
                trackRemaining = questionsLayoutConfig.shift();
              }
            }
            return <DropTarget key={val1.id} layout={dropTargetFlow} styles={styles} val1={val1} onDrop={handleDropTargetDrop} />
          })
        }
      </div>
      <div className="dragdrop__choices">
        {
          data.choices.map(choice => <DraggableItem key={choice.id} val={choice} onSelect={handleChoiceSelect} onUnselect={handleChoiceUnselect}/>)
        }
      </div>
    </div>
  )
}
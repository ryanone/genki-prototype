import DropTarget from '@/components/DropTarget';
import { DragDropFlow } from '@/data/exercise';
import useAppSelector from '@/hooks/useAppSelector';
import { selectIsFinished } from '@/features/dragDrop/dragDropSlice';

type HorizontalDropTargetListProps = {
  dropTargetLayout: DragDropFlow;
  maxTrackLen: number;
  questionsFlow: DragDropFlow;
  questionsTrackConfig: number[]|undefined;
  onDropTargetDrop: (questionId: string) => void;
}

export default function HorizontalDropTargetList({ dropTargetLayout, maxTrackLen, questionsFlow, questionsTrackConfig, onDropTargetDrop }: HorizontalDropTargetListProps) {
  const answers = useAppSelector((state) => state.dragDrop.answers);
  const choices = useAppSelector((state) => state.dragDrop.choices);
  const isFinished = useAppSelector(selectIsFinished);

  let trackRemaining = questionsTrackConfig?.shift();
  let currTrackLen = 0;
  return(
    <>
      {
        answers?.map(a => {
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

          return <DropTarget
            key={a.question.content}
            layout={dropTargetLayout}
            result={a.result}
            numIncorrectGuesses={isFinished ? a.numIncorrectGuesses : undefined}
            style={style}
            val1={{ id: a.question.content, content: a.question.content }}
            val2={a.selectedChoiceId ? choices[a.selectedChoiceId] : undefined}
            onDrop={onDropTargetDrop}
          />
        })
      }
    </>
  )
}
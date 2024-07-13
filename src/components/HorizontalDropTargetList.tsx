import { selectChoicesMap, selectIsFinished } from '@/features/dragDrop/dragDropSlice';
import DropTarget from '@/components/DropTarget';
import { DragDropFlow } from '@/data/exercise';
import useAppSelector from '@/hooks/useAppSelector';

type HorizontalDropTargetListProps = {
  dropTargetLayout: DragDropFlow;
  maxTrackLen: number;
  questionsFlow: DragDropFlow;
  questionsTrackConfig: number[]|undefined;
  onDropTargetDrop: (questionId: string) => void;
}

export default function HorizontalDropTargetList({ dropTargetLayout, maxTrackLen, questionsFlow, questionsTrackConfig, onDropTargetDrop }: HorizontalDropTargetListProps) {
  const answers = useAppSelector((state) => state.dragDrop.answers);
  const choicesMap = useAppSelector(selectChoicesMap);
  const isFinished = useAppSelector(selectIsFinished);

  let trackIndex = 0;
  let currTrackLen = 0;
  return(
    <>
      {
        answers?.map(a => {
          let style: Record<string, string>|undefined;
          if (questionsTrackConfig) {
            currTrackLen++;
            if (currTrackLen === questionsTrackConfig[trackIndex]) {
              const spanLen = maxTrackLen - currTrackLen + 1;
              if (spanLen > 1) {
                const trackStyle = questionsFlow === 'HORIZONTAL' ? 'gridColStart' : 'gridRowStart';
                style = {
                  [trackStyle]: `span ${spanLen}`
                };
              }
              currTrackLen = 0;
              trackIndex++;
            }
          }

          return <DropTarget
            key={a.question.content}
            layout={dropTargetLayout}
            result={a.result}
            numIncorrectGuesses={isFinished ? a.numIncorrectGuesses : undefined}
            style={style}
            val1={{ id: a.question.content, content: a.question.content }}
            val2={a.selectedChoiceId ? choicesMap.get(a.selectedChoiceId) : undefined}
            onDrop={onDropTargetDrop}
          />
        })
      }
    </>
  )
}
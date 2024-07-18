import {
  selectChoicesMap,
  selectIsFinished,
} from '@/features/dragDrop/dragDropSlice';
import MemoizedDropTarget from '@/components/MemoizedDropTarget';
import useAppSelector from '@/hooks/useAppSelector';
import { type LayoutConfigurationHorizontal } from '@/utils/dragDrop';
import styles from './HorizontalDropTargetList.module.css';

type HorizontalDropTargetListProps = {
  layoutConfig: LayoutConfigurationHorizontal;
  onDropTargetDrop: (questionId: string) => void;
};

export default function HorizontalDropTargetList({
  layoutConfig,
  onDropTargetDrop,
}: HorizontalDropTargetListProps) {
  const { dropTargetLayout, maxTrackLen, questionsFlow, questionsTrackConfig } =
    layoutConfig;
  const answers = useAppSelector((state) => state.dragDrop.answers);
  const choicesMap = useAppSelector(selectChoicesMap);
  const isFinished = useAppSelector(selectIsFinished);

  let trackIndex = 0;
  let currTrackLen = 0;
  return (
    <div
      className={styles.horizontalDropTargetList}
      style={layoutConfig.questionsStyles}
    >
      {answers?.map((a) => {
        let style: Record<string, string> | undefined;
        if (questionsTrackConfig) {
          currTrackLen += 1;
          if (currTrackLen === questionsTrackConfig[trackIndex]) {
            const spanLen = maxTrackLen - currTrackLen + 1;
            if (spanLen > 1) {
              const trackStyle =
                questionsFlow === 'HORIZONTAL'
                  ? 'gridColStart'
                  : 'gridRowStart';
              style = {
                [trackStyle]: `span ${spanLen}`,
              };
            }
            currTrackLen = 0;
            trackIndex += 1;
          }
        }

        return (
          <MemoizedDropTarget
            key={a.question.content}
            layout={dropTargetLayout}
            result={a.result}
            numIncorrectGuesses={isFinished ? a.numIncorrectGuesses : undefined}
            style={style}
            val1={{ id: a.question.content, content: a.question.content }}
            val2={
              a.selectedChoiceId
                ? choicesMap.get(a.selectedChoiceId)
                : undefined
            }
            onDrop={onDropTargetDrop}
          />
        );
      })}
    </div>
  );
}

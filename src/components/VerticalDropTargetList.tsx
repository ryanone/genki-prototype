import {
  selectChoicesMap,
  selectIsFinished,
} from '@/features/dragDrop/dragDropSlice';
import MemoizedDropTarget from '@/components/MemoizedDropTarget';
import useAppSelector from '@/hooks/useAppSelector';
import styles from './VerticalDropTargetList.module.css';

type VerticalDropTargetListProps = {
  onDropTargetDrop: (questionId: string) => void;
};

export default function VerticalDropTargetList({
  onDropTargetDrop,
}: VerticalDropTargetListProps) {
  const answers = useAppSelector((state) => state.dragDrop.answers);
  const choicesMap = useAppSelector(selectChoicesMap);
  const isFinished = useAppSelector(selectIsFinished);

  return (
    <div className={styles.verticalDropTargetList}>
      {answers?.map((a) => (
        <MemoizedDropTarget
          key={a.question.content}
          layout="HORIZONTAL"
          result={a.result}
          numIncorrectGuesses={isFinished ? a.numIncorrectGuesses : undefined}
          val1={{ id: a.question.content, content: a.question.content }}
          val2={
            a.selectedChoiceId ? choicesMap.get(a.selectedChoiceId) : undefined
          }
          onDrop={onDropTargetDrop}
        />
      ))}
    </div>
  );
}

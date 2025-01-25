import { useContext } from 'react';
import { selectChoicesMap, selectIsFinished } from '@/features/dragDrop/slice';
import MemoizedDropTarget from '@/components/MemoizedDropTarget';
import ShowFuriganaContext from '@/context/ShowFuriganaContext';
import useAppSelector from '@/hooks/useAppSelector';
import { verticalDropTargetListClass } from './VerticalDropTargetList.css';

type VerticalDropTargetListProps = {
  onDropTargetDrop: (questionId: string) => void;
};

export default function VerticalDropTargetList({
  onDropTargetDrop,
}: VerticalDropTargetListProps) {
  const { showFurigana } = useContext(ShowFuriganaContext);
  const answers = useAppSelector((state) => state.dragDrop.answers);
  const choicesMap = useAppSelector(selectChoicesMap);
  const isFinished = useAppSelector(selectIsFinished);

  return (
    <div className={verticalDropTargetListClass}>
      {answers?.map((a) => (
        <MemoizedDropTarget
          key={a.question.content}
          layout="HORIZONTAL"
          result={a.result}
          numIncorrectGuesses={isFinished ? a.numIncorrectGuesses : undefined}
          showAlt={showFurigana}
          val1={{
            alt: a.question.alt,
            id: a.question.content,
            content: a.question.content,
          }}
          val2={
            a.selectedChoiceId ? choicesMap.get(a.selectedChoiceId) : undefined
          }
          onDrop={onDropTargetDrop}
        />
      ))}
    </div>
  );
}

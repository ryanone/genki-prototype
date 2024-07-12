import DropTarget from '@/components/DropTarget';
import useAppSelector from '@/hooks/useAppSelector';
import { selectIsFinished } from '@/features/dragDrop/dragDropSlice';

type VerticalDropTargetListProps = {
  onDropTargetDrop: (questionId: string) => void;
}

export default function VerticalDropTargetList({ onDropTargetDrop }: VerticalDropTargetListProps) {
  const answers = useAppSelector((state) => state.dragDrop.answers);
  const choices = useAppSelector((state) => state.dragDrop.choices);
  const isFinished = useAppSelector(selectIsFinished);

  return (
    <>
      {
        answers?.map(a => {
          return <DropTarget
            key={a.question.content}
            layout={"HORIZONTAL"}
            result={a.result}
            numIncorrectGuesses={isFinished ? a.numIncorrectGuesses : undefined}
            val1={{ id: a.question.content, content: a.question.content }}
            val2={a.selectedChoiceId ? choices[a.selectedChoiceId] : undefined}
            onDrop={onDropTargetDrop}
          />
        })
      }
    </>
  )
}
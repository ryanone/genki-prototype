import DropTarget from '@/components/DropTarget';
import DraggableItem from '@/components/DraggableItem';
import type { Exercise } from '@/data/exercise';
import './DragDrop.css';

type DragDropProps = {
  data: Exercise;
}

export default function DragDrop({ data }: DragDropProps) {
  const classes = ['dragdrop'];
  const meta = data.meta?.DRAG_DROP;
  if (meta && meta.supportedLayouts.includes('HORIZONTAL')) {
    classes.push('dragdrop--horizontal');
  } else {
    classes.push('dragdrop--vertical');
  }
  const dropTargetLayout = 'HORIZONTAL';
  const handleDropTargetDrop = () => {}

  return (
    <div className={classes.join(' ')}>
      <div className="dragdrop__questions">
        {
          data.questions.map(question => {
            const val1 = {
              content: question.content,
              id: question.choices.correctId,
            }
            return <DropTarget layout={dropTargetLayout} val1={val1} onDrop={handleDropTargetDrop} />
          })
        }
      </div>
      <div className="dragdrop__choices">
        {
          data.choices.map(choice => <DraggableItem key={choice.id} val={choice}/>)
        }
      </div>
    </div>
  )
}
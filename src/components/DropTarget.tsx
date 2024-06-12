import { FaStar } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import './DropTarget.css';

type DropTargetValue = {
  content: string;
  id: string;
}

type DropTargetProps = {
  layout: 'HORIZONTAL'|'VERTICAL';
  val1: DropTargetValue;
  val2?: DropTargetValue;
  onDrop: (value: string) => void;
}

export default function DropTarget({ layout, val1, val2, onDrop }: DropTargetProps) {
  const handleZoneDrop = () => {
    onDrop(val1.id);
  };

  const classes = ['droptarget'];
  if (layout === 'VERTICAL') {
    classes.push('droptarget--vertical');
  } else {
    classes.push('droptarget--horizontal');
  }

  const isIncorrect = val2 && val1.id !== val2.id;
  const isCorrect = val2 && val1.id === val2.id;
  const zoneContent = val2 && val2.content;

  return (
    <div className={classes.join(' ')}>
      <div className="droptarget__content">{val1.content}</div>
      <div className="droptarget__zone" onDrop={handleZoneDrop}>{zoneContent}</div>
      {isIncorrect && <ImCross aria-label="Incorrect" className="droptarget__icon droptarget__incorrect-icon"/>}
      {isCorrect && <FaStar arial-label="Correct" className="droptarget__icon droptarget__correct-icon"/>}
    </div>
  )
}
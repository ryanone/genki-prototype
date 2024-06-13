import { FaStar } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import './DropTarget.css';

type DropTargetValue = {
  content: string;
  id: string;
}

type DropTargetValue2 = {
  content: string;
  id?: string;
}

type DropTargetProps = {
  layout: 'HORIZONTAL'|'VERTICAL';
  result: 'CORRECT'|'INCORRECT'|undefined;
  styles?: Record<string, string>;
  val1: DropTargetValue;
  val2?: DropTargetValue2;
  onDrop: (value: string) => void;
}

export default function DropTarget({ layout, result, styles = {}, val1, val2, onDrop }: DropTargetProps) {
  const handleZoneDrop = () => {
    onDrop(val1.id);
  };

  const classes = ['droptarget'];
  if (layout === 'VERTICAL') {
    classes.push('droptarget--vertical');
  } else {
    classes.push('droptarget--horizontal');
  }

  const isCorrect = result === 'CORRECT';
  const isIncorrect = result === 'INCORRECT';
  const zoneContent = val2 && val2.content;

  return (
    <div className={classes.join(' ')} style={styles}>
      <div className="droptarget__content">{val1.content}</div>
      <div className="droptarget__zone" onDrop={handleZoneDrop} onDragOver={(e) => e.preventDefault()}>{zoneContent}</div>
      {isIncorrect && <ImCross aria-label="Incorrect" className="droptarget__icon droptarget__incorrect-icon"/>}
      {isCorrect && <FaStar arial-label="Correct" className="droptarget__icon droptarget__correct-icon"/>}
    </div>
  )
}
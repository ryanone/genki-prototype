import { FaStar } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { useState } from 'react';
import styles from './DropTarget.module.css';

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
  style?: Record<string, string>;
  val1: DropTargetValue;
  val2?: DropTargetValue2;
  onDrop: (value: string) => void;
}

export default function DropTarget({ layout, result, style = {}, val1, val2, onDrop }: DropTargetProps) {
  const [isZoneEntered, setIsZoneEntered] = useState(false);
  const isDisabled = result === 'CORRECT';
  const handleZoneDropClick = () => {
    if (!isDisabled) {
      onDrop(val1.id);
    }
  };

  const classes = [];
  if (layout === 'VERTICAL') {
    classes.push(styles.vertical);
  } else {
    classes.push(styles.horizontal);
  }

  const isCorrect = result === 'CORRECT';
  const isIncorrect = result === 'INCORRECT';
  const zoneContent = val2 && val2.content;
  const zoneClasses = [styles.zone];
  if (isZoneEntered) {
    zoneClasses.push(styles.zoneEntered);
  }

  return (
    <div className={classes.join(' ')} style={style}>
      <div className={styles.content}>{val1.content}</div>
      <div className={zoneClasses.join(' ')} data-drop-target-zone="true" onDrop={handleZoneDropClick} onClick={handleZoneDropClick} onDragEnter={() => setIsZoneEntered(true)} onDragLeave={() => setIsZoneEntered(false)} onDragOver={(e) => e.preventDefault()} role="button">{zoneContent}</div>
      {isIncorrect && <ImCross aria-label="Incorrect" className={`${styles.icon} ${styles.iconIncorrect}`}/>}
      {isCorrect && <FaStar arial-label="Correct" className={`${styles.icon} ${styles.iconCorrect}`}/>}
    </div>
  )
}
import type { KeyboardEvent } from 'react';
import * as styles from './DraggableItem.css';

type DraggableItemProps = {
  onSelect: (id: string) => void;
  onUnselect: () => void;
  val: {
    content: string;
    id: string;
  };
};

export default function DraggableItem({
  val,
  onSelect,
  onUnselect,
}: DraggableItemProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSelect(val.id);
    }
  };

  return (
    <div
      className={styles.itemClass}
      onClick={() => onSelect(val.id)}
      onDragEnd={onUnselect}
      onDragStart={() => onSelect(val.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-draggable-item="true"
      role="button"
      draggable
    >
      {val.content}
    </div>
  );
}

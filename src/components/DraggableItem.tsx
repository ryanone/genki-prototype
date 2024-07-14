import styles from './DraggableItem.module.css';

type DraggableItemProps = {
  val: {
    content: string;
    id: string;
  },
  onSelect: (id: string) => void;
  onUnselect: () => void;
};

export default function DraggableItem({ val, onSelect, onUnselect }: DraggableItemProps) {
  return (
    <div className={styles.item} onClick={() => onSelect(val.id)} onDragEnd={onUnselect} onDragStart={() => onSelect(val.id)} tabIndex={0} data-draggable-item="true" draggable>{val.content}</div>
  );
}

import './DraggableItem.css';

type DraggableItemProps = {
  val: {
    content: string;
    id: string;
  },
  onSelect: (id: string) => void;
  onUnselect: () => void;
}

export default function DraggableItem({ val, onSelect, onUnselect }: DraggableItemProps) {
  return (
    <div className="draggableitem" onFocus={() => onSelect(val.id)} onBlur={onUnselect} onDragEnd={onUnselect} onDragStart={() => onSelect(val.id)} tabIndex={0} draggable>{val.content}</div>
  )
}
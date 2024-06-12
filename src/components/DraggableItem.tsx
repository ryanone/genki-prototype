import './DraggableItem.css';

type DraggableItemProps = {
  val: {
    content: string;
    id: string;
  },
  onSelect: (id: string) => void;
  onUnselect: () => void;
}

export default function DraggableItem({ val }: DraggableItemProps) {
  return (
    <div className="draggableitem" tabIndex={0} draggable>{val.content}</div>
  )
}
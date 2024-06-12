import './DraggableItem.css';

type DraggableItemProps = {
  val: {
    content: string;
    id: string;
  }
}

export default function DraggableItem({ val }: DraggableItemProps) {
  return (
    <div className="draggableitem" tabIndex={0} draggable>{val.content}</div>
  )
}
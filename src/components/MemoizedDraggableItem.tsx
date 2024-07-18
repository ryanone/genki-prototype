import { memo } from 'react';
import deepEqual from '@/utils/deepEqual';
import DraggableItem from '@/components/DraggableItem';

const MemoizedDraggableItem = memo(DraggableItem, (prev, next) =>
  deepEqual(prev.val, next.val),
);

export default MemoizedDraggableItem;

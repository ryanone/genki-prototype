import { memo } from 'react';
import deepEqual from '@/utils/deepEqual';
import DropTarget from '@/components/DropTarget';

const MemoizedDropTarget = memo(DropTarget, (prev, next) => {
  return (
    prev.layout === next.layout &&
    prev.showAlt === next.showAlt &&
    prev.numIncorrectGuesses === next.numIncorrectGuesses &&
    prev.result === next.result &&
    deepEqual(prev.val1, next.val1) &&
    deepEqual(prev.val2, next.val2)
  );
});

export default MemoizedDropTarget;

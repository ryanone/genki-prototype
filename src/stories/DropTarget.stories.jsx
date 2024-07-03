import DropTarget from '../components/DropTarget';
import { fn } from '@storybook/test';

export const DropTargetActionsData = {
  onDrop: fn(),
};

export default {
  component: DropTarget,
  title: 'Drop Target',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...DropTargetActionsData
  },
};

export const DefaultHorizontal = {
  args: {
    layout: 'HORIZONTAL',
    val1: {
      content: 'wa',
      id: '0',
    },
  },
};

export const DefaultVertical = {
  args: {
    ...DefaultHorizontal.args,
    layout: 'VERTICAL',
  },
};

export const CorrectHorizontal = {
  args: {
    ...DefaultHorizontal.args,
    result: 'CORRECT',
    val2: {
      content: 'わ',
      id: DefaultHorizontal.args.val1.id,
    },
  },
};

export const CorrectVertical = {
  args: {
    ...DefaultHorizontal.args,
    layout: 'VERTICAL',
    result: 'CORRECT',
    val2: {
      content: 'わ',
      id: DefaultHorizontal.args.val1.id,
    },
  },
};

export const FilledHorizontal = {
  args: {
    ...DefaultHorizontal.args,
    layout: 'HORIZONTAL',
    val2: {
      content: 'わ',
    },
  },
};

export const FilledVertical = {
  args: {
    ...DefaultHorizontal.args,
    layout: 'VERTICAL',
    val2: {
      content: 'わ',
    }
  },
};

export const IncorrectHorizontal = {
  args: {
    ...DefaultHorizontal.args,
    result: 'INCORRECT',
    val2: {
      content: 'ほ',
      id: '50'
    },
  },
};

export const IncorrectVertical = {
  args: {
    ...DefaultHorizontal.args,
    layout: 'VERTICAL',
    result: 'INCORRECT',
    val2: {
      content: 'ほ',
      id: '50'
    },
  },
};
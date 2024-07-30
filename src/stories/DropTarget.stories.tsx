import { fn } from '@storybook/test';
import DropTarget from '@/components/DropTarget';

export const DropTargetActionsData = {
  onDrop: fn(),
};

export default {
  component: DropTarget,
  title: 'Drop Target',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {
    ...DropTargetActionsData,
  },
};

export const Default = {
  args: {
    layout: 'HORIZONTAL',
    val1: {
      content: 'わ',
      id: '0',
    },
  },
};

export const AltVal1 = {
  args: {
    layout: 'HORIZONTAL',
    showAlt: true,
    val1: {
      alt: 'えいが',
      content: '映画',
      id: '0',
    },
  },
};

export const Filled = {
  args: {
    ...Default.args,
    layout: 'HORIZONTAL',
    val2: {
      content: 'わ',
    },
  },
};

export const NumIncorrectGuesses = {
  args: {
    ...Default.args,
    result: 'INCORRECT',
    numIncorrectGuesses: 5,
    val2: {
      content: 'ほ',
      id: '50',
    },
  },
};

import DragDropExercise from '@/components/exercises/DragDrop';
import Genki3Exercise01 from '@/data/genki-3/exercises/hiragana-0.json';

export default {
  component: DragDropExercise,
  title: 'Drag & Drop Exercise',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
  args: {},
};

const data = { ...Genki3Exercise01 };

export const DefaultHorizontal = {
  args: {
    data,
  }
};

export const DefaultVertical = {
  args: {
    data: {
      ...data,
      meta: {
        DRAG_DROP: {
          supportedLayouts: ['VERTICAL'],
        },
      },
    },
  },
};
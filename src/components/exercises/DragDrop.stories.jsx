import DragDropExercise from './DragDrop';
import Genki3Exercise01 from '../../data/exercises/genki-3/0-1.json';

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
